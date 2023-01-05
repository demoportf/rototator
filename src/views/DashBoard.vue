<template>
  <v-container>
    <v-row dense>
       <v-col cols="12">
       <v-card
    class="mx-auto"
    
  >
    <v-card-text>
 <v-form >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="myLoc"
            :counter="10"
            :rules="qthLocRules"
            label="Мой локатор"
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="dstLoc"
            :counter="10"
            :rules="qthLocRules"
            label="Корреспондент"
            required
          ></v-text-field>
        </v-col>


      </v-row>
    </v-container>
  </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="teal accent-4"
        @click="applyLocator"
      >
        Поехали!
      </v-btn>
    </v-card-actions>

  </v-card>
  </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-card elevation="2" :loading="loadingAz">
          <v-list-item three-line>
            <v-list-item-content>
              <v-row>
                <v-col>
                  <div class="overline mb-4">Azimuth</div>
                  <v-list-item-title class="headline mb-1">
                    {{ AzData }}
                  </v-list-item-title>
                </v-col>
                <v-col>
                  <div class="overline mb-4">Azimuth Target</div>
                  <v-list-item-title class="headline mb-1">
                    {{ AzDataTarget }}
                  </v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-slider
              v-model="AzDataTarget"
              :thumb-color="sliders.az.color"
              thumb-label="always"
              :max="sliders.az.max"
              :min="sliders.az.min"
            ></v-slider>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="azCcw">
              <v-icon>mdi-transfer-left</v-icon>
            </v-btn>
            <v-btn icon @click="azCw">
              <v-icon>mdi-transfer-right</v-icon>
            </v-btn>
            <v-btn icon @click="azApply">
              <v-icon>mdi-pac-man</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card elevation="2" :loading="loadingEl">
          <v-list-item three-line>
            <v-list-item-content>
              <v-row>
                <v-col>
                  <div class="overline mb-4">Elevation</div>
                  <v-list-item-title class="headline mb-1">
                    {{ ElData }}
                  </v-list-item-title>
                </v-col>
                <v-col>
                  <div class="overline mb-4">Elevation Target</div>
                  <v-list-item-title class="headline mb-1">
                    {{ ElDataTarget }}
                  </v-list-item-title>
                </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-slider
              v-model="ElDataTarget"
              :thumb-color="sliders.el.color"
              thumb-label="always"
              :max="sliders.el.max"
              :min="sliders.el.min"
            ></v-slider>
          </v-card-actions>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="elUp">
              <v-icon>mdi-transfer-up</v-icon>
            </v-btn>
            <v-btn icon @click="elDown">
              <v-icon>mdi-transfer-down</v-icon>
            </v-btn>
            <v-btn icon @click="elApply">
              <v-icon>mdi-pac-man</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      myLoc: '',
      dstLoc: '',
      AzIndicatorText: "AZ",
      ElIndicatorText: "EL",
      loadingAz: false,
      loadingEl: false,
      prevAzData: 0,
      prevElData: 0,
      AzData: 0,
      ElData: 0,
      AzDataTarget: 180,
      ElDataTarget: 0,
      Op: 0,
      AzArrow: 0,
      ElArrow: 0,
      Mode: 0,
      sliders: {
        az: {
          min: 0,
          max: 352,
          color: "orange darken-3",
        },
        el: {
          min: 0,
          max: 90,
          color: "orange darken-3",
        },
      },
        qthLocRules: [
        v => !!v || 'Locator is required',
        v => (/^[A-Ra-r][A-Ra-r]\d\d/).test(v) || 'Locator must locator template',
        ],
    } 
  },
  watch: {
    // AzData: function(newVal, oldVal){
    //   // console.log(newVal + " " + oldVal);
    //   // (newVal !== oldVal) ? this.loadingAz = true : this.loadingAz = false;
    // }
  },
  methods: {
    azCw() {
      this.AzDataTarget < 352 ? this.AzDataTarget++ : false;
    },
    azCcw() {
      this.AzDataTarget > 0 ? this.AzDataTarget-- : false;
    },
    elUp() {
      this.ElDataTarget < 90 ? this.ElDataTarget++ : false;
    },
    elDown() {
      this.ElDataTarget > 0 ? this.ElDataTarget-- : false;
    },
    azApply() {
      window.ipcRenderer.send("azApply", {
        azt: this.AzDataTarget,
        elt: this.ElData,
      });
    },
    elApply() {
      window.ipcRenderer.send("elApply", {
        elt: this.ElDataTarget,
        azt: this.AzData,
      });
    },
    applyLocator() {
      console.log(this.myLoc)
      console.log(this.dstLoc)
        window.ipcRenderer.send("locatorApply", {
        my: this.myLoc,
        dst: this.dstLoc,
        elt: this.ElData,
      });
    }
  },

  created() {
    // console.log(window.bearingDistance("LO97xw", "LO98rq"));
    window.ipcRenderer.on("sendController", (event, arg) => {
      this.AzData - 1;
      this.ElData = parseInt(arg.data.EL);
    });

    window.ipcRenderer.on("updateIndicator", (event, arg) => {
      this.AzData = parseInt(arg.data.AZ);
      this.ElData = parseInt(arg.data.EL);
      // 0 - off, 1 - on
      this.Op = parseInt(arg.data.OP);
      // 0 - clear, 1 - CW or UP, 2 - CCW or DOWN
      this.AzArrow = parseInt(arg.data.AZARROW);
      this.ElArrow = parseInt(arg.data.ELARROW);
      // 0 MANUAL, 1 PC, 2 MANUAL BUTTON
      this.Mode = parseInt(arg.data.MODE);
    });
   
  },
};
</script>