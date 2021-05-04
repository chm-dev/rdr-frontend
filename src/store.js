export default {
  state: {
    tabValues      : [
      'new', 'read', 'trash'
    ],
    showNav        : true,
    transitionName : 'slide-x-transition',
    activeTab: 'new',

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
