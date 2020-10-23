<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="product">
          <template v-if="Object.keys(product).length !== 0">
            <div class="columns is-multiline is-variable is-4">
              <div class="column is-6">
                <figure class="image is-3by2">
                  <!-- <img :src="product.main_img" /> -->
                  <no-ssr>
                    <LightGallery :images="[product.main_img]" />
                  </no-ssr>
                </figure>
              </div>
              <div class="column is-6">
                <div class="product__header">
                  <!-- <a class="subtitle is-6"> <span class="icon__sravnenie"></span>Сравнение </a> -->
                  <a v-if="isAuthenticated" class="subtitle is-6"> <span class="icon__bookmate"></span>Избранное </a>
                </div>
                <h2 class="title is-3 is-uppercase is-spaced">{{ product.title }}</h2>
                <p class="subtitle is-5">{{ product.description }}</p>
                <div class="columns is-multiline is-variable is-2">
                  <div class="column is-full">
                    <!-- <p class="subtitle is-6">Рассрочка 13.000 ₸/мес.</p>
                    <h2 v-if="product.price" class="title is-4">
                      Стоимость:
                      {{
                        Math.round(
                          parseInt(product.price) - (parseInt(product.sale || 0) / 100) * parseInt(product.price)
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                      }}
                      тг.
                    </h2> -->
                    <p v-if="product.sale" class="price subtitle is-4">
                      Скидка:
                      <span class="green">
                        {{ product.sale }}
                        %</span
                      >
                    </p>
                  </div>
                  <div class="column is-6">
                    <button v-if="!newProduct.copy" class="button button_red" @click.prevent="addToCart(product)">
                      Добавить в корзину
                    </button>
                    <button v-else class="button">Уже в корзине</button>
                  </div>
                  <div class="column is-6">
                    <button class="button">Собрать эту модель</button>
                  </div>
                </div>
              </div>
              <div class="product__menu column is-full">
                <ul class="product__list">
                  <li @click="currentTab = 'description'">Описание</li>
                  <li @click="currentTab = 'photos'">Фотографии</li>
                  <li @click="currentTab = 'specification'">Спецификация</li>
                </ul>
              </div>
            </div>
            <div class="columns is-multiline">
              <template v-if="currentTab === 'description'">
                <div class="column is-6">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-16by9">
                        <img :src="product.main_img" :alt="`product-${product.id}`" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <h3 class="title is-5 is-spaced">{{ product.title }}</h3>
                      <p class="subtitle is-5">{{ product.description }}</p>
                    </div>
                  </div>
                </div>
                <div class="column is-6">
                  <div class="card">
                    <div class="card-image">
                      <figure class="image is-16by9">
                        <img :src="product.main_img" :alt="`product-${product.id}`" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <h3 class="title is-5 is-spaced">{{ product.title }}</h3>
                      <p class="subtitle is-5">{{ product.description }}</p>
                    </div>
                  </div>
                </div>
              </template>

              <template v-if="currentTab === 'photos'">
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="product.main_img" :alt="`product-${product.id}`" />
                  </figure>
                </div>
              </template>

              <template v-if="currentTab === 'specification'">
                <div class="column is-full">
                  <table class="table is-hoverable is-fullwidth">
                    <tbody>
                      <tr>
                        <th>Test</th>
                        <td>Qualification for the</td>
                      </tr>
                      <tr>
                        <th>Test</th>
                        <td>Qualification for the</td>
                      </tr>
                      <tr>
                        <th>Test</th>
                        <td>Qualification for the</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </template>
            </div>
          </template>

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
    await this.$store.dispatch('product/fetchProduct', this.$route.params.slug)
  },
  data() {
    return {
      currentTab: 'description',
      newProduct: {}
    }
  },
  computed: {
    product() {
      return this.$store.getters['product/getProduct']
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  created() {
    this.updateProducts()
  },
  methods: {
    updateProducts() {
      const products = JSON.parse(localStorage.getItem('products')) || []
      this.newProduct = Object.assign(this.product)

      products.forEach((cartProduct) => {
        if (cartProduct.id === this.product.id) {
          this.newProduct.copy = true
        }
      })
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

<style lang="scss" scoped>
.product {
  width: 100%;

  .button {
    width: 100%;
  }

  &__header {
    @include horizontal-between;

    [class^='icon__'],
    [class*=' icon__'] {
      padding-left: 0;
    }

    .subtitle {
      transition: 0.3s;

      &:hover {
        color: $red;

        [class^='icon__'],
        [class*=' icon__'] {
          color: $red;
        }
      }
    }
  }

  &__menu {
    margin-top: 2rem;
  }

  &__list {
    background-color: $gray;
    @include vertical-center;

    li {
      padding: 1rem 1.5rem;
      cursor: pointer;
      color: white;
      transition: 0.3s;

      &:hover {
        color: $red;
      }
    }
  }

  .table {
    border: 1px solid #330709;

    td {
      &:hover {
        color: $red;
      }
    }
  }
}
</style>