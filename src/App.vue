<template>
  <v-app class="backdrop-color" style="height: 100vh; width: 100vw; overflow: auto;">
    <v-main>
      <v-container class="pa-0" fluid style="height: 100%;">
        <transition :name="transitionName" mode="in">
          <router-view @snackbar="onSnackbar" style="transition: all .3s; position: absolute; left:0; top: 0; width: 100%;"></router-view>
        </transition>

      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" timeout="2500">
      {{ snackInfo }}
    </v-snackbar>
  </v-app>
</template>
<script>
export default {
  name: "RDR",
  data () {
    return {
      transitionName: "slide-left",
      snackbar: false,
      snackInfo: "",
    };
  },
  watch: {
    $route ( to, from ) {
      this.transitionName=
        from.path.search( /^\/list/ )===-1? "slide-right":"slide-left";
    }
  },
  methods: {
    onSnackbar: function( info ) {
      this.snackbar=true;
      this.snackInfo=info;
    },

  },
  mounted () {
    console.log( this.$route );
  }
};
</script>

<style >
.backdrop-color {
  background-color: var(--v-bgcolor-base) !important;
}
</style>
