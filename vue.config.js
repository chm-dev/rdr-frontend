const { GenerateSW } = require( 'workbox-webpack-plugin' );

module.exports = {
  transpileDependencies: ['vuetify'],
  pwa                  : {
    name                           : 'RDR',
    appleMobileWebAppCapable       : 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode              : 'GenerateSW'
  },
  configureWebpack     : {
    plugins: [new GenerateSW()]
  },
  devServer            : {
    disableHostCheck: true
  }
};
