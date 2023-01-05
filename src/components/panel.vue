<template>
  <div>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>{{ operateIcon }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>{{ modeIcon }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>{{ azArrowIcon }}</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>{{ elArrowIcon }}</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </div>
</template>

<script>
import { mdiHeart } from "@mdi/js";
import { mdiHeartOff } from "@mdi/js";
import { mdiSerialPort } from "@mdi/js";
import { mdiGestureTapButton } from "@mdi/js";
import { mdiDistributeVerticalBottom } from "@mdi/js";
import { mdiTransferLeft } from "@mdi/js";
import { mdiTransferRight } from "@mdi/js";
import { mdiTransferDown } from "@mdi/js";
import { mdiTransferUp } from "@mdi/js";
import { mdiRectangle } from "@mdi/js";

export default {
  name: "panel",
  props: {
    elArrow: {
      type: Number,
      default: 0,
    },
    azArrow: {
      type: Number,
      default: 0,
    },
    mode: {
      type: Number,
      default: 0,
    },
    operate: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      svgPath: mdiHeart,
      // comPortSelected: "",
    };
  },
  computed: {
    operateIcon: function () {
      return this.operate > 0 ? mdiHeart : mdiHeartOff;
    },
    modeIcon: function () {
      let icon = mdiGestureTapButton;
      if (this.mode == 0) {
        icon = mdiGestureTapButton;
      }
      if (this.mode == 1) {
        icon = mdiSerialPort;
      } 
      if (this.mode == 2) {
        icon = mdiDistributeVerticalBottom;
      }
      return icon;
    },
    azArrowIcon: function () {
      let icon = mdiGestureTapButton;
      if (this.azArrow == 0) {
         icon = mdiRectangle;
      }
      if (this.azArrow == 1) {
        icon = mdiTransferRight;
      } 
      if (this.azArrow == 2) {
        icon = mdiTransferLeft;
      }
      return icon;
    },
    elArrowIcon: function () {
      let icon = mdiGestureTapButton;
      if (this.elArrow == 0) {
         icon = mdiRectangle;
      } else if (this.elArrow == 1) {
         icon = mdiTransferUp;
      } else if (this.elArrow == 2) {
         icon = mdiTransferDown;
      }
       return icon;
    },
  },
};
</script>
<style scoped>

</style>
