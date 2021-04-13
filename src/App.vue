<template>
  <v-app>
    <v-main>
      <bottom-nav />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import BottomNav from './components/BottomNav';


export default {
  name: 'RDR',
  components: {
    BottomNav,
  }
}
</script>