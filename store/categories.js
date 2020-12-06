// import Vue from 'vue'

export const state = () => ({
  categories: [],
  categoryProducts: [],
  category: {}
})

export const mutations = {
  ADD_CATEGORIES(state, categories) {
    state.categories = categories
  },
  ADD_CURRENT_CATEGORY(state, category) {
    state.category = category
  },
  ADD_CATEGORY_PRODUCTS(state, products) {
    state.categoryProducts = products
  }
}

export const actions = {
  async fetchCategories({ commit }) {
    const response = await this.$axios.get('/categories')

    const categories = []

    for (const category of response.data.data) {
      const newCategory = Object.assign({}, category)
      const subcategories = await this.$axios.get(`/categories/${category.slug}/subcategories`)
      newCategory.subcategories = subcategories.data.data

      if (!newCategory.parent_id) {
        categories.push(newCategory)
      }
    }

    commit('ADD_CATEGORIES', categories)
  },
  async fetchCurrentCategory({ commit }, slug) {
    const response = await this.$axios.get(`/categories/${slug}`)
    commit('ADD_CURRENT_CATEGORY', response.data)
  },
  async fetchCategoryProducts({ commit }, request) {
    const response = await this.$axios.get(`/categories/${request.slug}/products`, {
      params: {
        sort: request.param
      }
    })
    commit('ADD_CATEGORY_PRODUCTS', response.data.data)
  }
}

export const getters = {
  getCategories(state) {
    return state.categories
  },
  getCurrentCategory(state) {
    return state.category
  },
  getCategoryProducts(state) {
    return state.categoryProducts
  }
}
