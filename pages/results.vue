<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div v-if="results.length" class="columns is-multiline is-variable is-4">
          <div class="main-title column is-full">
            <h2 class="title is-3 is-uppercase">Результаты поиска</h2>
          </div>
          <div v-for="(result, index) in results" :key="`result-${index}`" class="column is-4">
            <nuxt-link :to="`/product/${result.slug}`">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-square">
                    <img :src="result.main_img" :alt="`product-${index}`" />
                  </figure>
                </div>
                <div class="card-content">
                  <hr />
                  <h3 class="card-content__main-title title is-3 is-spaced">{{ result.title }}</h3>
                  <!-- <p class="bank-price subtitle is-6">
                    Рассрочка:
                    {{
                      Math.floor(result.price * 0.3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }}
                    тг.
                  </p> -->
                  <p class="price subtitle is-4">
                    Стоимость:
                    {{
                      Math.round(parseInt(result.price) - (parseInt(result.sale || 0) / 100) * parseInt(result.price))
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }}
                    тг.
                  </p>
                  <p v-if="result.sale" class="price subtitle is-4">
                    Скидка:
                    <span class="green">
                      {{ result.sale }}
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
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  padding: 5rem 0 5rem 0;
}
</style>
