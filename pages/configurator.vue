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
                <nuxt-link to="/account" class="subtitle registration__back">Перейти в личный кабинет</nuxt-link>
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
                            :disabled="(category.slug !== 'cpus' && !products[cpusId]) || compatibilityLoading"
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
                        <span class="subtitle is-5 sort" @click="sortProducts('price', category, catIndex)"
                          >Сортировка по цене</span
                        >
                        <span class="subtitle is-5 sort" @click="sortProducts('title', category, catIndex)"
                          >Сортировка по модели</span
                        >
                      </div>
                      <div :key="`tabs-${catIndex}`" class="tabs">
                        <ul v-if="category.slug === 'cpus'">
                          <li :class="{ 'is-active': filterText === '' }" @click="filterText = ''">
                            <a>Все</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'i3' }" @click="filterText = 'i3'">
                            <a>Intel Core i3</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'i5' }" @click="filterText = 'i5'">
                            <a>Intel Core i5</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'i7' }" @click="filterText = 'i7'">
                            <a>Intel Core i7</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'i9' }" @click="filterText = 'i9'">
                            <a>Intel Core i9</a>
                          </li>
                        </ul>
                        <ul v-if="category.slug === 'videocards'">
                          <li :class="{ 'is-active': filterText === '' }" @click="filterText = ''">
                            <a>Все</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'AMD' }" @click="filterText = 'AMD'">
                            <a>AMD</a>
                          </li>
                          <li :class="{ 'is-active': filterText === 'NVIDIA' }" @click="filterText = 'NVIDIA'">
                            <a>NVIDIA</a>
                          </li>
                        </ul>
                      </div>
                      <!-- <hr :key="`hr-${catIndex}`" /> -->
                      <div :key="`columns-${catIndex}`" class="category columns is-multiline">
                        <div
                          v-for="(product, index) in category.products.filter((product) =>
                            product.title.includes(filterText)
                          )"
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
                                  :disabled="product.notCompatibile"
                                  :value="product"
                                  name="radio"
                                  class="radio"
                                  type="radio"
                                  @change="productChange(product)"
                                />
                                <span class="radiomark"></span>
                              </label>
                            </div>
                            <div class="column">
                              <figure class="image is-128x128">
                                <div
                                  ref="image"
                                  v-viewer="{
                                    inline: false,
                                    button: true,
                                    navbar: false,
                                    title: false,
                                    toolbar: false,
                                    tooltip: false,
                                    movable: false,
                                    zoomable: false,
                                    rotatable: false,
                                    scalable: false,
                                    transition: false,
                                    fullscreen: true,
                                    keyboard: true,
                                    url: 'data-source'
                                  }"
                                >
                                  <img
                                    :key="`image-${index}`"
                                    :src="`${apiPath}/${product.main_img}`"
                                    :alt="`product-${product.title}`"
                                    :data-source="`${apiPath}/${product.main_img}`"
                                  />
                                </div>
                              </figure>
                            </div>
                            <div class="column is-6">
                              <nuxt-link :to="`product/${product.slug}`">
                                <label :key="`label-${product.title}`" class="subtitle is-5" :for="`radio-${index}`">
                                  {{ product.title }}
                                </label>
                                <div v-html="product.description"></div>
                              </nuxt-link>
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
                                тг.
                              </p>
                              <p v-if="product.sale" class="subtitle is-6 table-price green">
                                Cкидка {{ product.sale }}
                                %
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
                      <p class="price subtitle is-4">
                        Общая стоимость сборки:
                        {{
                          Math.round(parseInt(totalPrice))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тенге
                      </p>
                      <ul>
                        <li
                          v-for="(productInProduct, index) in products"
                          :key="`productInProduct-${index}`"
                          class="card-content__part"
                        >
                          <div class="card-content__part_attribute-icon">
                            <img
                              v-if="productInProduct.icon"
                              class="card-content__part_icon"
                              :src="`${apiPath}/${productInProduct.icon}`"
                              alt=""
                            />
                            <span class="card-content__part_name subtitle is-6">{{ productInProduct.title }}</span>
                          </div>
                          <div v-html="productInProduct.description"></div>
                          <hr />
                        </li>
                      </ul>
                      <div class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button class="button button_red" @click.prevent="addToCart()">
                              В корзину
                            </button>
                          </div>
                          <div class="column is-full">
                            <template v-if="!isAuthenticated">
                              <span class="subtitle is-6 has-text-centered">
                                Для сохранения сборки сначала войдите в личный кабинет
                              </span>
                            </template>
                            <template v-else>
                              <button
                                v-if="!constructorSave"
                                :class="['button button_red', { 'is-loading': isLoading }]"
                                @click="createConstructor()"
                              >
                                Сохранить сборку
                              </button>
                              <span v-else class="subtitle is-6 green has-text-centered">
                                Сборка сохранена в личном кабинете
                              </span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="card">
                    <div class="card-content">
                      <hr />
                      <h3 class="card-content__main-title title is-4 is-spaced">Новая сборка</h3>
                      <p class="price subtitle is-4">
                        Общая стоимость сборки:
                        {{
                          Math.round(parseInt(totalPrice))
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тенге
                      </p>

                      <ul>
                        <li
                          v-for="(productInProduct, index) in products"
                          :key="`productInProduct-${index}`"
                          class="card-content__part"
                        >
                          <div class="card-content__part_attribute-icon">
                            <img
                              v-if="productInProduct.icon"
                              class="card-content__part_icon"
                              :src="`${apiPath}/${productInProduct.icon}`"
                              alt=""
                            />
                            <span class="card-content__part_name subtitle is-6">{{ productInProduct.title }}</span>
                          </div>
                          <div v-html="productInProduct.description"></div>
                          <hr />
                        </li>
                      </ul>

                      <div v-if="Object.keys(products).length" class="card-content__buttons">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button class="button button_red" @click.prevent="addToCart()">
                              В корзину
                            </button>
                          </div>
                          <div class="column is-full">
                            <template v-if="!isAuthenticated">
                              <span class="subtitle is-6 has-text-centered">
                                Для сохранения сборки сначала войдите в личный кабинет
                              </span>
                            </template>
                            <template v-else>
                              <button
                                v-if="!constructorSave"
                                :class="['button button_red', { 'is-loading': createLoading }]"
                                @click="createConstructor()"
                              >
                                Сохранить сборку
                              </button>
                              <span v-else class="subtitle is-6 green has-text-centered">
                                Сборка сохранена в личном кабинете
                              </span>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </template>

          <Preloader v-else full />
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

      categories: [],

      constructorSave: false,
      compatibilityLoading: false,
      createLoading: false,
      sorted: {
        price: false,
        title: false
      },

      filterText: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    isLoading() {
      return this.$store.state.isLoading
    },
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    },
    cpusId() {
      const response = this.categories.filter((category) => category.slug === 'cpus')
      const id = response[0].id
      return id
    }
  },
  watch: {
    productsWatchTrigger: {
      handler(val) {
        this.constructorSave = false

        this.categories.forEach((category) => {
          category.products.forEach((product) => {
            this.check(product)
          })
        })

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
    sortProducts(type, category, catIndex) {
      if (type === 'price') {
        if (this.sorted.price) {
          this.categories[catIndex].products = category.products.sort((a, b) => b.price - a.price)
          this.sorted.price = false
        } else {
          this.categories[catIndex].products = category.products.sort((a, b) => a.price - b.price)
          this.sorted.price = true
        }
      } else if (type === 'title') {
        if (this.sorted.title) {
          this.categories[catIndex].products = category.products.sort((a, b) => ('' + a.title).localeCompare(b.title))
          this.sorted.title = false
        } else {
          this.categories[catIndex].products = category.products.sort((a, b) => ('' + b.title).localeCompare(a.title))
          this.sorted.title = true
        }
      }
    },
    productChange(product) {
      if (product.pivot.category_id === this.cpusId) {
        this.products = {}
        this.products[product.pivot.category_id] = product
      }
      this.productsWatchTrigger += 1
    },
    async check(product) {
      try {
        if (this.products[this.cpusId].id !== product) {
          const products = {
            products: {
              0: this.products[this.cpusId].id,
              1: product.id
            }
          }

          this.compatibilityLoading = true
          const compatibility = await this.$axios.post('constructor/check', products)

          if (compatibility.data === 'no' && product.pivot.category_id !== this.cpusId) {
            product.notCompatibile = true
          } else {
            product.notCompatibile = false
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.compatibilityLoading = false
      }
    },
    async createConstructor() {
      try {
        this.createLoading = true
        const products = {}

        for (const key in this.products) {
          products[key] = this.products[key].id
        }
        await this.$axios.post('constructor/create', { products })

        this.constructorSave = true
      } catch (error) {
        console.log(error)
      } finally {
        this.createLoading = false
      }
    },
    async fetchCategories() {
      this.$store.dispatch('editIsLoading', true)

      const response = await this.$axios.get('constructor/categories')
      this.categories = response.data

      this.categories.forEach((category) => {
        if (category.slug === 'cpus') {
          this.currentCatId = category.id
        }
      })

      if (this.$route.params.product) {
        const product = this.$route.params.product

        this.fetchProductInProducts(product.id)
        this.paramsProduct.product = Object.assign(product)
      } else if (this.$route.params.products) {
        const products = this.$route.params.products

        products.forEach((paramsProduct) => {
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
      } else {
        this.$store.dispatch('editIsLoading', false)
      }
    },
    async fetchProductInProducts(id) {
      const response = await this.$axios.get(`constructor/product/${id}`)
      this.paramsProduct.productsInProduct = response.data

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

  .current {
    &__header {
      display: flex;
      justify-content: space-between;
    }

    .sort {
      cursor: pointer;
    }
  }

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

    .category {
      margin-bottom: 3rem;
      margin-top: 1rem;

      &_s {
        margin-top: 1rem;
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

    .card {
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
}
</style>
