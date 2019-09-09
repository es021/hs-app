import {
  STORE_AUTH
} from '../../../_config/app-config';

function getStoreAuth() {
  // default state if not exist
  var state = {
    isLoggedIn: true,
    user: {
      ID: 1
    },
    loginTime: 1526865746,
  };

  try {
    var storeStr = localStorage.getItem(STORE_AUTH);

    if (storeStr == "{}") {
      return state;
    }

    var store = JSON.parse(storeStr);
    console.log(store)
    if (store == null || typeof store === "undefined") {
      return state;
    } else {
      return store;
    }

  } catch (err) {
    console.log("getStoreAuth error", err);
    return state;
  }
}

const state = getStoreAuth();
// getters
const getters = {
  authIsLoggedIn: (state) => state.isLoggedIn,
  authState: (state) => state,
  authUser: (state) => state.user
}

// mutations
const mutations = {}

// actions
const actions = {}

export default {
  state,
  getters,
  actions,
  mutations
}
