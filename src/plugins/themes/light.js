// src/plugins/vuetify/theme.js

import colors from 'vuetify/lib/util/colors'
console.log(colors);
export default {
  primary: {
    base: colors.blueGrey.darken3,
    darken1: colors.blueGrey.darken4,
    error: '#ff7178',
  },
  bgcolor: '#D2DBE0',
  bgcolor2: colors.blue.lighten5,
  secondary: colors.orange.accent3,
  // All keys will generate theme styles,
  // Here we add a custom `tertiary` color
  tertiary: colors.pink.base,
}// src/plugins/vuetify/theme.js



      

/* {
  primary: #607d8b,
  secondary: #ff9800,
  accent: #3f51b5,
  error: #f44336,
  warning: #ffc107,
  info: #673ab7,
  success: #4caf50
  } */