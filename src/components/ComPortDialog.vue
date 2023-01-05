<template>
  <v-row justify="center">
    <v-dialog v-model="visible" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">COM port selection</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="comPortSelected"
                  v-on:click="$emit('get-com-ports')"
                  :items="comPorts"
                  :item-text="'path'"
                  :item-value="'path'"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            v-on:click="$emit('select-com-port', comPortSelected)"
          >
            Apply
          </v-btn>
          <v-btn color="blue darken-1" text @click="show = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["visible", "comPorts"],
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  data() {
    return {
      comPortSelected: "",
    };
  },
};
</script>