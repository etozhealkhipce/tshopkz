<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="conf">
          <template v-if="!isLoading">
            <div class="columns">
              <div class="conf__header column is-full">
                <nuxt-link to="/" class="subtitle registration__back">
                  <span class="icon__back"></span>Выйти из конфигуратора
                </nuxt-link>
                <nuxt-link to="/" class="subtitle registration__back">Помощь</nuxt-link>
              </div>
              <hr />
            </div>

            <div class="tile is-ancestor">
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div class="details__header">
                    <h2 class="title is-5">Комплектующие</h2>
                  </div>
                  <div class="details__body">
                    <template v-for="(category, index) in categories">
                      <p :key="`category-${index}`" class="category_s">
                        <label class="radio-container">
                          {{ category.title }}
                          <input
                            :id="`radioS-${index}`"
                            :key="`radioS-${index}`"
                            v-model="currentCatId"
                            :value="category.id"
                            :disabled="category.slug === 'motherboards' && !products[category.id]"
                            name="radioS"
                            class="radio"
                            type="radio"
                          />
                          <span class="radiomark"></span>
                        </label>
                      </p>
                    </template>
                  </div>
                </article>
              </div>
              <div class="tile is-parent is-6 is-vertical">
                <div class="current">
                  <template v-for="(category, catIndex) in categories">
                    <template v-if="currentCatId === category.id">
                      <div :key="`header-${catIndex}`" class="current__header">
                        <h2 class="title is-4 is-spaced">{{ category.title }}</h2>
                      </div>
                      <hr :key="`hr-${catIndex}`" />
                      <div :key="`columns-${catIndex}`" class="category columns is-multiline">
                        <div
                          v-for="(product, index) in category.products"
                          :key="`detail-${index}`"
                          class="column is-full"
                        >
                          <div class="columns">
                            <div class="column is-1">
                              <label class="radio-container">
                                <input
                                  :id="`radio-${index}`"
                                  :key="`radio-${index}`"
                                  v-model="products[category.id]"
                                  :value="product"
                                  name="radio"
                                  class="radio"
                                  type="radio"
                                  @change="productsWatchTrigger += 1"
                                />
                                <span class="radiomark"></span>
                              </label>
                            </div>
                            <div class="column">
                              <figure class="image is-128x128">
                                <img :src="`${apiPath}/${product.main_img}`" />
                              </figure>
                            </div>
                            <div class="column is-6">
                              <label :key="`label-${product.title}`" class="subtitle is-5" :for="`radio-${index}`">
                                {{ product.title }}
                              </label>
                              <p
                                :key="`label-${product.description}`"
                                class="subtitle is-6 table-desc"
                                :for="`radio-${index}`"
                              >
                                {{ product.description }}
                              </p>
                            </div>
                            <div class="column">
                              <p class="subtitle is-6 table-price">
                                {{
                                  Math.round(
                                    parseInt(product.price) -
                                      (parseInt(product.sale || 0) / 100) * parseInt(product.price)
                                  )
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                                }}
                                тенге
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
              <div class="tile is-parent">
                <article class="tile is-child">
                  <div v-if="paramsProduct.product && paramsProduct.productsInProduct" class="card">
                    <div class="card-image">
                      <figure class="image is-square">
                        <img
                          :src="`${apiPath}/${paramsProduct.product.main_img}`"
                          :alt="`product-${paramsProduct.product.id}`"
                        />
                      </figure>
                    </div>
                    <div class="card-content">
                      <hr />
                      <h3 class="card-content__main-title title is-4 is-spaced">{{ paramsProduct.product.title }}</h3>
                      <!-- <p class="bank-price subtitle is-6">
                        Рассрочка:
                        {{
                          Math.floor(paramsProduct.product.price * 0.3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p> -->
                      <p class="price subtitle is-4">
                        Общая стоимость сборки:
                        {{
                          Math.round(parseInt(totalPrice))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тенге
                      </p>
                      <!-- <p v-if="paramsProduct.product.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ paramsProduct.product.sale }}
                          %
                        </span>
                      </p> -->

                      <ul>
                        <li
                          v-for="(productInProduct, index) in products"
                          :key="`productInProduct-${index}`"
                          class="card-content__part"
                        >
                          <!-- <span class="card-content__part_name subtitle is-6">{{ productInProduct.id }}</span> -->
                          <span class="subtitle is-5">{{ productInProduct.title }}</span>
                          <hr />
                        </li>
                      </ul>

                      <div class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button
                              v-if="!paramsProduct.product.copy"
                              class="button button_red"
                              @click.prevent="addToCart()"
                            >
                              В корзину
                            </button>
                            <button v-else class="button">Уже в корзине</button>
                          </div>
                          <div class="column is-full">
                            <button class="button">Сохранить сборку</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="card">
                    <div class="card-image">
                      <!-- <figure class="image is-square">
                        <img
                          :src="`${apiPath}/${paramsProduct.product.main_img}`"
                          :alt="`product-${paramsProduct.product.id}`"
                        />
                      </figure> -->
                    </div>
                    <div class="card-content">
                      <hr />
                      <h3 class="card-content__main-title title is-4 is-spaced">Новая сборка</h3>
                      <!-- <p class="bank-price subtitle is-6">
                        Рассрочка:
                        {{
                          Math.floor(paramsProduct.product.price * 0.3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p> -->
                      <p class="price subtitle is-4">
                        Общая стоимость сборки:
                        {{
                          Math.round(parseInt(totalPrice))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тенге
                      </p>
                      <!-- <p v-if="paramsProduct.product.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ paramsProduct.product.sale }}
                          %
                        </span>
                      </p> -->

                      <ul>
                        <li
                          v-for="(productInProduct, index) in products"
                          :key="`productInProduct-${index}`"
                          class="card-content__part"
                        >
                          <!-- <span class="card-content__part_name subtitle is-6">{{ productInProduct.id }}</span> -->
                          <span class="subtitle is-5">{{ productInProduct.title }}</span>
                          <hr />
                        </li>
                      </ul>

                      <div class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button
                              v-if="Object.keys[products].length && !paramsProduct.product.copy"
                              class="button button_red"
                              @click.prevent="addToCart()"
                            >
                              В корзину
                            </button>
                            <button v-else class="button">Уже в корзине</button>
                          </div>
                          <div class="column is-full">
                            <button class="button">Сохранить сборку</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </template>

          <Preloader v-else />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Preloader from '@/components/ui/Preloader'

export default {
  components: {
    Preloader
  },
  data() {
    return {
      currentCatId: '',

      products: {},
      productsWatchTrigger: 0,
      totalPrice: 0,

      paramsProduct: {
        product: null,
        productsInProduct: null
      },

      categories: []
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    }
  },
  watch: {
    productsWatchTrigger: {
      handler(val) {
        const motherboardsId = this.categories.filter((category) => category.slug === 'motherboards')

        if (motherboardsId[0] && motherboardsId[0].id) {
          this.check(motherboardsId[0].id)
        }

        this.totalPrice = 0
        for (const key in this.products) {
          if (this.products[key] && this.products[key].price) {
            this.totalPrice +=
              parseInt(this.products[key].price) -
              (parseInt(this.products[key].sale || 0) / 100) * parseInt(this.products[key].price)
          }
        }
      },
      immediate: true
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async check(motherboardsId) {
      for (const key in this.products) {
        if (this.products[motherboardsId].id !== this.products[key].id) {
          console.log(this.products[motherboardsId])
          console.log(this.products[key])

          const products = {
            0: this.products[motherboardsId].id,
            1: this.products[key].id
          }

          const response = await this.$axios.post('constructor/check', products)
          console.log(response)
        }
      }
    },

    async fetchCategories() {
      this.$store.dispatch('editIsLoading', true)

      const response = await this.$axios.get('constructor/categories')
      this.categories = response.data

      this.categories.forEach((category) => {
        if (category.slug === 'motherboards') {
          this.currentCatId = category.id
        }
      })

      if (this.$route.params.product) {
        const product = this.$route.params.product

        this.fetchProductInProducts(product.id)
        this.paramsProduct.product = Object.assign(product)
      } else {
        this.$store.dispatch('editIsLoading', false)
      }
    },
    async fetchProductInProducts(id) {
      const response = await this.$axios.get(`constructor/product/${id}`)
      this.paramsProduct.productsInProduct = response.data

      // todo
      this.paramsProduct.productsInProduct.forEach((paramsProduct) => {
        this.categories.forEach((category, index) => {
          category.products.forEach((catProduct) => {
            if (paramsProduct.id === catProduct.id) {
              this.products[category.id] = catProduct
              this.productsWatchTrigger += 1
            }
          })
        })
      })

      this.$store.dispatch('editIsLoading', false)
    },
    checkProductId(id) {
      return this.paramsProduct.productsId.includes(id)
    },
    addToCart() {
      const products = JSON.parse(localStorage.getItem('products')) || []

      for (const key in this.products) {
        let copy = false

        products.forEach((element) => {
          if (element.id === this.products[key].id) {
            copy = true
          }
        })

        if (!copy) {
          products.push(this.products[key])
        }
      }

      localStorage.setItem('products', JSON.stringify(products))
      this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))
      this.$router.push('cart')
    }
  },
  head: {
    title: 'Конфигуратор | Интернет—магазин t-shop.kz'
  },
  layout: 'empty'
}
</script>

<style scoped lang="scss">
.main {
  padding-top: 0;

  label {
    cursor: pointer;
  }

  .section {
    padding-top: 2.5rem;
  }

  .icon__back {
    padding-left: 0;
  }

  .registration__back {
    transition: 0.3s;

    &:hover {
      color: $red;
    }
  }

  .conf {
    &__header {
      @include horizontal-between;
    }
  }

  .details {
    &__header {
      border: 1px solid $red;
      background: $red;
      color: #ffffff;
      padding: 0.5rem 1rem;
      transition: 0.3s;
      cursor: pointer;

      &:hover {
        background: $red;
      }
    }

    &__body {
      padding: 1rem 0;
    }
  }

  .category {
    margin-bottom: 3rem;

    &_s {
      margin-top: 1rem;
    }
  }
}

.table-desc {
  margin-top: 1rem;
}

.table-price {
  opacity: 0.5;
}
</style>
