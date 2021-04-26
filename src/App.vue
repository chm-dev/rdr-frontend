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
        <v-btn
          color="primary"
          @click="dialog = true"
          fab
          small
          fixed
          bottom
          right
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-main>
    <v-snackbar v-model="snackbar" timeout="2500">{{ snackInfo }}</v-snackbar>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text class="pt-8">
          <v-text-field
            label="Url to add"
            autofocus
            :rules="[
              v =>
                v && v.match(/^https?:\/\/.{1,}\..*/g)
                  ? true
                  : false || 'Wrong format'
            ]"
          ></v-text-field>

          <small class="grey--text">* Paste url to save for later.</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text color="primary" @click="dialog = false">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: "RDR",
  data() {
    return {
      transitionName: "slide-left",
      snackbar: false,
      dialog: false,
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
