<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">

            <v-list two-line>
              <template v-for="(article, key) in articles">

                <v-list-item :key="key">
                  <v-list-item-avatar rounded="0">
                    <v-img :src="article.coverUrl" v-if="article.coverUrl"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> {{ article.title }}</v-list-item-title>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios=require( 'axios' );
export default {
  data: () => {
    return {
      articles: '',
      cards: [ 'Today', 'Yesterday' ],
      drawer: null,
      links: [
        [ 'mdi-inbox-arrow-down', 'Articles' ],
        [ 'mdi-read', 'Read' ],
        [ 'mdi-delete', 'Trash' ],
      ],
    };
  },
  mounted () {
    this.articles='chuj';
    axios
      .get( 'http://192.168.0.20:1337/articles' )
      .then( res => {
        this.articles=res.data.sort(
          function( a, b ) {
            const d1=new Date( a.updated_at );
            const d2=new Date( b.updated_at );
            return d1>d2? -1:1;
          }
        );
      } );

  }
}
</script>