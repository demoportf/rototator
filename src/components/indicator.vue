<template>
  <div class="indicator">
    <h1>{{ typeMsg }}: {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: "indicator",
  props: {
    typeMsg: {
      type: String,
      default: "NOT",
    },
    msg: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.indicator {
  height: 100%;
  /* border: 3px solid; */
  margin: 10px;
  padding: 10px;
  background-color: #42b983;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
