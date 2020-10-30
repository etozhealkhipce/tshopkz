<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="catalog">
          <div v-if="!isLoading && newProducts.length" class="columns is-multiline is-variable is-4">
            <div v-if="games && monitors" class="column is-full">
              <div class="columns is-multiline is-centered">
                <div class="column is-8 is-centered">
                  <h2 class="title is-4 has-text-centered">Показать FPS в играх</h2>

                  <div class="columns is-multiline is-centered">
                    <div class="column is-6">
                      <label class="label" for="games">Выберите игру</label>
                      <div class="custom-select">
                        <select id="games" v-model="fpsFilter.game">
                          <option v-for="(game, index) in games" :key="`game-${index}`" :value="game.id">{{
                            game.name
                          }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="column is-6">
                      <label class="label" for="monitors">Выберите разрешение</label>
                      <div class="custom-select">
                        <select id="monitors" v-model="fpsFilter.monitor">
                          <option v-for="(monitor, index) in monitors" :key="`monitor-${index}`" :value="monitor.id">{{
                            monitor.name
                          }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="column is-full">
                      <p>
                        Полученные показатели FPS являются усредненными и служат для демонстрации относительной
                        производительности систем на максимальных настройках графики. Узнать больше
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="main-title column is-full">
              <h2 class="title is-3 is-uppercase">{{ category.title }}</h2>
            </div>

            <div class="column is-full sort">
              <span class="subtitle is-5" @click="sortProducts('cheap')">Сортировка по цене</span>
            </div>
            <template v-for="(product, index) in newProducts">
              <div
                v-if="product.status !== 'do-not-show' && product.in_stock !== 'no'"
                :key="`product-${index}`"
                class="column is-4"
              >
                <nuxt-link :to="`/product/${product.slug}`">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-square">
                        <img :src="`${photoPath}/${product.main_img}`" :alt="`product-${index}`" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="card-content__header">
                        <!-- <a class="subtitle is-6"> <span class="icon__sravnenie"></span>Сравнение </a> -->
                        <template v-if="isAuthenticated">
                          <a
                            v-if="!product.in_whishlist"
                            class="subtitle is-6"
                            @click.prevent="addToWishlist(product.id)"
                          >
                            <span class="icon__bookmate"></span>Избранное
                          </a>
                          <a v-else class="subtitle is-6" @click.prevent="addToWishlist(product.id)">
                            <span class="icon__bookmate"></span>Убрать из избранного
                          </a>
                        </template>
                      </div>
                      <hr />
                      <h3 class="card-content__main-title title is-3 is-spaced">{{ product.title }}</h3>
                      <!-- <p class="bank-price subtitle is-6">
                        Рассрочка:
                        {{
                          Math.floor(product.price * 0.3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p> -->
                      <p class="price subtitle is-4">
                        Стоимость:
                        {{
                          Math.round(
                            parseInt(product.price) - (parseInt(product.sale || 0) / 100) * parseInt(product.price)
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p>
                      <p v-if="product.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ product.sale }}
                          %</span
                        >
                      </p>
                      <p v-if="product && product.fps_values" class="price subtitle is-4">
                        FPS:
                        <span v-for="(fps, index) in product.fps_values" :key="`fps-${index}`" class="green">
                          {{ fps.value }}
                        </span>
                      </p>

                      <template v-if="product && product.product_parts && product.product_parts.length">
                        <hr />
                        <ul>
                          <li
                            v-for="(part, index) in product.product_parts"
                            :key="`part-${index}`"
                            class="card-content__part"
                          >
                            <span class="card-content__part_name subtitle is-6">{{ part.title }}</span>
                            <span class="subtitle is-5">{{ part.description }}</span>
                          </li>
                        </ul>
                        <hr />
                      </template>

                      <div class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button v-if="!product.copy" class="button button_red" @click.prevent="addToCart(product)">
                              В корзину
                            </button>
                            <button v-else class="button">Уже в корзине</button>
                          </div>
                          <div class="column is-full">
                            <div
                              class="ks-widget"
                              data-template="flatButton"
                              data-merchant-sku="83284"
                              data-merchant-code="Sulpak"
                              data-city="750000000"
                              data-style="mobile"
                            ></div>
                          </div>
                          <div class="column is-full">
                            <button class="button">Подробнее</button>
                          </div>
                          <div class="column is-full">
                            <nuxt-link class="button" :to="{ name: 'configurator', params: { product: product } }">
                              Собрать компьютер
                            </nuxt-link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </nuxt-link>
              </div>
            </template>
          </div>
          <Preloader v-else />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import Preloader from '@/components/ui/Preloader'

export default {
  components: {
    Preloader
  },
  async fetch() {
    await this.$store.dispatch('categories/fetchCategoryProducts', { slug: this.$route.params.slug })
    await this.$store.dispatch('categories/fetchCurrentCategory', this.$route.params.slug)
  },
  data() {
    return {
      newProducts: [],

      games: [],
      monitors: [],

      fpsFilter: {
        game: '',
        monitor: ''
      }
    }
  },
  computed: {
    category() {
      return this.$store.getters['categories/getCurrentCategory']
    },
    products() {
      return this.$store.getters['categories/getCategoryProducts']
    },
    wishlist() {
      return this.$store.state.account.wishlist
    },
    photoPath() {
      return `${this.$store.state.photoPath}storage`
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    isLoading() {
      return this.$store.state.isLoading
    }
  },

  watch: {
    fpsFilter: {
      handler(val) {
        if (val.game && val.monitor) {
          this.fetchFps(this.category.id, val.game, val.monitor)
        }
      },
      deep: true
    },
    products: {
      handler(val) {
        if (val.length) {
          this.initKaspi()
          this.updateProducts(val)
        }
      }
    }
  },
  created() {
    this.$store.dispatch('editIsLoading', true)
    this.fetchGames()
    this.fetchMonitors()
  },
  methods: {
    async initKaspi() {
      if (process.client) {
        const initKaspi = await function(d, s, id) {
          let js = null
          let kjs = null
          if (d.getElementById(id)) return
          js = d.createElement(s)
          js.id = id
          js.src = 'https://kaspi.kz/kaspibutton/widget/ks-wi_ext.js'
          kjs = document.getElementsByTagName(s)[0]
          kjs.parentNode.insertBefore(js, kjs)
        }
        initKaspi(document, 'script', 'KS-Widget')
        window.ksWidgetInitializer.reinit()
      }
    },
    async fetchFps(categoryId, gameId, monitorId) {
      const response = await this.$axios.get(`fps-filter/${categoryId}/${gameId}/${monitorId}`)
      if (response.data.length) {
        this.updateProducts(response.data)
      }
    },
    async fetchGames() {
      const response = await this.$axios.get('fps/games')
      this.games = response.data
    },
    async fetchMonitors() {
      const response = await this.$axios.get('fps/monitors')
      this.monitors = response.data
    },
    async sortProducts(param) {
      const request = {
        slug: this.$route.params.slug,
        param
      }
      await this.$store.dispatch('categories/fetchCategoryProducts', request)
      this.newProducts = this.products.slice()
    },
    updateProducts(defaultProducts) {
      const products = JSON.parse(localStorage.getItem('products')) || []
      this.newProducts = []
      this.$set(this, ['newProducts'], defaultProducts)

      this.newProducts.forEach((vuexProduct) => {
        products.forEach((cartProduct) => {
          if (vuexProduct.id === cartProduct.id) {
            vuexProduct.copy = true
          }
        })
      })
      this.$store.dispatch('editIsLoading', false)
    },
    async addToWishlist(id) {
      const request = {
        slug: this.$route.params.slug
      }
      await this.$axios.post(`/user/wishlist/${id}`)
      await this.$store.dispatch('categories/fetchCategoryProducts', request)
      await this.$store.dispatch('categories/fetchCurrentCategory', request.slug)
      this.fetchWishlist()
    },
    async fetchWishlist() {
      await this.$store.dispatch('account/fetchWishlist')
    },
    addToCart(item) {
      const products = JSON.parse(localStorage.getItem('products')) || []

      let copy = false

      products.forEach((element) => {
        if (element.id === item.id) {
          copy = true
        }
      })

      if (!copy) {
        products.push(item)
      }

      localStorage.setItem('products', JSON.stringify(products))
      this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))

      this.updateProducts(this.products)
    }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  width: 100%;
  @include vertical-center;

  .main-title {
    padding-top: 3rem;
  }

  .sort {
    cursor: pointer;
    @include horizontal-end;
  }

  hr {
    width: 100%;
    background-color: #47484e;
    height: 2px;
    margin: 0;
  }

  .container {
    height: 500px;
  }

  .button {
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }
}
</style>
