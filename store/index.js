export const state = () => ({
  isLoading: false,
  apiPath: process.env.FULL_URL,
  cities: [
    {
      name: 'Алматы',
      code: '4756',
      postCode: '050000'
    },
    {
      name: 'Шымкент',
      code: '12787',
      postCode: '160000'
    },
    {
      name: 'Караганда',
      code: '7669',
      postCode: '100000'
    },
    {
      name: 'Тараз',
      code: '11518',
      postCode: '080000'
    },
    {
      name: 'Нур-Султан',
      code: '4961',
      postCode: '010000'
    },
    {
      name: 'Павлодар',
      code: '10020',
      postCode: '140001'
    },
    {
      name: 'Усть-Каменогорск',
      code: '11903',
      postCode: '070000'
    },
    {
      name: 'Семей',
      code: '15481',
      postCode: '071400'
    },
    {
      name: 'Кызылорда',
      code: '8402',
      postCode: '120000'
    },
    {
      name: 'Актобе',
      code: '4693',
      postCode: '030000'
    },
    {
      name: 'Актау',
      code: '13435',
      postCode: '130000'
    },
    {
      name: 'Костанай',
      code: '8199',
      postCode: '110000'
    },
    {
      name: 'Петропавловск',
      code: '10212',
      postCode: '150000'
    },
    {
      name: 'Уральск',
      code: '11883',
      postCode: '090000'
    },
    {
      name: 'Атырау',
      code: '4994',
      postCode: '060000'
    },
    {
      name: 'Кокшетау',
      code: '8064',
      postCode: '020000'
    },
    {
      name: 'Жесказган',
      code: '7144',
      postCode: '100600'
    },
    {
      name: 'Талдыкорган',
      code: '11490',
      postCode: '040000'
    }
  ]
})
export const mutations = {
  EDIT_IS_LOADING(state, value) {
    state.isLoading = value
  }
}
export const actions = {
  editIsLoading({ commit }, value) {
    commit('EDIT_IS_LOADING', value)
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
