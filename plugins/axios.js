export default function({ $axios, $auth, route }) {
  $axios.onRequest(() => {
    if (route.query && route.query.token) {
      $auth.setToken('local', route.query.token)
    }
  })

  $axios.onError((error) => {
    console.log(error)
    // if (error.response.status === 500 || error.response.status === 404) {
    //   redirect('/')

    // }
  })
}
