<template>
  <div class="com-port">
    <a>
      <select v-model="comPortSelected" v-on:click="$emit('get-com-ports')">
        <option v-for="comPort in comPorts" :key="comPort.serialNumber">
          {{ comPort.path }}
        </option>
      </select>
      <button
        class="btn"
        v-on:click="$emit('select-com-port', comPortSelected)"
      >
        Conn
      </button>
    </a>
  </div>
</template>

<script>
export default {
  name: "panel",
  props: {
    side: {
      type: String,
      default: "right",
    },
    comPorts: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      comPortSelected: "",
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
