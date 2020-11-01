<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="product">
          <template v-if="Object.keys(product).length !== 0">
            <div class="columns is-multiline is-variable is-4">
              <div class="column is-6" @click="showImage">
                <figure class="image is-3by2">
                  <div
                    ref="mainImage"
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
                    <img :src="`${photoPath}/${product.main_img}`" :data-source="`${photoPath}/${product.main_img}`" />
                  </div>
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
                    <div
                      class="ks-widget"
                      data-template="flatButton"
                      data-merchant-sku="83284"
                      data-merchant-code="Sulpak"
                      data-city="750000000"
                      data-style="mobile"
                    ></div>
                  </div>
                  <div class="column is-6">
                    <button class="button">Собрать эту модель</button>
                  </div>
                </div>
              </div>
              <div class="product__menu column is-full">
                <ul class="product__list">
                  <li @click="currentTab = 'photos'">Фотографии</li>
                  <li @click="currentTab = 'specification'">Спецификация</li>
                </ul>
              </div>
            </div>
            <div class="columns is-multiline">
              <template v-if="currentTab === 'photos'">
                <div class="column is-4">
                  <figure class="image is-square">
                    <img :src="`${photoPath}/${product.main_img}`" :alt="`product-${product.id}`" />
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
      currentTab: 'photos',
      newProduct: {}
    }
  },
  computed: {
    product() {
      return this.$store.getters['product/getProduct']
    },
    photoPath() {
      return `${this.$store.state.photoPath}storage`
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  created() {
    this.updateProducts()
  },
  mounted() {
    try {
      const initKaspi = function(d, s, id) {
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
  },
  methods: {
    showImage() {
      this.$refs.mainImage.$viewer.show()
    },
    updateProducts() {
      if (process.client) {
        const products = JSON.parse(localStorage.getItem('products')) || []
        this.newProduct = Object.assign(this.product)

        products.forEach((cartProduct) => {
          if (cartProduct.id === this.product.id) {
            this.newProduct.copy = true
          }
        })
      }
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
  },
  head: {
    title: 'Подробности | Интернет—магазин t-shop.kz'
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
