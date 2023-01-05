<template>
  <v-container>
    <v-row dense>
      <v-col cols="6">
        <v-form ref="form" lazy-validation>
          <v-select
            v-model="comPortSelected"
            v-on:click="getComPorts()"
            :items="comPorts"
            :item-text="'path'"
            :item-value="'path'"
          ></v-select>
          <v-btn
            color="success"
            class="mr-4"
            @click="connectComPort(comPortSelected)"
          >
            Connect
          </v-btn>

          <v-btn color="danger" class="mr-4" @click="disconnectComPort()">
            Disconnect
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="6">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, name) in comPortDetails" :key="item.path">
                <td>{{ name.toUpperCase() }}</td>
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "comPortScreen",
  data() {
    return {
      monitorData: [],
      comPorts: [],
      comPortPath: null,
      comPortSelected: null,
    };
  },
  methods: {
    getConnectComPort() {
      window.ipcRenderer.send("getConnectComPort", null);
    },
    getComPorts() {
      window.ipcRenderer.send("getComPorts", "all");
    },
    connectComPort(port) {
      window.ipcRenderer.send("connectComPort", port);
    },
    disconnectComPort() {
      window.ipcRenderer.send("disconnectComPort", null);
    },
  },
  created() {
    //console.log(window.bearingDistance("LO97xw", "LO98rq"));
    // Запрашиваем текущий компорт

    window.ipcRenderer.on("comPorts", (evt, comPorts) => {

     // this.comPorts = comPorts;
      if (comPorts.length == 0) {
        alert("COM порты не найдены");
      } else {
        this.comPorts = comPorts;
        console.log("this.comPorts");
        console.log(this.comPorts);
      }
    });

    // Получаем выбранный ком порт
    window.ipcRenderer.on("connectedComPort", (event, comPort) => {
      console.log("connectedComPort");
      console.log(comPort);
      this.comPortSelected = comPort;
    });

    window.ipcRenderer.on("disconnectedComPort", (event, comPort) => {
      console.log("disconnectedComPort");
      console.log(comPort);
      this.comPortSelected = null;
      this.getComPorts();
      this.getConnectComPort();
    });

    this.getComPorts();
    this.getConnectComPort();
  },
  computed: {
    comPortDetails: function () {
      return this.comPorts.filter(
        (port) => port.path === this.comPortSelected
      )[0];
    },
  },
};
</script>