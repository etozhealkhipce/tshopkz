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
                        <input
                          :id="`radioS-${index}`"
                          :key="`radioS-${index}`"
                          v-model="currentCatId"
                          :value="category.id"
                          :disabled="category.slug !== 'motherboards' && !products[0]"
                          name="radioS"
                          class="radio"
                          type="radio"
                        />
                        <label class="subtitle is-5" :for="`radioS-${index}`">{{ category.title }}</label>
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
                              <input
                                :id="`radio-${index}`"
                                :key="`radio-${index}`"
                                v-model="products[catIndex]"
                                :value="product.id"
                                name="radio"
                                class="radio"
                                type="radio"
                              />
                            </div>
                            <div class="column">
                              <figure class="image is-128x128">
                                <img src="https://bulma.io/images/placeholders/128x128.png" />
                              </figure>
                            </div>
                            <div class="column is-6">
                              <label :key="`label-${index}`" class="subtitle is-5" :for="`radio-${index}`">
                                {{ product.title }}
                              </label>
                            </div>
                            <div class="column">
                              123.9123 тенге
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
                        <img :src="paramsProduct.product.main_img" :alt="`product-${paramsProduct.product.id}`" />
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
                        Стоимость:
                        {{
                          Math.round(
                            parseInt(paramsProduct.product.price) -
                              (parseInt(paramsProduct.product.sale || 0) / 100) * parseInt(paramsProduct.product.price)
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p>
                      <p v-if="paramsProduct.product.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ paramsProduct.product.sale }}
                          %
                        </span>
                      </p>

                      <ul>
                        <li
                          v-for="(productInProduct, index) in paramsProduct.productsInProduct"
                          :key="`productInProduct-${index}`"
                          class="card-content__part"
                        >
                          <span class="card-content__part_name subtitle is-6">{{ productInProduct.id }}</span>
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
                              @click.prevent="addToCart(paramsProduct.product)"
                            >
                              Купить
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
                  <!-- <div v-else class="card">
                    <div class="card-image">
                      <figure class="image is-square">
                        <img :src="product.paramsProduct.main_img" :alt="`product-${paramsProduct.product.id}`" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <hr />
                      <h3 class="card-content__main-title title is-3 is-spaced">{{ product.paramsProduct.title }}</h3>
                      <p class="bank-price subtitle is-6">
                        Рассрочка:
                        {{
                          Math.floor(product.paramsProduct.price * 0.3)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p>
                      <p class="price subtitle is-4">
                        Стоимость:
                        {{
                          Math.round(
                            parseInt(product.paramsProduct.price) -
                              (parseInt(product.paramsProduct.sale || 0) / 100) * parseInt(product.paramsProduct.price)
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                        }}
                        тг.
                      </p>
                      <p v-if="product.paramsProduct.sale" class="price subtitle is-4">
                        Скидка:
                        <span class="green">
                          {{ product.paramsProduct.sale }}
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
                            <button
                              v-if="!product.paramsProduct.copy"
                              class="button button_red"
                              @click.prevent="addToCart(product.paramsProduct)"
                            >
                              Купить
                            </button>
                            <button v-else class="button">Уже в корзине</button>
                          </div>
                          <div class="column is-full">
                            <button class="button">Сохранить сборку</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>-->
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
  layout: 'empty',
  data() {
    return {
      currentCatId: '',

      products: {},

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
    }
  },
  watch: {
    products: {
      handler(val) {
        if (this.products[0] && this.products[1]) {
          this.check(this.products[0], this.products[1])
        }
      },
      deep: true
    }
  },
  created() {
    this.fetchCategories()
  },
  methods: {
    async check(firstId, secondId) {
      const products = {
        0: firstId,
        1: secondId
      }

      const response = await this.$axios.post('constructor/check', products)

      console.log(response)
    },

    async fetchCategories() {
      this.$store.dispatch('editIsLoading', true)

      const response = await this.$axios.get('constructor/categories')
      this.categories = response.data

      this.currentCatId = response.data[0].id
      // this.categories.forEach((category, index) => {
      //   this.products[index] = null
      // })

      if (this.$route.params.product) {
        const product = this.$route.params.product

        this.fetchProductInProducts(product.id)
        this.paramsProduct.product = product
      } else {
        this.$store.dispatch('editIsLoading', false)
      }
    },
    async fetchProductInProducts(id) {
      const response = await this.$axios.get(`constructor/product/${id}`)
      this.paramsProduct.productsInProduct = response.data

      this.paramsProduct.productsInProduct.forEach((paramsProduct) => {
        this.categories.forEach((category, index) => {
          category.products.forEach((product) => {
            if (paramsProduct.id === product.id) {
              product.checked = true
            }
          })
        })
      })

      this.$store.dispatch('editIsLoading', false)
    },
    checkProductId(id) {
      return this.paramsProduct.productsId.includes(id)
    }
  }
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
</style>
