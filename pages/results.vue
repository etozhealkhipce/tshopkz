<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div v-if="results.length" class="columns is-multiline is-variable is-4">
          <div class="main-title column is-full">
            <h2 class="title is-3 is-uppercase">Результаты поиска</h2>
          </div>
          <div v-for="(product, index) in results" :key="`result-${index}`" class="column is-4">
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
                      <a v-if="!product.in_whishlist" class="subtitle is-6" @click.prevent="addToWishlist(product.id)">
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
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <template v-else>
          <div class="columns is-multiline is-centered">
            <div class="column is-full empty">
              <h2 class="title is-3 has-text-centered is-spaced">По данному запросу ничего не найдено...</h2>
            </div>
          </div>
        </template>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  computed: {
    results() {
      return this.$store.state['results.page'].results
    },
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    }
  },
  head: {
    title: 'Результаты поиска | Интернет—магазин t-shop.kz'
  }
}
</script>

<style scoped lang="scss">
.empty {
  padding: 5rem 0 5rem 0;
}
</style>
