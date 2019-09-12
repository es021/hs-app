const state = {
  AppHeader: {
    background: "#212121",
    title: "#4c84ff",
    subtitle: "#bdbdff",
    link: "#bdbdff",
    link_active: "#4c84ff",
  },
  AppLeftBar:{
    background : "#bfc0c6",
    link: "red",
    link_active: "cyan",
    title : "blue",
    count_background : "yellow",
    count_color : "green"
  }
}


// getters
const getters = {
  themeAppHeader: state => state.AppHeader,
  themeAppLeftBar: state => state.AppLeftBar,
}

const actions = {}


// mutations
const mutations = {
  themeSetAppHeader(state, style) {
    state.AppHeader = style;
  },
  themeAppLeftBar(state, style) {
    state.AppLeftBar = style;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
