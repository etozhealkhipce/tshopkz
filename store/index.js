export const state = () => ({
  isLoading: false,
  apiPath: process.env.FULL_URL,
  cities: [
    {
      name: 'Алматы',
      code: 4756
    },
    {
      name: 'Шымкент',
      code: 12787
    },
    {
      name: 'Караганда',
      code: 7669
    },
    {
      name: 'Тараз',
      code: 11518
    },
    {
      name: 'Нур-Султан',
      code: 4961
    },
    {
      name: 'Павлодар',
      code: 10020
    },
    {
      name: 'Усть-Каменогорск',
      code: 11903
    },
    {
      name: 'Семей',
      code: 15481
    },
    {
      name: 'Кызылорда',
      code: 8402
    },
    {
      name: 'Актобе',
      code: 4693
    },
    {
      name: 'Костанай',
      code: 8199
    },
    {
      name: 'Петропавловск',
      code: 10212
    },
    {
      name: 'Уральск',
      code: 11883
    },
    {
      name: 'Атырау',
      code: 4994
    },
    {
      name: 'Темиртау',
      code: 11584
    },
    {
      name: 'Кокшетау',
      code: 8064
    },
    {
      name: 'Экибастуз',
      code: 12830
    },
    {
      name: 'Рудный',
      code: 10729
    },
    {
      name: 'Жесказган',
      code: 7144
    },
    {
      name: 'Туркестан',
      code: 11789
    },
    {
      name: 'Талдыкорган',
      code: 11490
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
