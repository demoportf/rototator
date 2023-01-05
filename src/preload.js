import { locatorToLatLng, distance, bearingDistance, latLngToLocator } from 'qth-locator';
import { ipcRenderer } from 'electron'
window.ipcRenderer = ipcRenderer
window.locatorToLatLng = locatorToLatLng;
window.distance = distance;
window.bearingDistance = bearingDistance;
window.latLngToLocator = latLngToLocator;