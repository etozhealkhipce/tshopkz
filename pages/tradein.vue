<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="tradein">
          <template v-if="orderInfo">
            <div class="columns is-multiline is-centered">
              <div class="column is-full">
                <h2 class="title is-3 has-text-centered is-spaced green">Спасибо!</h2>
                <p class="subtitle has-text-centered is-5 middlegray">Мы уже рассматриваем ваше предложение!</p>
                <p class="subtitle has-text-centered is-5 green">
                  Наши менеджеры свяжутся с вами в ближайшее время!
                </p>
              </div>
            </div>
          </template>
          <template v-if="tradeInAttributes && !isLoading">
            <div class="columns">
              <div class="column is-6">
                <figure class="image is-3by2">
                  <img src="~/assets/images/main-catalog-1.png" />
                </figure>
              </div>
              <div class="column is-6 tradein__content">
                <h1 class="title is-spaced">Обменяй свой старый компьютер на новый!</h1>
                <p class="subtitle">
                  Ищите мощный и красивый компьютер для игр. RAPTOR ONE создан именно для вас. Высокая
                  производительность и великолепный дизайн в одном системном блоке.
                </p>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column is-6">
                <div class="columns is-multiline">
                  <div class="column is-full">
                    <h2 class="title is-3 is-spaced">Заявка на Trade-In</h2>
                    <p class="subtitle">Оставьте заявку на Trade-In и мы свяжемся с вами</p>
                  </div>
                  <div class="column is-full">
                    <label for="deliveryCompany" class="label">Выберите тип устройства</label>
                    <div class="custom-select">
                      <select id="deliveryCompany" v-model="currentCategory">
                        <option
                          v-for="(category, index) in tradeInCategories"
                          :key="`category-${index}`"
                          :value="category.id"
                          selected
                          >{{ category.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div class="column is-full">
                    <label for="deliveryCompany" class="label">Выберите комплектующие вашего устройства</label>
                    <div v-for="(attribute, index) in tradeInAttributes" :key="`index-${index}`" class="accordion">
                      <div class="columns is-multiline">
                        <div class="column is-full" @click="accordionVisible(index)">
                          <div class="accordion__header">
                            <h3 class="subtitle is-4">{{ attribute.name }}</h3>

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
                              <div class="columns is-multiline">
                                <div
                                  v-for="(value, index) in tradeInAttributeValues[attribute.id]"
                                  :key="`value-${index}`"
                                  class="column is-4"
                                >
                                  <label class="radio-container"
                                    >{{ value.value }}
                                    <input
                                      :id="`label-${index}`"
                                      v-model="currentProducts[attribute.id]"
                                      class="radio"
                                      type="radio"
                                      :value="value"
                                      @change="changeCurrentProducts(value, attribute.id)"
                                    />
                                    <span class="radiomark"></span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>
                  <div class="column is-full tradein__block">
                    <h2 class="title is-4">
                      Примерная оценка стоимости вашего ПК:
                    </h2>
                    <h3 class="title is-3 is-spaced green">
                      {{ computerPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }} тенге
                    </h3>
                    <h2 class="subtitle is-5 is-spaced">
                      Данная оценка примерная и не является окончательным решением
                    </h2>
                  </div>
                  <div class="column is-full tradein__block">
                    <h2 class="title is-4">
                      Введите ваши данные чтобы мы могли связаться с вами
                    </h2>
                  </div>
                  <div class="column is-full">
                    <input
                      id="second_name"
                      v-model="order.name"
                      class="custom-input"
                      placeholder="Имя"
                      type="text"
                      name="name"
                    />
                    <span
                      v-if="!$v.order.name.required && $v.order.name.$error"
                      class="red subtitle is-6 error__subtitle"
                    >
                      Обязательное поле
                    </span>
                  </div>
                  <div class="column is-6">
                    <input
                      id="name"
                      v-model="order.email"
                      class="custom-input"
                      placeholder="E-mail"
                      type="text"
                      name="email"
                    />
                    <span
                      v-if="!$v.order.email.required && $v.order.email.$error"
                      class="red subtitle is-6 error__subtitle"
                    >
                      Обязательное поле
                    </span>
                    <span
                      v-if="!$v.order.email.email && $v.order.email.$error"
                      class="red subtitle is-6 error__subtitle"
                    >
                      Неверный формат почты
                    </span>
                  </div>
                  <div class="column is-6">
                    <input
                      id="phone"
                      v-model="order.phone"
                      class="custom-input"
                      placeholder="Телефон для связи"
                      type="text"
                      name="phone"
                    />
                    <span
                      v-if="!$v.order.phone.required && $v.order.phone.$error"
                      class="red subtitle is-6 error__subtitle"
                    >
                      Обязательное поле
                    </span>
                  </div>
                  <div class="column is-full">
                    <textarea
                      id="comment"
                      v-model="order.comment"
                      class="custom-textarea"
                      placeholder="Комментарий"
                      type="textarea"
                      name="email"
                    />
                  </div>
                  <div class="column is-full tradein__block">
                    <h2 class="title is-4">
                      Приложите фотографию вашего устройства
                    </h2>
                  </div>
                  <div class="column is-full">
                    <div class="file">
                      <label class="file-label">
                        <input
                          ref="files"
                          class="file-input button"
                          multiple
                          type="file"
                          name="photo"
                          @change="filesUpload()"
                        />
                        <span class="custom-file-cta">
                          <span class="file-label">
                            Выбрать файл...
                          </span>
                        </span>
                      </label>
                    </div>
                    <span
                      v-if="!$v.order.images.required && $v.order.images.$error"
                      class="red subtitle is-6 error__subtitle"
                    >
                      Обязательное поле
                    </span>
                  </div>
                  <div class="column is-full">
                    <button :class="['button button_red', { 'is-loading': isLoading }]" @click.prevent="sendOrder()">
                      Отправить заявку
                    </button>
                  </div>
                </div>
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
import { required, email } from 'vuelidate/lib/validators'

import { mapActions } from 'vuex'
import Preloader from '@/components/ui/Preloader'

export default {
  components: {
    Preloader
  },
  data() {
    return {
      tradeInCategories: null,
      tradeInAttributes: null,
      tradeInAttributeValues: {},
      orderInfo: false,

      currentCategory: '',
      currentProducts: {},

      accordionCurrentIndex: null,

      order: {
        name: '',
        email: '',
        phone: '',
        comment: '',
        products: '',
        images: []
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    },
    computerPrice() {
      let price = 0
      Object.keys(this.currentProducts).forEach((product, index) => {
        price += parseInt(this.currentProducts[product].price)
      })
      return price
    }
  },
  watch: {
    currentCategory: {
      handler(val) {
        this.getTradeInAttributes(val)
      }
    }
  },
  async created() {
    await this.getTradeInCategories()
    await this.getTradeInAttributes(this.tradeInCategories[0].id)
  },
  methods: {
    filesUpload() {
      this.order.images = this.$refs.files.files
    },
    ...mapActions({ editIsLoading: 'editIsLoading' }),
    async getTradeInCategories() {
      const response = await this.$axios.get('/tradein-categories')
      this.tradeInCategories = response.data
    },
    async getTradeInAttributes(id) {
      const response = await this.$axios.get(`/tradein-categories/${id}/tradein-attributes`)
      this.tradeInAttributes = response.data

      this.tradeInAttributes.forEach(async (attribute) => {
        const response = await this.$axios.get(`/tradein-attributes/${attribute.id}/tradein-attributes-values`)

        this.tradeInAttributeValues[attribute.id] = response.data
      })
    },
    accordionVisible(index) {
      if (this.accordionCurrentIndex === index) {
        this.accordionCurrentIndex = null
      } else {
        this.accordionCurrentIndex = index
      }
    },
    changeCurrentProducts(value, id) {
      this.currentProducts[id] = value
    },
    async sendOrder() {
      try {
        this.orderInfo = false
        this.editIsLoading(true)

        this.$v.$touch()
        if (!this.$v.$invalid) {
          window.scrollTo(0, 0)

          this.order.products = Object.keys(this.currentProducts)
            .map((product) => this.currentProducts[product].value)
            .join(', ')

          const formData = new FormData()

          for (let i = 0; i < this.order.images.length; i++) {
            const image = this.order.images[i]
            formData.append('images[]', image)
          }
          formData.append('name', this.order.name)
          formData.append('email', this.order.email)
          formData.append('phone', this.order.phone)
          formData.append('comment', this.order.comment)
          formData.append('products', this.order.products)
          await this.$axios.post('/tradein', formData)

          this.orderInfo = true
        }

        this.editIsLoading(false)
      } catch (error) {
        console.log(error)
      } finally {
        this.currentCategory = ''
        this.currentProducts = {}
        this.accordionCurrentIndex = null
        this.order.images = []
        this.order.name = ''
        this.order.email = ''
        this.order.phone = ''
        this.order.comment = ''
        this.order.products = ''
        this.$v.$reset()
      }
    }
  },
  validations: {
    order: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      images: {
        required
      }
    }
  },
  head: {
    title: 'Trade-In | Интернет—магазин t-shop.kz'
  }
}
</script>

<style scoped lang="scss">
.tradein {
  &__content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__title,
  &__block {
    margin-top: 1.5rem;
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
}
</style>
