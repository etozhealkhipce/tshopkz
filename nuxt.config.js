require('dotenv').config()

export default {
  pageTransition: 'page',
  router: {
    prefetchLinks: false
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Продажа игровых компьютеров в Казахстане'
      },
      { name: 'keywords', content: 'Интернет—магазин, компьютеры, игровые аксессуары' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#e22028' },
  render: {
    resourceHints: false
  },
  splitChunks: {
    layouts: true,
    pages: true,
    commons: true
  },
  css: [
    { src: '~/assets/style/main.scss', lang: 'scss' },
    { src: '~/static/fonts/stylesheet.css', lang: 'css' },
    { src: '~/static/icons/style.css', lang: 'css' }
  ],
  plugins: [{ src: '~/plugins/vuelidate' }, { src: '~/plugins/viewer' }],
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/style-resources', '@nuxtjs/dotenv'],
  styleResources: {
    scss: ['~/assets/style/_mixins.scss', '~/assets/style/_variables.scss']
  },
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
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    cache: true
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
      },
      social: {
        endpoints: {
          login: {
            propertyName: 'token'
          },
          logout: {
            url: '/logout',
            method: 'post'
          }
        }
      }
    },
    plugins: [{ src: '~/plugins/axios.js', ssr: false }]
  }
}
