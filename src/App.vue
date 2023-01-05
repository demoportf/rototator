<template>
  <v-app id="inspire">
    <v-navigation-drawer permanent v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ appName }}
          </v-list-item-title>
          <v-list-item-subtitle> Настройки </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="menuItem in menuItems"
          :key="menuItem.title"
          link
          :to="menuItem.to"
        >
          <v-list-item-icon>
            <v-icon>{{ menuItem.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <Panel :mode="Mode" :operate="Op" :azArrow="AzArrow" :elArrow="ElArrow" />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Panel from "./components/Panel";
import { mdiSerialPort } from "@mdi/js";

export default {
  name: "App",
  components: {
    Panel,
  },
  data() {
    return {
      appName: "Rototator",
      drawer: null,
      ComPorts: [],
      Op: 0,
      AzArrow: 0,
      ElArrow: 0,
      Mode: 0,
      menuItems: [
        {
          title: "Dashboard",
          flag: "dash",
          icon: "mdi-view-dashboard",
          to: "/",
        },
        {
          title: "COM-port",
          flag: "openComPortDialog",
          icon: mdiSerialPort,
          to: "/comport",
        },
        { title: "About", flag: "about", icon: "mdi-help-box", to: "/about" },
      ],
      right: null,
    };
  },
  methods: {
  },
  created() {
     console.log(window.bearingDistance("LO97xw", "LO98rq"));
      window.ipcRenderer.on("updateIndicator", (event, arg) => {
      // 0 - off, 1 - on
      this.Op = parseInt(arg.data.OP);
      // 0 - clear, 1 - CW or UP, 2 - CCW or DOWN
      this.AzArrow = parseInt(arg.data.AZARROW);
      this.ElArrow = parseInt(arg.data.ELARROW);
      // 0 MANUAL, 1 PC, 2 MANUAL BUTTON
      this.Mode = parseInt(arg.data.MODE);
    });

     window.ipcRenderer.send("init", "init");
  },
};
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
}
</style>
