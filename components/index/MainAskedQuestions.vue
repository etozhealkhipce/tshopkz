<template>
  <section id="faq" class="section">
    <div class="container">
      <div class="catalog">
        <div class="columns is-multiline">
          <div class="main-title column is-full">
            <h2 class="title is-3 is-uppercase">FAQ / Вопросы-ответы</h2>
          </div>

          <div class="column is-full">
            <div
              v-for="(item, index) in faq"
              :key="`index-${index}`"
              class="accordion"
              @click="accordionVisible(index)"
            >
              <div class="columns is-multiline">
                <div class="column is-full">
                  <div class="accordion__header">
                    <h3 class="subtitle is-4">{{ item.title }}</h3>

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
                      <p class="subtitle">
                        {{ item.description }}
                      </p>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch('main.page/fetchFaq')
  },
  data() {
    return {
      accordionCurrentIndex: 0
    }
  },
  computed: {
    faq() {
      return this.$store.state['main.page'].faq
    }
  },
  created() {},
  methods: {
    accordionVisible(index) {
      if (this.accordionCurrentIndex === index) {
        this.accordionCurrentIndex = null
      } else {
        this.accordionCurrentIndex = index
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
