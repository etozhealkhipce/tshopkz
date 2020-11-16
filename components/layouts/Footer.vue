<template>
  <footer id="footer" class="footer">
    <div class="container">
      <div class="columns is-multiline is-variable is-8">
        <div class="column">
          <img class="logo" src="../../static/logo.svg" alt />
        </div>

        <template>
          <div v-for="(category, index) in categories" :key="`category-${index}`" class="column is-2">
            <h3 class="title is-5">{{ category.title }}</h3>
            <ul class="list">
              <nuxt-link
                v-for="(subcategory, index) in category.subcategories"
                :key="`subcategory-${index}`"
                no-prefetch
                class="list__item"
                :to="`/category/${subcategory.slug}`"
                >{{ subcategory.title }}</nuxt-link
              >
            </ul>
          </div>
        </template>

        <div class="column footer__contacts">
          <h3 class="title is-5">Контакты</h3>
          <ul class="list">
            <li class="list__item">
              <a class="list__item" :href="`tel:+${globalInfo.phone}`">{{ globalInfo.phone }}</a>
            </li>
            <li class="list__item">{{ globalInfo.address }}</li>
            <li class="list__item">
              <a class="list__item" :href="`mailto:+${globalInfo.email}`">{{ globalInfo.email }}</a>
            </li>
          </ul>

          <h3 class="title is-5 social">Соц. сети</h3>
          <ul class="list">
            <li v-for="(network, index) in socialNetworks" :key="`network-${index}`">
              <a class="list__item" :href="network.slug">{{ network.title }}</a>
            </li>
          </ul>
        </div>

        <div class="column is-full footer__end">
          <p class="subtitle is-6 has-text-centered">
            © 2010-2020 TSHOPKZ - производство и продажа премиум компьютеров. Все права защищены.
          </p>
          <p class="subtitle is-6 has-text-centered">
            |
            <a v-for="(doc, index) in docs" :key="`doc-${index}`" @click="downloadDoc(doc)"
              >{{ doc.name }} <span class="divider">| </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  data() {
    return {
      globalInfo: {
        logo: null,
        phone: '',
        address: '',
        work_time: '',
        email: ''
      },
      socialNetworks: [
        {
          image: '',
          title: '',
          slug: ''
        }
      ],
      docs: [
        {
          name: '',
          file: ''
        }
      ]
    }
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getCategories']
    },
    apiPath() {
      return this.$store.state.apiPath
    }
  },
  created() {
    try {
      this.fetchGlobalInfo()
      this.fetchSocialNetworks()
      this.fetchDocs()
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async fetchGlobalInfo() {
      const response = await this.$axios.get('/global-info')
      this.globalInfo = response.data
    },
    async fetchSocialNetworks() {
      const response = await this.$axios.get('/social-networks')
      this.socialNetworks = response.data
    },
    async fetchDocs() {
      const response = await this.$axios.get('/docs')
      this.docs = response.data
    },
    downloadDoc(doc) {
      const fileLink = `${this.apiPath}storage/${JSON.parse(doc.file)[0].download_link}`
      const fileName = JSON.parse(doc.file)[0].original_name

      saveAs(fileLink, fileName)
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  color: $white;
  background-color: $gray;

  .list {
    display: flex;
    flex-direction: column;
    box-shadow: none;
    background-color: transparent;

    &__item {
      color: $white;
      cursor: pointer;
      padding: 0.3rem 0;
    }
  }

  &__contacts {
    .social {
      margin-top: 1.5rem;
    }
  }

  &__end {
    margin-top: 4rem;

    .subtitle {
      a {
        color: $red;
      }
    }
  }

  .divider {
    color: white;
  }
}
</style>
