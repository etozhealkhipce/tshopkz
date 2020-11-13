export default function({ $axios, $auth, route }) {
  $axios.onRequest((config) => {
    if (route.query && route.query.token) {
      $axios.setToken(route.query.token, 'Bearer')
      $auth.setToken('local', 'Bearer ' + route.query.token)
    }
  })

  $axios.onError((error) => {
    console.log(error)
    // if (error.response.status === 500 || error.response.status === 404) {
    //   redirect('/')

    // }
  })
}
