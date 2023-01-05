module.exports = {
  "pluginOptions": {
    "electronBuilder": {
      "externals": [
        "serialport"
      ],
      "preload": "src/preload.js",
      "nodeModulesPath": [
        "../../node_modules",
        "./node_modules"
      ]
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}