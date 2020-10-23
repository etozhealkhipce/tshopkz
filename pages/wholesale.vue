<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="wholesale">
          <template v-if="wholesale">
            <div class="columns is-multiline is-variable is-4">
              <div class="main-title column is-full">
                <h2 class="title is-3 is-uppercase">Для оптовых продаж</h2>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <figure class="image is-3by2">
                  <img :src="`storage/${wholesale.image}`" />
                </figure>
              </div>
              <div class="column is-6 wholesale__content">
                <h1 class="title is-spaced">{{ wholesale.title }}</h1>
                <p class="subtitle">{{ wholesale.description }}</p>
                <a class="subtitle red" :href="wholesale.file || '#'">Скачать прайс-лист</a>
              </div>
              <div class="column is-full wholesale__body" v-html="wholesale.body"></div>
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
  fetch() {
    this.fetchwholesale()
  },
  data() {
    return {
      wholesale: null
    }
  },

  methods: {
    async fetchwholesale() {
      try {
        const response = await this.$axios.get('/wholesale')
        this.wholesale = response.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wholesale {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__body {
    margin-top: 2rem;
  }
}
</style>
