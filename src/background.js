'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
import path from 'path';
const { locatorToLatLng, distance, bearingDistance, latLngToLocator } = require('qth-locator');
const SerialPort = require('serialport');
// const readline = require('readline');
const Delimiter = require('@serialport/parser-delimiter');
global.SerialPort = SerialPort;



const getComPorts = async () => {
  try {
    return await SerialPort.list()
  } catch (err) {
    console.log("Error getComPorts")
    console.log(err)
    return [];
  }
}

const initComPort = async (portName) => {
  return new SerialPort(portName, {
    baudRate: 19200
  });

}
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

let comPorts = [];
let comPort = null;
async function createWindow() {

  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    title: 'Rototator',
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  comPorts = await getComPorts();
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    win.loadURL('app://./index.html')
  }

  win.setMenu(null)

  win.webContents.send('comPorts', comPorts);
  ipcMain.on('getComPorts', async (event, arg) => {
    comPorts = await getComPorts();
    win.webContents.send('comPorts', comPorts)
  })
  ipcMain.on('getConnectComPort', async (event, arg) => {
    if (comPort !== null) {
      win.webContents.send('connectedComPort', comPort.path);
    } else {
      win.webContents.send('connectedComPort', null);
    }

  })

  ipcMain.on('disconnectComPort', async (event, arg) => {
    comPort = null;
    win.webContents.send('disconnectedComPort', null);
  });

  ipcMain.on('connectComPort', async (event, arg) => {
    try {
      console.log('connectComPort')
      console.log(arg)
      try {
        comPort = await initComPort(arg);

        comPort.on('open', (err) => {
          if (err) {
            return console.log('Error opening port: ', err)
          }

          ipcMain.on('locatorApply', async (event, arg) => {
            console.log(arg)
            const distAzt = bearingDistance(arg.my, arg.dst);
            comPort.write(`${parseInt(distAzt.deg)} ${arg.elt} ${arg.dst}`);
          });

          ipcMain.on('azApply', async (event, arg) => {
            comPort.write(`${arg.azt} ${arg.elt} Rototator`);
          });

          ipcMain.on('elApply', async (event, arg) => {
            comPort.write(`${arg.azt} ${arg.elt} Rototator`);
          });
          
          ipcMain.on('init', async (event, arg) => {
            console.log(arg)
            comPort.write(Buffer.from(`i`));
          });

          ipcMain.on('azCcw', async (event, arg) => {
            console.log(arg)
            comPort.write(Buffer.from(`<`));
          });

          ipcMain.on('elUp', async (event, arg) => {
            console.log(arg)
            comPort.write(Buffer.from(`u`));
          });

          ipcMain.on('elDown', async (event, arg) => {
            console.log(arg)
            comPort.write(Buffer.from(`d`));
          });
        })
        const parser = comPort.pipe(new Delimiter({ delimiter: '\n' }))
        let fromRotator = {
          motd: '',
          data: {},
        };
        parser.on('data', (d) => {

          let _tmpArray = [];
          let buf2 = Buffer.from(d);
          let str = buf2.toString();
          _tmpArray = str.replace('\r', '').replace(' ', '').split('#');
          _tmpArray.map(item => {
            const _tmp = item.split(':')

            if (_tmp[0] == 'MOTD') {
              fromRotator.motd = _tmp[1];
            } else {
              fromRotator.data[_tmp[0]] = _tmp[1];
            }
          })
          win.webContents.send('updateIndicator', fromRotator)
        });
      } catch (err) {
        console.log("***");
        console.log(err)
      }

    } catch (err) { console.log(err) }
  })

}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}






