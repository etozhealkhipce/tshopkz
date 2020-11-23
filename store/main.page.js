import Nanogram from 'nanogram.js'

export const state = () => ({
  mainCategories: [
    {
      title: '',
      subtitle: '',
      image: {
        path: '',
        alt: ''
      }
    }
  ],
  instagramUsername: '',
  instagramPhotos: [],
  faq: [],
  sliders: []
})

export const mutations = {
  SET_INSTAGRAM_USERNAME(state, instagramUsername) {
    state.instagramUsername = instagramUsername
  },
  SET_ISTAGRAM_PHOTOS(state, instagramPhotos) {
    state.instagramPhotos = instagramPhotos
  },
  SET_FAQ(state, faq) {
    state.faq = faq
  },
  SET_SLIDERS(state, sliders) {
    state.sliders = sliders
  }
}

export const actions = {
  async fetchInstagram({ commit }) {
    try {
      const socialNetworks = await this.$axios.get('/social-networks')
      const instagramLoginResponse = socialNetworks.data.filter((element) => element.title === 'Instagram')
      const instagramLogin = instagramLoginResponse.length !== 0 ? instagramLoginResponse[0].slug.slice(22) : ''

      if (instagramLogin) {
        const response = await new Nanogram().getMediaByUsername(instagramLogin)

        const instagramPhotos = response.profile.edge_owner_to_timeline_media.edges
          .filter((element) => {
            return !element.node.is_video
          })
          .slice(0, 6)

        const username = instagramLogin

        commit('SET_INSTAGRAM_USERNAME', username)
        commit('SET_ISTAGRAM_PHOTOS', instagramPhotos)
      }
    } catch (error) {
      console.log(error)
    }
  },
  async fetchFaq({ commit }) {
    const response = await this.$axios.get('/faqs')

    commit('SET_FAQ', response.data)
  },
  async fetchSliders({ commit }) {
    const response = await this.$axios.get('/sliders')

    commit('SET_SLIDERS', response.data)
  }
}

export const getters = {
  getMainCategories(state) {
    return state.mainCategories
  },
  getInstagramPhotos(state) {
    return state.instagramPhotos
  }
}
