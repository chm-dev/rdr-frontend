<template>
  <div>

    <v-footer padless fixed grow horizontal bottom class="px-0 justify-space-between align-stretch flex-grow-1 flex-shrink-0 ">
      <v-row no-gutters align-content="center">

        <v-col cols="4">
          <v-speed-dial v-model="listMenu">
            <template v-slot:activator>
              <v-btn active-class="" color="primary" elevation="0" v-model="listMenu" style="height: 100%">
                <v-icon class="ma0" color="white">
                  mdi-menu-{{listMenu ? 'down' : 'up'}}</v-icon>
                <v-icon large class="ma0" color="white">
                  {{activeTabIcon}}</v-icon>
              </v-btn>
            </template>
            <v-row no-gutters v-if="activeTab !== tabValues[0]">
              <v-col cols="3">
                <v-btn @click="activeTab = tabValues[0]" small fab dark color="secondary">
                  <v-icon rounded>chm-reading-newspaper</v-icon>
                </v-btn>
              </v-col>
              <v-col class="pl-1">
                <span class="fab-desc pa-1 secondary elevation-2">reading list</span>
              </v-col>
            </v-row>
            <v-row no-gutters v-if="activeTab !== tabValues[1]">
              <v-col cols="3">
                <v-btn @click="activeTab = tabValues[1]" small fab dark color="primary">
                  <v-icon rounded>mdi-checkbox-marked-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col class="pl-1">
                <span class="fab-desc pa-1 elevation-2">read already</span>
              </v-col>
            </v-row>

            <v-row no-gutters v-if="activeTab !== tabValues[2]">
              <v-col cols="3">
                <v-btn small fab style="background-color: var(--v-bgcolor-base)" @click="activeTab = tabValues[2]">
                  <v-icon color="primary" style="text-shadow: unset">mdi-archive-outline</v-icon>
                </v-btn>
              </v-col>
              <v-col class="pl-1">
                <span class="fab-desc pa-1 elevation-2" style="background-color: var(--v-bgcolor-base); color: var(--var-primary-base); font-weight: 400 !important">archived</span>
              </v-col>
            </v-row>
          </v-speed-dial>
        </v-col>
        <v-col>
          <v-btn elevation="4" fab icon large class="add-article" @click="dialog = true">
            <v-icon class="ma-0" color="white">
              mdi-plus-thick</v-icon>
          </v-btn>
        </v-col>
        <v-col>

          <v-btn x-large color="white" icon class="edge edge-left">
            <v-icon large class="ma0" color="white">mdi-dots-vertical</v-icon>
          </v-btn>
        </v-col>

      </v-row>
    </v-footer>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card color="">
        <v-card-text class="pt-8">
          <v-text-field v-model="url" label="Url to add" autofocus :rules="[
              v =>
                v && v.match(/^https?:\/\/.{1,}\..*/g)
                  ? true
                  : false || 'Wrong format'
            ]"></v-text-field>

          <small class="grey--text">* Paste url to save for later.</small>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="cancel">
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" @click="add">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import store from "../store";
// import thm from '../plugins/vuetify/theme';

export default {
  data () {
    return {
      activeTab: this.$route.params.id,

      tabValues: store.state.tabValues,
      showNav: store.state.showNav,
      state: store.state,
      store: store,
      iconName: "mdi-reply",
      dialog: false,
      url: "",
      listMenu: false
    };
  },

  computed: {
    activeTabIcon () {
      let icoName;
      switch( this.activeTab ) {
        case this.tabValues[ 0 ]:
          icoName='chm-reading-newspaper';
          break;
        case this.tabValues[ 1 ]:
          icoName='mdi-checkbox-marked-outline';
          break;
        case this.tabValues[ 2 ]:
          icoName='mdi-archive-outline';
          break;

        default:
          icoName=false;
          break;

      }
      return icoName;

    },


  },
  beforeRouteEnter ( to, from, next ) {
    console.log( to.params.id );
    next( vm => {
      console.log( 'hej' );
      console.log( vm.activeTab );
      vm.activeTab=to.params.id;
    } );
  },

  watch: {
    activeTab ( newValue ) {
      console.log( this.$route );
      store.state.changeActiveTab( newValue );
      this.$router.push( "/list/"+newValue );
    }
  },
  methods: {
    add: function() {
      this.dialog=false;
      this.$router.replace( `/add/?url=${encodeURIComponent( this.url )}` );
      this.url="";
    },
    cancel: function() {
      this.dialog=false;
      this.url="";
    }
  },
};
</script>

<style lang="scss">
.v-footer {
  background: transparent
    radial-gradient(
      circle at center 20%,
      transparent 34px,
      var(--v-primary-base) 35px
    ) !important;
  justify-content: stretch;

  .fab-desc {
    align-self: center;
    color: white;
    font-weight: normal;
    background-color: var(--v-primary-base);
  }

  .v-speed-dial__list {
    width: 200px !important;
    max-width: 100vw;
    align-items: end;
    div.row.no-gutters {
      width: 100%;
    }
    div.col {
      justify-content: left;
      .v-icon {
        text-shadow: 2px 2px #444;
      }
    }
  }

  div.col {
    display: flex;
    align-content: center;
    justify-content: center;

    button.v-btn:before {
      content: none;
    }
  }

  button.v-btn.v-btn--icon.add-article {
    background-color: var(--v-secondary-base);
    border-radius: 100%;
    width: 60px;
    min-width: 60px;
    height: 60px;
    margin: 0;
    padding: 0;
    margin-top: -20px;
    border: 0;

    .v-icon {
      margin: 0;
      text-shadow: 2px 2px #444;
      transition: all 0.6s;
      > * {
        transition: all 0.6s;
      }
    }
  }
}
</style>
