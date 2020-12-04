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
                            monitor.value
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
              <div :key="`product-${index}`" class="column is-4">
                <nuxt-link :to="`/product/${product.slug}`">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-square">
                        <img :src="`${apiPath}/${product.main_img}`" :alt="`product-${index}`" />
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
                      <h3 class="card-content__main-title title is-3">{{ product.title }}</h3>
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
                      <p v-if="product && product.fps_values" class="bank-price subtitle is-6">
                        <template v-for="(fps, index) in product.fps_values">
                          <span :key="`fpsText-${index}`" class="fps">Средний FPS: {{ fps.value }}</span>
                          <vue-range-slider
                            :key="`fps-${index}`"
                            ref="slider"
                            :value="fps.value"
                            disabled
                            :tooltip="false"
                            :max="700"
                            :bg-style="range.bgStyle"
                            :process-style="range.proccessStyle"
                            :disabled-style="range.disabledStyle"
                          />
                        </template>
                      </p>
                      <p v-if="product.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ product.sale }}
                          %</span
                        >
                      </p>

                      <template v-if="product && product.attribute_values && product.attribute_values.length">
                        <hr />
                        <ul>
                          <li
                            v-for="(attributeValue, index) in product.attribute_values"
                            :key="`part-${index}`"
                            class="card-content__part"
                          >
                            <div class="card-content__part_attribute-icon">
                              <img
                                v-if="attributeValue.attribute.icon"
                                class="card-content__part_icon"
                                :src="`${apiPath}/${attributeValue.attribute.icon}`"
                                alt=""
                              />
                              <span class="card-content__part_name subtitle is-6">
                                {{ attributeValue.attribute.title }}
                              </span>
                            </div>
                            <span class="subtitle is-5">{{ attributeValue.value }}</span>
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
                          <div v-if="product.data_merchant_sku" class="column is-full">
                            <div
                              class="ks-widget"
                              data-template="flatButton"
                              :data-merchant-sku="product.data_merchant_sku"
                              data-merchant-code="Tshopkz"
                              data-city="710000000"
                              data-style="mobile"
                            ></div>
                          </div>
                          <div class="column is-full">
                            <button class="button">Подробнее</button>
                          </div>
                          <div class="column is-full">
                            <nuxt-link class="button" :to="{ name: 'configurator', params: { product: product } }">
                              Сконфигурировать
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
          <Preloader v-else-if="isLoading" />
          <div v-else class="columns">
            <div class="column">
              <h1 class="title is-1">Категория пуста</h1>
            </div>
          </div>
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
      value: 1,
      range: {
        proccessStyle: { opacity: '0' },
        bgStyle: { background: 'linear-gradient(90deg, #FF0B0B 0%, #F8F825 50.2%, #28E618 100%)' },
        disabledStyle: { background: 'linear-gradient(90deg, #FF0B0B 0%, #F8F825 50.2%, #28E618 100%)', opacity: '1' }
      },

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
    ...mapGetters(['isAuthenticated']),
    category() {
      return this.$store.getters['categories/getCurrentCategory']
    },
    products() {
      return this.$store.getters['categories/getCategoryProducts']
    },
    wishlist() {
      return this.$store.state.account.wishlist
    },
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    },
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
        try {
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
        } catch (error) {
          console.log(error)
        }
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
      if (process.client) {
        const products = JSON.parse(localStorage.getItem('products')) || []
        this.newProducts = []
        this.$set(this, ['newProducts'], defaultProducts)
        this.newProducts = this.newProducts.filter(
          (product) => product.status !== 'do-not-show' && product.aviability !== 'unaviable'
        )

        this.newProducts.forEach((vuexProduct) => {
          products.forEach((cartProduct) => {
            if (vuexProduct.id === cartProduct.id) {
              vuexProduct.copy = true
            }
          })
        })
        this.$store.dispatch('editIsLoading', false)
      }
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
  },
  head: {
    title: 'Каталог | Интернет—магазин t-shop.kz'
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

  .fps {
    display: inline-block;
    margin-bottom: 0.5rem;
  }

  .card {
    .image {
      position: relative;

      .power {
        position: absolute;
        left: 1rem;
        top: 1rem;
        color: #47e220;
        z-index: 1;
      }
    }

    &-content__part {
      &_attribute-icon {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      &_icon {
        width: 1rem;
        display: inline-block;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
