require('dotenv').config()

export default {
  pageTransition: 'page',
  router: {
    prefetchLinks: false
  },
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e22028' },
  render: {
    resourceHints: false
  },
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },
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
  plugins: [
    { src: '~/plugins/vuelidate', ssr: false, mode: 'client' },
    { src: '~/plugins/viewer', ssr: false, mode: 'client' }
  ],
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
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    '@nuxtjs/dotenv',
    '@nuxtjs/auth',
    'vue-scrollto/nuxt',
    [
      'nuxt-imagemin',
      {
        optipng: { optimizationLevel: 5 },
        gifsicle: { optimizationLevel: 2 }
      }
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    // publicPath: process.env.MODE === 'dev' ? '/' : '/tshop',
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    cache: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, { isServer, isDev, isClient }) {}
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
