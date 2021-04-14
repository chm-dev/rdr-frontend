<template>
  <div>
    <v-img
      lazy-src="/articleBG.jpg"
      :src="content.coverUrl"
      gradient="transparent, #fff"
    >
      <v-toolbar flat color="rgba(255,255,255,0.75)">
        <v-row>
          <v-col>
            <v-btn icon @click="goBack()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8">
            <span v-show="content && content.updated_at">
              <p class="pa-0 ma-0 font-weight-black">Added</p>
              <timeago :datetime="new Date(content.updated_at)"></timeago>
            </span>
          </v-col>
          <v-col style="text-align: right">
            <v-btn icon>
              <v-icon color="red">mdi-heart-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-divider></v-divider>

      <h1
        class="h1 text-center white--text my-8"
        style="line-height: 1.2em; filter: drop-shadow(0 0 0.5rem #222)"
      >
        {{ content.title }}
      </h1>
    </v-img>
    <v-card
      elevation="1"
      class="pa-2 mx-0"
      style="backdrop-filter: blur(4px); background-color: #eee2;margin-top: -64px"
    >
      <v-card-title
        class="py-1 my-0 text-subtitle-2"
        style="font-size: 1em; color: #222; filter: drop-shadow(3px 2px 2px.85rem #fff); padding-bottom: 0 !important"
      >
        Summary:</v-card-title
      >
      <v-card-text
        class="py-1 my-0 font-weight-regular font-italic"
        style="color: #223"
      >
        <blockquote class="blockquote py-1 my-0 text-body-2">
          {{ content.summary }}
        </blockquote>
      </v-card-text>
    </v-card>

    <v-container>
      <p v-html="content.content" class="article-html"></p>
    </v-container>
  </div>
</template>

<script>
import config from "../config";
import axios from "axios";
import store from "../store";

const { backendUrl } = config;

const fetchContent = articleId => {
  console.log(articleId);
  if (articleId)
    return new Promise((resolve, reject) => {
      try {
        axios.get(`${backendUrl}/articles/${articleId}`).then(res => {
          resolve(res.data);
        });
      } catch (err) {
        reject(err);
      }
    });
};

export default {
  data() {
    return {
      showSummary: false,
      from: null,
      content: { title: null, updated_at: null }
    };
  },
  methods: {
    goBack() {
      this.from.name ? this.$router.go(-1) : this.$router.push("/");
    }
  },
  beforeCreate() {
    store.state.toggleNav(false);
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== this.$route.name) store.state.toggleNav(true);
    next();
  },

  beforeRouteEnter(to, from, next) {
    console.log(to);
    next(vm => {
      vm.from = from;
      fetchContent(vm.$route.params.id).then(res => (vm.content = res));
    });
  }
};
</script>

<style lang="css">
figure img,
.article-html img {
  max-width: 100% !important;
}
</style>
