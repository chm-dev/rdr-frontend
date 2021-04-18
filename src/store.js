export default {
  state: {
    tabValues      : [
      'new', 'read', 'trash'
    ],
    activeTab      : 'new',
    showNav        : true,
    transitionName : 'slide-x-transition',

    changeActiveTab: function (tabValue) {
      if (tabValue !== this.activeTab) {
        this.activeTab = tabValue;
      }
    },
    toggleNav      : function (isVisible) {
      this.showNav = isVisible;
    }
  }
};
