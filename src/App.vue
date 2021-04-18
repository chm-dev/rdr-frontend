<template>
  <v-app>
    <v-main>
      <v-container class="pa-0">
        <transition :name="transitionName">
          <router-view
            style="transition: all .5s; position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          ></router-view>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "RDR",
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  watch: {
    $route(to, from) {
      this.transitionName =
        from.path.search(/^\/list/) === -1 ? "slide-right" : "slide-left";
    }
  }
};
</script>
