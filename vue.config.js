const { GenerateSW } = require( 'workbox-webpack-plugin' );

module.exports = {
  transpileDependencies: ['vuetify'],
  pwa                  : {
    name                           : 'RDR',
    appleMobileWebAppCapable       : 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode              : 'GenerateSW',
    workboxOptions: {
     
    },
    manifestPath                   :  './manifest.json',
    manifestOptions: {
      "share_target": {
        "action": "/add",
        "method": "GET",
        "params": {                   
          "text": "url",          
        },
        "enctype": "application/x-www-form-urlencoded"
      }
    }
    
  },
  
  devServer            : {
    disableHostCheck: true
  }
};
