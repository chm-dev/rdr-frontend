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

  },
  created () {
    if( this.$workbox ) {
      this.$workbox.addEventListener( "waiting", () => {
        this.showUpdateUI=true;
      } );
    }
    // init localstorage cache
    if( !localStorage.getItem( 'articlesCached' ) ) {
      const articleCacheStructure=JSON.stringify( { new: {}, read: {}, trash: {} } ); //move to config if more complex ?
      localStorage.setItem( 'articlesCached', articleCacheStructure );

    }

  },
  async accept () {
    this.showUpdateUI=false;
    await this.$workbox.messageSW( { type: "SKIP_WAITING" } );
  }
};
</script>

<style >
.backdrop-color {
  background-color: var(--v-bgcolor-base) !important;
}
</style>
