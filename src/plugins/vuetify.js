import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import light from './themes/light'
import icons from './themes/icons.json';
Vue.use(Vuetify);

console.log(icons);
export default new Vuetify({
theme:{
  options: {
    customProperties: true
    },
themes: { 
  light: light 
},
 }, 
 icons: {
  values: {
    toRead: icons.toRead
  }}

});
