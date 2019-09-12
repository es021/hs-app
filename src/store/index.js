import popup from './modules/popup'
import auth from './modules/auth'
import alert from './modules/alert'
import menu from './modules/menu'
import theme from './modules/theme'

const debug = process.env.NODE_ENV !== 'production'

const store = {
  modules: {
    popup,
    auth,
    alert,
    menu,
    theme
  },
  strict: debug
};


export default store;
export function getStore(storeName, key) {
  var getter = store.modules[storeName]["getters"][key];
  return getter(store.modules[storeName]["state"]);
}
