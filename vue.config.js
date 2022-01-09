import InjectManifest from 'workbox-webpack-plugin';

module.exports = {
  transpileDependencies: ['vuetify'],
  pwa                  : {
    name                           : 'RDR',
    appleMobileWebAppCapable       : 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode              : 'InjectManifest',
    workboxOptions                 : {
      swSrc: './src/sw.js'
    },
    manifestPath                   : './manifest.json',
    manifestOptions                : {
      share_target: {
        action : '/add',
        method : 'GET',
        params : {
          text: 'url'
        },
        enctype: 'application/x-www-form-urlencoded'
      }
    }
  },

  devServer            : {
    disableHostCheck: true
  }
};
