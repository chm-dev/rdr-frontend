<template>
  <v-bottom-navigation fixed hide-on-scroll v-model="activeTab" :input-value="state.showNav">
    <v-row align="center" justify="center">
      <v-btn large plain text :value="tabValues[0]">
        <span> Not read</span>
        <v-icon>mdi-inbox</v-icon>
      </v-btn>
      <v-btn large plain text :value="tabValues[1]">
        <span>Read</span>
        <v-icon>mdi-read</v-icon>
      </v-btn>
      <v-btn large plain text :value="tabValues[2]">
        <span>Trash</span>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
  </v-bottom-navigation>
</template>

<script>
import store from '../store';

export default {
  data () {
    return {
      activeTab: store.state.activeTab,
      tabValues: store.state.tabValues,
      showNav: store.state.showNav,
      state: store.state
    };
  },
  watch: {
    activeTab ( newValue ) {
      console.log( this.$route );
      store.state.changeActiveTab( newValue );
      this.$router.push( '/list/'+newValue );
    },

  },
}
</script>

<style lang="scss" scoped>
</style>
