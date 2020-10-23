<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="catalog">
          <div v-if="products.length !== 0" class="columns is-multiline is-variable is-4">
            <div class="main-title column is-full">
              <h2 class="title is-3 is-uppercase">Товары по акции</h2>
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
                        <img :src="product.main_img" :alt="`product-${index}`" />
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
                      <hr />
                      <ul>
                        <li class="card-content__part">
                          <span class="card-content__part_name subtitle is-6">Видеокарта</span>
                          <span class="subtitle is-5">NVIDIA GeForce RTX 2080 Ti</span>
                        </li>
                        <li class="card-content__part">
                          <span class="card-content__part_name subtitle is-6">Процессор</span>
                          <span class="subtitle is-5">Intel® Core™ i9-9900KF</span>
                        </li>
                        <li class="card-content__part">
                          <span class="card-content__part_name subtitle is-6">Материнская плата</span>
                          <span class="subtitle is-5">Intel® Z390 Chipset ATX</span>
                        </li>
                        <li class="card-content__part">
                          <span class="card-content__part_name subtitle is-6">Оперативная память</span>
                          <span class="subtitle is-5">4 x 16GB DDR4-3200 RGB</span>
                        </li>
                        <li class="card-content__part">
                          <span class="card-content__part_name subtitle is-6">Жесткий диск</span>
                          <span class="subtitle is-5">4TB HDD SATA 7200rpm</span>
                        </li>
                      </ul>
                      <hr />

                      <div class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button v-if="!product.copy" class="button button_red" @click.prevent="addToCart(product)">
                              В корзину
                            </button>
                            <button v-else class="button">Уже в корзине</button>
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
  fetch() {
    this.fetchProducts()
  },
  data() {
    return {
      products: [],
      newProducts: []
    }
  },
  computed: {
    results() {
      return this.$store.state['results.page'].results
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async fetchProducts() {
      const response = await this.$axios.get('stocks')
      this.products = response.data
      this.updateProducts()
    },
    updateProducts(param) {
      const products = JSON.parse(localStorage.getItem('products')) || []
      this.newProducts = this.products.slice()

      this.newProducts.forEach((vuexProduct) => {
        products.forEach((cartProduct) => {
          if (vuexProduct.id === cartProduct.id) {
            vuexProduct.copy = true
          }
        })
      })
    },
    async addToWishlist(id) {
      await this.$axios.post(`/user/wishlist/${id}`)
      this.fetchStocks()
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

      this.updateProducts()
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  padding: 5rem 0 5rem 0;
}
</style>
