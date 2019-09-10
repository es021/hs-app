const state = {
  header: [{
      path: "/calendar",
      label: "Calendar",
      icon: "business",
    },
    {
      path: "/inbox",
      label: "Inbox",
      icon: "mic",
    },
    {
      path: "/notification",
      label: "Notification List",
      icon: "people",
    }
  ],
  leftBar: [{
      path: "/",
      label: "Home",
    },
    {
      path: "/my-profile",
      label: "My Profile",
      count: 1,
    },
    {
      path: "/company-profile",
      label: "Company Profile",
    },
    {
      path: "/university-profile",
      label: "University Profile",
      count: 2,
    },
    {
      isTitle: true,
      label: "Posting"
    },
    {
      path: "/jobs",
      label: "Jobs",
    },
  ],
}


// getters
const getters = {
  menuLeftBar: state => state.leftBar,
  menuHeader: state => state.header,
}

const actions = {}


// mutations
const mutations = {
  menuSetHeader(state, datas) {
    state.header = datas;
  },
  menuSetLeftBar(state, datas) {
    state.leftBar = datas;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
