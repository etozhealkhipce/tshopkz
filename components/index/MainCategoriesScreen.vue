<template>
  <section class="section">
    <div class="container">
      <div class="catalog">
        <div v-if="mainCategory" class="columns is-multiline is-variable is-4">
          <div class="main-title column is-full">
            <h2 class="title is-3 is-uppercase">{{ mainCategory.title }}</h2>
          </div>
          <div v-for="(product, index) in mainCategory.products" :key="`product-${index}`" class="column is-4">
            <nuxt-link :to="`/product/${product.slug}`">
              <div class="card">
                <div class="card-image">
                  <figure class="image is-square">
                    <img :src="`${apiPath}/${product.main_img}`" :alt="`product-${index}`" />
                  </figure>
                </div>
                <div class="card-content">
                  <h3 class="title is-5 is-spaced">{{ product.title }}</h3>
                  <p class="subtitle is-5">{{ product.description }}</p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <Preloader v-else />
      </div>
    </div>
  </section>
</template>

<script>
import Preloader from '@/components/ui/Preloader'

export default {
  components: {
    Preloader
  },
  data() {
    return {
      mainCategory: null
    }
  },
  computed: {
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    }
  },
  created() {
    this.fetchMainCategory()
  },
  methods: {
    async fetchMainCategory() {
      try {
        const response = await this.$axios.get('/main-page-category')
        this.mainCategory = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.catalog {
  width: 100%;

  .container {
    height: 500px;
  }

  .card-content {
    background-color: #171717;
  }
}
</style>
