const path = require( 'path' );
const CopyPlugin = require( 'copy-webpack-plugin' );

module.exports = {
  transpileDependencies: ['vuetify'],
  pwa                  : {
    name                           : 'RDR',
    appleMobileWebAppCapable       : 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode              : 'InjectManifest',
    workboxOptions                 : {
      swSrc : './public/js/sw.js',
      swDest: './sw.js'
    },
    manifestPath                   : './manifest.json',
    manifestOptions                : {
      theme_color     : '#37474f',
      background_color: '#ffffff',
      display         : 'standalone',
      scope           : '/',
      start_url       : '/',
      name            : 'RDR',
      short_name      : 'ReaDeR',
      description     : 'PWA Read it later with system share on android',
      icons           : [
        {
          src  : './img/icons/icon-192x192.png',
          sizes: '192x192',
          type : 'image/png'
        }, {
          src  : './img/icons/icon-256x256.png',
          sizes: '256x256',
          type : 'image/png'
        }, {
          src  : './img/icons/icon-384x384.png',
          sizes: '384x384',
          type : 'image/png'
        }, {
          src  : './img/icons/icon-512x512.png',
          sizes: '512x512',
          type : 'image/png'
        }
      ],
      share_target    : {
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
    contentBase     : path.join( __dirname, 'dist' ),
    disableHostCheck: true,
    https           : true,
    allowedHosts    : ['all']
  },

  configureWebpack     : {}
};
