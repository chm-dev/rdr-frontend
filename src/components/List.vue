<template>

  <v-row>
    <v-col cols="12">
      <v-list three-line>
        <template v-for="(article, key) in articles">

          <v-list-item :key="key">
            <router-link :to="'/article/'+article.id" :key="key">
              <v-list-item-avatar rounded="0">

                <v-img :src="article.coverUrl" v-if="article.coverUrl"></v-img>
              </v-list-item-avatar>
            </router-link>
            <v-list-item-content>
              <router-link :to="'/article/'+article.id" :key="key">
                <v-list-item-title> {{ article.title }}</v-list-item-title>
              </router-link>
              <v-list-item-subtitle>
                {{article.summary}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="articles.length > key + 1" :key="article.url" inset></v-divider>
        </template>
      </v-list>

    </v-col>
  </v-row>

</template>

<script>
import axios from 'axios';
import store from '../store';

const fetchContent=activeTab => {
  let reqQuery='?';
  switch( activeTab ) {
    case 'new':
      reqQuery+="isRead_eq=false";
      break;
    case 'read':
      reqQuery+="isRead_eq=true";
      break;
    case 'trash':
      reqQuery+="";
      break;
    default:
      break;
  }
  return new Promise( ( resolve, reject ) => {
    try {
      axios.get( 'http://192.168.0.20:1337/articles'+reqQuery ).then(
        ( res ) => {
          resolve(
            res.data.sort(
              function( a, b ) {
                const d1=new Date( a.updated_at );
                const d2=new Date( b.updated_at );
                return d1>d2? -1:1;
              }
            ) );
        } );

    } catch( err ) { reject( err ); }

  } );
};



export default {
  data: () => {
    return {
      articles: '',
      activeTab: store.state.activeTab,
      store: store
    };
  },
  watch: {
    $route ( to ) {
      fetchContent( to.params.id ).then( res => this.articles=res );
    }
  },
  mounted () {
    //  fetchContent( this.$route.params.id ).then( res =>
    //    this.articles=res );
  },
  beforeRouteEnter ( to, from, next ) {
    next( vm => {
      fetchContent( vm.$route.params.id ).then( res =>
        vm.articles=res );


    } );
  },


}



</script>

<style lang="scss" scoped>
</style>