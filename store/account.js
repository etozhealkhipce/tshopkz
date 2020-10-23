export const state = () => ({
  wishlist: [],
  orders: []
})

export const mutations = {
  ADD_WISHLIST(state, wishlist) {
    state.wishlist = wishlist
  },
  ADD_ORDERS(state, orders) {
    state.orders = orders
  }
}
export const actions = {
  async fetchWishlist({ commit }) {
    const response = await this.$axios.get('/user/wishlist')
    commit('ADD_WISHLIST', response.data)
  },
  async fetchOrders({ commit }) {
    const response = await this.$axios.get('/user/orders')
    commit('ADD_ORDERS', response.data)
  }
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  loggedInUser(state) {
    return state.auth.user
  }
}
