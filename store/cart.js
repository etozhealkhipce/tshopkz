export const state = () => ({
  products: []
})

export const mutations = {
  ADD_CART_PRODUCTS(state, products) {
    if (products !== null) {
      state.products = products
    }
  }
}
export const actions = {
  addCartProducts({ commit }, products) {
    commit('ADD_CART_PRODUCTS', JSON.parse(products))
  }
}
export const getters = {}
