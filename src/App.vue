<template>
  <v-app>
    <v-main>
      <v-container class="pa-0">
        <transition :name="transitionName">
          <router-view
            @snackbar="onSnackbar"
            style="transition: all .5s; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          ></router-view>
        </transition>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" timeout="2500">{{ snackInfo }}</v-snackbar>
  </v-app>
</template>
<script>
export default {
  name: "RDR",
  data() {
    return {
      transitionName: "slide-left",
      snackbar: false,
      snackInfo: ""
    };
  },
  watch: {
    $route(to, from) {
      this.transitionName =
        from.path.search(/^\/list/) === -1 ? "slide-right" : "slide-left";
    }
  },
  methods: {
    onSnackbar: function(info) {
      this.snackbar = true;
      this.snackInfo = info;
    }
  }
};
</script>
