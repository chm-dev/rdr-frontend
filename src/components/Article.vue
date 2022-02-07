<template>
  <div>
    <v-app-bar dense hide-on-scroll fixed scroll-target=".v-application">
      <v-app-bar-nav-icon>
        <v-btn icon @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title style="line-height: 1em">
        <span v-show="content && content.updated_at">
          <p class="subtitle-2 pa-0 ma-0" style="line-height: 1em;">
            Added
          </p>
          <timeago :datetime="new Date(content.updated_at)" class="caption"></timeago>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-divider></v-divider>
    <div :style="
        'background-image: url(' +
          content.coverUrl +
          '); background-size: cover; background-position: 50% 50%; padding-top: 48px;'
      ">
      <div style="background-image: linear-gradient(#fff1, #fff ); backdrop-filter: blur(3px)">
        <h1 class="h1 text-center white--text py-8 my-0" style="line-height: 1.2em; filter: drop-shadow(0 0 0.5rem #222)">
          {{ content.title }}
        </h1>

        <v-card class="pa-2 mx-0" style="background-color: transparent">
          <v-card-title class="pa-0 my-0 text-subtitle-2" style="font-size: 1em; color: #222; filter: drop-shadow(3px 2px 2px.85rem #fff); padding-bottom: 0 !important">
            Summary:</v-card-title>
          <v-card-text class="py-1 my-0 font-weight-regular font-italic" style="color: #223">
            <blockquote class="blockquote py-1 pl-2 my-0 text-body-2">
              {{ content.summary }}
            </blockquote>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-container>
      <p v-if="content.content && content.content.html" v-html="content.content.html.replace('<img','<v-img').replace('</img','</v-img')" class="article-html"></p>
    </v-container>
  </div>
</template>

<script>
import config from "../config";
import axios from "axios";
import store from "../store";

const { backendUrl }=config;

const fetchContent=articleId => {
  console.log( articleId );
  if( articleId )
    return new Promise( ( resolve, reject ) => {
      try {
        axios.get( `${backendUrl}/articles/${articleId}` ).then( res => {
          resolve( res.data );
        } );
      } catch( err ) {
        reject( err );
      }
    } );
};

export default {
  data () {
    return {
      showSummary: false,
      from: null,

      content: { title: null, updated_at: null }
    };
  },
  methods: {
    goBack () {
      this.from.name? this.$router.go( -1 ):this.$router.push( "/" );
    }
  },
  mounted () {
    store.state.toggleNav( false );


  },

  beforeRouteEnter ( to, from, next ) {
    console.log( to );
    next( vm => {
      vm.from=from;
    } );
  },

  beforeMount () {
    fetchContent( this.$route.params.id ).then( res => this.content=res );

  }
};
</script>

<style lang="css">
figure img,
.article-html img,
.article-html iframe {
  max-width: 100% !important;
}

.article-html iframe {
  width: 60vw;
  height: 40vw;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
blockquote {
  border-left: 3px solid #ccc;
}
</style>
