// initial state
// shape: [{ id, quantity }]
const state = {
  isOpen: false,
  title: "Popup Title",
  content: null,
  prop: {},
  closeable: true
}

// getters
const getters = {
  popupState: state => state,
  // isOpen: state => state.isOpen,
  // title: state => state.title,
  // content: state => state.content,

  //   cartProducts: (state, getters, rootState) => {
  //     return state.added.map(({ id, quantity }) => {
  //       const product = rootState.products.all.find(product => product.id === id)
  //       return {
  //         title: product.title,
  //         price: product.price,
  //         quantity
  //       }
  //     })
  //   },

  //   cartTotalPrice: (state, getters) => {
  //     return getters.cartProducts.reduce((total, product) => {
  //       return total + product.price * product.quantity
  //     }, 0)
  //   }
}

// actions
const actions = {
  // openPopup({ commit, state }, { title, content }) {
  //     commit('openPopup', { title, content });
  // }
  // checkout({ commit, state }, products) {
  //     const savedCartItems = [...state.added]
  //     commit('setCheckoutStatus', null)
  //     // empty cart
  //     commit('setCartItems', { items: [] })
  //     shop.buyProducts(
  //         products,
  //         () => commit('setCheckoutStatus', 'successful'),
  //         () => {
  //             commit('setCheckoutStatus', 'failed')
  //             // rollback to the cart saved before sending the request
  //             commit('setCartItems', { items: savedCartItems })
  //         }
  //     )
  // },

  // addProductToCart({ state, commit }, product) {
  //     commit('setCheckoutStatus', null)
  //     if (product.inventory > 0) {
  //         const cartItem = state.added.find(item => item.id === product.id)
  //         if (!cartItem) {
  //             commit('pushProductToCart', { id: product.id })
  //         } else {
  //             commit('incrementItemQuantity', cartItem)
  //         }
  //         // remove 1 item from stock
  //         commit('decrementProductInventory', { id: product.id })
  //     }
}


// mutations
const mutations = {
  // pushProductToCart(state, { id }) {
  //     state.added.push({
  //         id,
  //         quantity: 1
  //     })
  // },

  // incrementItemQuantity(state, { id }) {
  //     const cartItem = state.added.find(item => item.id === id)
  //     cartItem.quantity++
  // },

  // setCartItems(state, { items }) {
  //     state.added = items
  // },

  // setCheckoutStatus(state, status) {
  //     state.checkoutStatus = status
  // },
  popupOpen(state, {
    title,
    content,
    prop,
    closeable
  }) {
    state.title = title;
    state.content = content;
    state.closeable = closeable;
    state.prop = prop;
    state.isOpen = true;
  },
  popupClose(state) {
    state.isOpen = false;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
