<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="catalog">
          <div v-if="stocks.length !== 0" class="column is-full">
            <div class="main-title column is-full">
              <h2 class="title is-3 is-uppercase">Акции</h2>
            </div>
            <div
              v-for="(stock, index) in stocks"
              :key="`stock-${index}`"
              class="accordion"
              @click="accordionVisible(index)"
            >
              <div class="columns is-multiline">
                <div class="column is-full">
                  <div class="accordion__header">
                    <h3 class="subtitle is-4">{{ stock.title }}</h3>

                    <svg
                      :class="{ rotate: accordionCurrentIndex === index }"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 11.4773H11.4773V20H8.52273V11.4773H0V8.52273H8.52273V0H11.4773V8.52273H20V11.4773Z"
                        fill="#E22028"
                      />
                    </svg>
                  </div>
                </div>

                <transition name="fade">
                  <div v-show="accordionCurrentIndex === index" class="column is-full">
                    <div class="accordion__content">
                      <div class="container">
                        <div class="columns is-multiline">
                          <div class="column is-6">
                            <figure class="image is-3by2">
                              <img :src="`${apiPath}/${stock.image}`" />
                            </figure>
                          </div>
                          <div class="column is-6 wholesale__content">
                            <p class="subtitle">{{ stock.description }}</p>
                          </div>

                          <template v-for="(product, index) in stock.products">
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
                                    <h3 class="card-content__main-title title is-4">{{ product.title }}</h3>
                                    <p class="price subtitle is-5">
                                      Стоимость:
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

                                    <template
                                      v-if="product && product.attribute_values && product.attribute_values.length"
                                    >
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
                                          <button class="button">Подробнее</button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </nuxt-link>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
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
  async fetch() {
    await this.fetchStocks()
  },
  data() {
    return {
      stocks: [],
      accordionCurrentIndex: -1
    }
  },
  computed: {
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    }
  },
  methods: {
    async fetchStocks() {
      const response = await this.$axios.get('stock-products')
      this.stocks = response.data
    },
    accordionVisible(index) {
      if (this.accordionCurrentIndex === index) {
        this.accordionCurrentIndex = null
      } else {
        this.accordionCurrentIndex = index
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
    }
  },
  head: {
    title: 'Акционные товары | Интернет—магазин t-shop.kz'
  }
}
</script>

<style scoped lang="scss">
.empty {
  padding: 5rem 0 5rem 0;
}

.accordion {
  border: 1px solid $red;
  cursor: pointer;
  margin-top: 1.5rem;

  padding: 1rem 2rem;

  &__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .subtitle {
      margin: 0;
    }

    svg {
      transition: 0.3s;
    }

    .rotate {
      transform: rotate(45deg);
    }
  }
}
</style>
