export default function({ $axios, $auth, route, redirect }) {
  if (route.query && route.query.token) {
    try {
      $auth.setUserToken(route.query.token)
    } catch {
      console.log('error')
    }
  }

  // $axios.onError((error) => {
  //   if (error.response.status === 500) {
  //     redirect('/')
  //   } else if (error.response.status === 404) {
  //     redirect('/')
  //   }
  // })
}
