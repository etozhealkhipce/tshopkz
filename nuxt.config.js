require('dotenv').config()

export default {
  pageTransition: 'page',
  router: {
    // base: process.env.MODE === 'dev' ? '/' : '/tshop'
  },
  mode: process.env.MODE === 'dev' ? 'universal' : 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js', body: true }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '~/assets/style/main.scss', lang: 'scss' },
    { src: '~/static/fonts/stylesheet.css', lang: 'css' },
    { src: '~/static/icons/style.css', lang: 'css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vuelidate', '~/plugins/viewer'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv'
  ],
  styleResources: {
    scss: ['~/assets/style/_mixins.scss', '~/assets/style/_variables.scss']
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/bulma', '@nuxtjs/dotenv', '@nuxtjs/auth', 'vue-scrollto/nuxt'],
  /*
   ** Build configuration
   */
  build: {
    // publicPath: process.env.MODE === 'dev' ? '/' : '/tshop',
    vendor: ['axios', 'vuelidate'],
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  axios: {
    baseURL: process.env.API_URL
  },
  auth: {
    redirect: {
      login: '/auth',
      logout: '/',
      callback: '/',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'post'
          },
          user: {
            url: '/user',
            method: 'get',
            propertyName: false
          }
        }
      }
    }
  }
}
