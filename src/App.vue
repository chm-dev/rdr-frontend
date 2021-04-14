<template>
  <v-app>
    <v-main>
      <v-container class="pa-0">
        <bottom-nav />
        <router-view></router-view>
      </v-container>
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