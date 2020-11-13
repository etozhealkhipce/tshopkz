export const state = () => ({
  wishlist: [],
  orders: [],
  constructors: []
})

export const mutations = {
  ADD_WISHLIST(state, wishlist) {
    state.wishlist = wishlist
  },
  ADD_ORDERS(state, orders) {
    state.orders = orders
  },
  ADD_CONSTRUCTORS(state, constructors) {
    state.constructors = constructors
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
  },
  async fetchConstructors({ commit }) {
    const response = await this.$axios.get('/user/constructors')
    commit('ADD_CONSTRUCTORS', response.data)
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
