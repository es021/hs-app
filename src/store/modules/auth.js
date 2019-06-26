import {
  STORE_AUTH
} from '../../../_config/app-config';

function getStoreAuth() {
  // default state if not exist
  var state = {
    user: {
      "BRANCH_CODE": "16011011",
      "PC_ID": "020",
      "OPER_ID": "EJPN003",
      "OPER_NAME": "OPER 2 PUNYA NAMA",
      "KPT_NO": "930718115423",
      "OPER_LVL4": "10110011",
      "OPER_LVL8": "10110011",
      "BRANCH_NAME":"DEV EJPN"
    },
    login_time: 1526865746,
    authenticated: true
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
console.log(state);
// getters
const getters = {
  authState: state => state,
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
