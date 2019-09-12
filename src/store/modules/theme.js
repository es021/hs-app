const state = {
  AppHeader: {
    background: "#212121",
    title: "#4c84ff",
    subtitle: "#bdbdff",
    link: "#bdbdff",
    link_active: "#4c84ff",
  },
  AppLeftBar:{
    background : "rgb(19, 21, 53)",
    link: "white",
    link_active: "rgb(31, 54, 105)",
    title : "grey",
    count_background : "#f62626",
    count_color : "white"
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
