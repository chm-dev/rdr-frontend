<template>
  <div>
    <v-divider inset></v-divider>
    <v-list v-if="articles.length">
      <div v-for="(article, key) in articles" :key="key">
        <v-list-item three-line>
          <v-list-item-content class="pr-2">
            <router-link :to="'/article/' + article.id">
              <h4>{{ article.title }}</h4>
            </router-link>
            <v-list-item-subtitle @click="expandSummary" style="height: 2.4em;">
              <span>{{ article.summary }}</span>
              <v-icon style="opacity: .3;position: absolute; bottom: .4em; right: -5px">mdi-chevron-down</v-icon>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar v-if="article.coverUrl" right :left="false" rounded="0" size="75">
            <router-link :to="'/article/' + article.id" style="text-decoration: none">
              <v-img :src="article.coverUrl" v-if="article.coverUrl"></v-img>
            </router-link>
          </v-list-item-avatar>
        </v-list-item>

        <v-divider></v-divider>
      </div>
    </v-list>
    <div style="height: 100%;" class="d-flex justify-center align-center" v-else>
      <h2>No elements in this list</h2>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import config from "../config";
import axios from "axios";
import store from "../store";
import BottomNav from "./BottomNav.vue";
const { backendUrl }=config;


export default {

  data: () => {

    return {
      activeTab: '',
      articles: [],
      store: store,
      key: 0
    };
  },

  methods: {
    fetchContent: activeTab => {
      let reqQuery="?";
      switch( activeTab ) {
        case "new":
          reqQuery+="isRead_eq=false";
          break;
        case "read":
          reqQuery+="isRead_eq=true";
          break;
        case "trash":
          reqQuery+=""; //to be added
          break;
        default:
          break;
      }

      return new Promise( ( resolve, reject ) => {

        try {
          axios.get( `${backendUrl}/articles${reqQuery}` ).then( res => {
            resolve(
              res.data.sort( function( a, b ) {
                const d1=new Date( a.updated_at );
                const d2=new Date( b.updated_at );
                return d1>d2? -1:1;
              } )
            );
          } );
        } catch( err ) {
          reject( err );
        }
      } );
    },
    expandSummary ( ev ) {
      if( ev.srcElement.tagName!=="SPAN" ) return;

      const innerHeight=ev.srcElement.offsetHeight;
      const el=ev.srcElement.parentNode;
      const icon=el.querySelector( "i.v-icon" );

      if( el.style.height===`${innerHeight}px` ) {
        icon.className=icon.className.replace(
          "mdi-chevron-up",
          "mdi-chevron-down"
        );
        el.style.height="2.4em";
      } else {
        document
          .querySelectorAll( ".v-list-item .v-list-item__subtitle" )
          .forEach( el => ( el.style.height="2.4em" ) );
        icon.className=icon.className.replace(
          "mdi-chevron-down",
          "mdi-chevron-up"
        );
        el.style.height=`${innerHeight}px`;
      }
    }
  },

  components: {
    BottomNav
  },
  mounted () {
    this.fetchContent( this.activeTab ).then( res => {
      //articles has lstorage value at this point
      if( JSON.stringify( this.articles )!=JSON.stringify( res ) ) {
        this.articles=res;
        let articlesCached=JSON.parse( localStorage.getItem( 'articlesCached' ) );
        articlesCached[ this.activeTab ]=res;
        localStorage.setItem( 'articlesCached', JSON.stringify( articlesCached ) ); //update lstorage cache
        console.log( `Saved cached articles to ${this.activeTab}` );
      }
    } );
  },

  beforeRouteEnter ( to, from, next ) {
    const activeTab=to.params.id;
    console.log( to );
    let articlesCached=JSON.parse( localStorage.getItem( 'articlesCached' ) ); // if ls.cache is not here something went wrong
    const articles=articlesCached? articlesCached[ activeTab ]:[];

    next( vm => {
      vm.articles=articles;
      vm.activeTab=activeTab;


    } );
  },

  beforeRouteUpdate ( to, from, next ) {
    console.log( 'UPDATE' );
    const activeTab=to.params.id;

    let articlesCached=JSON.parse( localStorage.getItem( 'articlesCached' ) ); // if ls.cache is not here something went wrong
    const articles=articlesCached[ activeTab ]||[];
    this.fetchContent( activeTab ).then( res => {
      //articles has lstorage value at this point
      console.log(this.articles);
      console.log(res);
      if( JSON.stringify( this.articles )!=JSON.stringify( res ) ) {
        this.articles=res;
        let articlesCached=JSON.parse( localStorage.getItem( 'articlesCached' ) );
        articlesCached[ this.activeTab ]=res;
        localStorage.setItem( 'articlesCached', JSON.stringify( articlesCached ) ); //update lstorage cache
        console.log( `Saved cached articles to ${this.activeTab}` );
      }
    } );
    next( vm => { vm.articles=articles; this.activeTab=activeTab; } );
  },
  beforeMount () { }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.v-list-item__content {
  position: relative;
  h4 {
    line-height: 1.1em;
    max-height: 2.2em;
    overflow: hidden;
    position: relative;
    font-weight: 500;
    margin-bottom: 4px;
  }

}
.v-list-item__subtitle {
  transition: all 0.3s !important;
  -webkit-line-clamp: unset !important;
}
</style>
