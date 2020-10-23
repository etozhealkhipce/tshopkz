// import Vue from 'vue'

export const state = () => ({
  product: {}
})

export const mutations = {
  ADD_PRODUCT(state, product) {
    state.product = product
  }
}

export const actions = {
  async fetchProduct({ commit }, slug) {
    const response = await this.$axios.get(`/products/${slug}`)
    commit('ADD_PRODUCT', response.data)
  }
}

export const getters = {
  getProduct(state) {
    return state.product
  }
}
