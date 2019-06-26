import popup from './modules/popup'
import auth from './modules/auth'
import alert from './modules/alert'
// Vue.use(Vuex)
//import Vuex from 'vuex';

const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   modules: {
//     popup
//   },
//   strict: debug
// })

const store = {
  modules: {
    popup,
    auth,
    alert
  },
  strict: debug
};


export default store;
export function getStore(storeName, key) {
  var getter = store.modules[storeName]["getters"][key];
  //console.log("getter",getter);
  return getter(store.modules[storeName]["state"]);
}
