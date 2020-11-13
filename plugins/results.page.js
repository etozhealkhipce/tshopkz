export const state = () => ({
  results: []
})

export const mutations = {
  ADD_RESULTS(state, results) {
    state.results = results
  }
}

export const actions = {
  async fetchResults({ commit }, search) {
    const response = await this.$axios.post('product/search', {
      title: search
    })

    commit('ADD_RESULTS', response.data)
  }
}

export const getters = {}
