<template>
  <v-container>
    <v-toolbar flat>
      <v-btn icon @click="goBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="red">mdi-heart-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import store from '../store';
export default {
  data () {
    return {

    };
  },
  methods: {
    goBack () {
      this.$router.go( -1 );
    }
  },
  beforeCreate () {
    store.state.toggleNav( false );
  },
  beforeRouteLeave ( to, from, next ) {
    if( to.name!==this.$route.name )
      store.state.toggleNav( true );
    next();
  },

}
</script>

<style lang="scss" scoped>
</style>