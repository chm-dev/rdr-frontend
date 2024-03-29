# webReaDeR frontend

![logo](https://github.com/chm-dev/rdr-frontend/raw/master/public/img/icons/icon-192x192.png)

This is frontend for simple "Read it later" / "Pocket" clone as Progressive WebApp.

Main inspiration was a [pwa native share capability on android devices](https://web.dev/web-share/).

* Frontend is created using Vue2 and [Vuetify](https://vuetifyjs.com/en/)
* [Backend](https://github.com/chm-dev/rdr-backend) created in [Strapi](https://strapi.io)
* It is a PWA which can be installed on android.
* Content can be saved from any android app / browser using native share action.
* Extracts article content using external ML api (on the backend)
* Some basic but efficient caching strategy (service worker + localstorage)
* Custom implementation of material design use case [Reply](https://material.io/design/material-studies/reply.html) in vuetify.

This is still work in progress and some important features are still missing (ie removing saved articles from frontend etc)

### Screenshots

![Main Feed](https://github.com/chm-dev/rdr-frontend/raw/master/public/img/screenshot1.png)
![Article](https://github.com/chm-dev/rdr-frontend/raw/master/public/img/screenshot2.png)

### [Demo](https://rdr.chm.dev)
test user: demo / demotestpassword


