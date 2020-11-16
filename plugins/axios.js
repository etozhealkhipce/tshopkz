export default function({ $axios, $auth, route }) {
  $axios.onRequest(() => {})

  $axios.onError((error) => {
    console.log(error)
    // if (error.response.status === 500 || error.response.status === 404) {
    //   redirect('/')

    // }
  })
}
