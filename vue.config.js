const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions:{
    electronBuilder:{
      builderOptions:{
        "productName": "Jail Books",
        "win" : {
          "icon" : "build/256x256.png"
        },
        "mac" : {
          "icon" : "build/256x256.png"
        }
      }
    }
  },
  
  configureWebpack: {
    plugins:[
      new NodePolyfillPlugin()
    ]
  },
})
