export const state = () => ({
  isLoading: false,
  apiPath: process.env.FULL_URL,
  cities: [
    {
      name: 'Алматы',
      code: '4756',
      homebankCode: '050000'
    },
    {
      name: 'Шымкент',
      code: '12787',
      homebankCode: '160000'
    },
    {
      name: 'Караганда',
      code: '7669',
      homebankCode: '100000'
    },
    {
      name: 'Тараз',
      code: '11518',
      homebankCode: '080000'
    },
    {
      name: 'Нур-Султан',
      code: '4961',
      homebankCode: '010000'
    },
    {
      name: 'Павлодар',
      code: '10020',
      homebankCode: '140001'
    },
    {
      name: 'Усть-Каменогорск',
      code: '11903',
      homebankCode: '070000'
    },
    {
      name: 'Семей',
      code: '15481',
      homebankCode: '071400'
    },
    {
      name: 'Кызылорда',
      code: '8402',
      homebankCode: '120000'
    },
    {
      name: 'Актобе',
      code: '4693',
      homebankCode: '030000'
    },
    {
      name: 'Актау',
      code: '13435',
      homebankCode: '130000'
    },
    {
      name: 'Костанай',
      code: '8199',
      homebankCode: '110000'
    },
    {
      name: 'Петропавловск',
      code: '10212',
      homebankCode: '150000'
    },
    {
      name: 'Уральск',
      code: '11883',
      homebankCode: '090000'
    },
    {
      name: 'Атырау',
      code: '4994',
      homebankCode: '060000'
    },
    {
      name: 'Кокшетау',
      code: '8064',
      homebankCode: '020000'
    },
    {
      name: 'Жесказган',
      code: '7144',
      homebankCode: '100600'
    },
    {
      name: 'Талдыкорган',
      code: '11490',
      homebankCode: '040000'
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
