<template>
  <div>
    <BottomNav />
    <v-list-item v-for="(article, key) in articles" :key="key">
      <router-link :to="'/article/' + article.id">
        <v-list-item-avatar rounded="0">
          <v-img :src="article.coverUrl" v-if="article.coverUrl"></v-img>
        </v-list-item-avatar>
      </router-link>
      <v-list-item-content>
        <router-link :to="'/article/' + article.id">
          <v-list-item-title> {{ article.title }}</v-list-item-title>
        </router-link>
        <v-list-item-subtitle>
          {{ article.summary }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider v-if="articles.length > key + 1" inset></v-divider>
  </div>
</template>

<script>
import config from "../config";
import axios from "axios";
import store from "../store";

import BottomNav from "./BottomNav.vue";
const { backendUrl } = config;

export default {
  data: () => {
    return {
      articles: [],
      activeTab: store.state.activeTab,
      store: store,
      key: 0
    };
  },
  methods: {
    fetchContent: activeTab => {
      let reqQuery = "?";
      switch (activeTab) {
        case "new":
          reqQuery += "isRead_eq=false";
          break;
        case "read":
          reqQuery += "isRead_eq=true";
          break;
        case "trash":
          reqQuery += "";
          break;
        default:
          break;
      }
      return new Promise((resolve, reject) => {
        try {
          axios.get(`${backendUrl}/articles${reqQuery}`).then(res => {
            resolve(
              res.data.sort(function(a, b) {
                const d1 = new Date(a.updated_at);
                const d2 = new Date(b.updated_at);
                return d1 > d2 ? -1 : 1;
              })
            );
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  },

  components: {
    BottomNav
  },
  mounted() {
    //  fetchContent( this.$route.params.id ).then( res =>
    //    this.articles=res );
  },

  beforeMount() {
    this.fetchContent(this.$route.params.id).then(res => (this.articles = res));
  }
};
</script>

<style lang="scss" scoped></style>
