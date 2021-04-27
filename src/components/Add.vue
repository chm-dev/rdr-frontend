<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
import config from "../config";
import axios from "axios";

export default {
  data() {
    return {
      url: "",
      loading: false
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to);
    console.log(from);
    if (to.query.url && /^https?:\/\/.{1,}\..*/i.test(to.query.url))
      next(vm => {
        vm.url = to.query.url;
      });
    else
      next(vm => {
        vm.$emit("snackbar", "Wrong url format. Article not added.");
        vm.$router.push(from.path || "/");
      });
  },
  mounted() {
    this.loading = true;
    axios
      .get(`${config.backendUrl}/content-fetcher/add?url=${this.url}`)
      .then(res => {
        console.log(res);
        this.loading = false;
        this.$router.push(`/article/${res.data.id}`);
      })
      .catch(err => {
        console.log(err);
        this.$emit("snackbar", "Error adding article.");
        this.$router.push("/");
      });
  }
};
</script>

<style lang="scss" scoped></style>
