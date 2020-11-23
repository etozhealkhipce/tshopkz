<template>
  <client-only>
    <main class="main">
      <section class="section">
        <div class="container">
          <div class="catalog">
            <div v-if="!currentStep && !orderInfo" class="columns is-multiline is-variable is-4">
              <div class="main-title column is-full">
                <h2 class="title is-3 is-uppercase">Корзина</h2>
              </div>

              <template v-if="products.length">
                <div v-for="(product, index) in products" :key="`item-${index}`" class="column is-full">
                  <div class="tile is-ancestor cart-product">
                    <div class="tile is-vertical is-2">
                      <div class="tile is-parent">
                        <article class="tile is-child">
                          <nuxt-link :to="`/product/${product.slug}`">
                            <figure class="image is-4by3">
                              <img :src="`${apiPath}/${product.main_img}`" :alt="`product-${index}`" />
                            </figure>
                          </nuxt-link>
                        </article>
                      </div>
                    </div>

                    <div class="tile is-vertical">
                      <div class="tile">
                        <div class="tile is-parent">
                          <article class="tile is-child">
                            <h3 class="title is-4">{{ product.title }}</h3>
                            <p class="subtitle is-6">Описание</p>
                          </article>
                        </div>
                      </div>
                      <div class="tile">
                        <div class="tile is-parent">
                          <article class="tile is-child cart-product__buttons-wrapper">
                            <div class="cart-product__buttons">
                              <!-- <a class="subtitle is-6"> <span class="icon__sravnenie"></span>Сравнение </a> -->
                              <a class="subtitle is-6" @click.prevent="addToWishlist(product.id)">
                                <span class="icon__bookmate"></span>Избранное
                              </a>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>

                    <div class="tile is-vertical is-3">
                      <div class="tile">
                        <div class="tile is-parent">
                          <article class="tile is-child">
                            <div class="count">
                              <button class="button count__button" @click.prevent="editProductsCount(false, product)">
                                -
                              </button>
                              <h3 class="count__number title is-4">{{ product.qty }}</h3>
                              <button class="button count__button" @click.prevent="editProductsCount(true, product)">
                                +
                              </button>
                            </div>

                            <p class="subtitle cart-product__subtitle_red is-6">Для юридических лиц не менее 5</p>
                          </article>
                        </div>
                      </div>
                    </div>

                    <div class="tile is-vertical is-3">
                      <div class="tile">
                        <div class="tile is-parent">
                          <article class="tile is-child">
                            <!-- <p class="bank-price subtitle is-6">
                              Рассрочка:
                              {{
                                Math.floor(product.price * product.qty * 0.3)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                              }}
                              тенге
                            </p> -->
                            <p v-if="product.sale" class="price subtitle is-4">
                              Скидка:
                              <span class="green">
                                {{ product.sale }}
                                %</span
                              >
                            </p>
                            <h3 class="title is-4">
                              {{
                                Math.round(
                                  (parseInt(product.price) -
                                    (parseInt(product.sale || 0) / 100) * parseInt(product.price)) *
                                    product.qty
                                )
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                              }}
                              тенге
                            </h3>
                          </article>
                        </div>
                      </div>
                      <div class="tile">
                        <div class="tile is-parent">
                          <article class="tile is-child cart-product__buttons-wrapper">
                            <div class="cart-product__buttons">
                              <a class="subtitle is-6 cart-product__button_red" @click="removeFromCart(product.id)">
                                <span class="icon__close"></span>Убрать из корзины
                              </a>
                            </div>
                          </article>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>

                <div class="column is-full total">
                  <div class="columns is-vcentered">
                    <div class="column is-5">
                      <div class="promocode field has-addons">
                        <div class="control">
                          <input v-model="order.coupon" class="custom-input" type="text" placeholder="Промо-код" />
                        </div>
                        <div class="control">
                          <button
                            :class="['button button_red is-info', { 'is-loading': isLoading }]"
                            @click="checkPromo()"
                          >
                            Применить
                          </button>
                        </div>
                      </div>
                      <p v-if="couponStatus.name" class="green subtitle is-5">
                        Скидка {{ couponStatus.sale }}% применена
                      </p>
                      <p v-else-if="couponFailed" class="red subtitle is-5">
                        Промо-код не найден
                      </p>
                    </div>
                    <div class="column is-4">
                      <div class="columns">
                        <!-- <div class="column">
                          <p class="total__subtitle subtitle is-6">Рассрочка:</p>
                          <p class="title is-5">120.000 тг.</p>
                        </div> -->
                        <div class="column">
                          <p class="total__subtitle total subtitle is-6">Общая стоимость</p>
                          <p class="title is-5">
                            {{
                              totalPrice
                                .toFixed()
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                            }}
                            тг.
                          </p>
                        </div>
                        <div v-if="couponSale" class="column">
                          <p class="total__subtitle subtitle is-6">Скидка промокода:</p>
                          <p class="title is-5 green">{{ couponSale }} %</p>
                        </div>
                      </div>
                    </div>
                    <div class="column">
                      <button class="button button_red" @click="goToNext('registration')">Оформить заказ</button>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="column">
                <h1 class="title is-1">Корзина пуста</h1>
              </div>
            </div>

            <template v-if="currentStep === 'registration' && !orderInfo">
              <div class="columns">
                <div class="main-title column is-full">
                  <p class="subtitle registration__back" @click="currentStep = ''">
                    <span class="icon__back"></span>Назад
                  </p>
                  <h2 class="title is-3 is-uppercase">Оформление заказа</h2>
                </div>
              </div>

              <div class="columns is-multiline registration">
                <div class="column is-6">
                  <div class="columns is-multiline">
                    <div class="column is-full">
                      <p class="subtitle is-4 registration__subtile_background">Личные данные</p>
                    </div>
                    <div class="column is-6">
                      <label class="radio-container"
                        >Физическое лицо
                        <input id="face" v-model="order.client_type" value="individual" type="radio" />
                        <span class="radiomark"></span>
                      </label>
                      <span
                        v-if="!$v.order.client_type.required && $v.order.client_type.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label class="radio-container"
                        >Юридическое лицо
                        <input id="legal" v-model="order.client_type" value="legal" type="radio" />
                        <span class="radiomark"></span>
                      </label>
                      <span
                        v-if="!$v.order.client_type.required && $v.order.client_type.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="second_name" class="label">Фамилия</label>
                      <input
                        id="second_name"
                        v-model="order.second_name"
                        class="custom-input"
                        type="text"
                        name="second_name"
                      />
                      <span
                        v-if="!$v.order.second_name.required && $v.order.second_name.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="name" class="label">Имя</label>
                      <input id="name" v-model="order.name" class="custom-input" type="text" name="name" />
                      <span
                        v-if="!$v.order.name.required && $v.order.name.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="middle_name" class="label">Отчество</label>
                      <input
                        id="middle_name"
                        v-model="order.middle_name"
                        class="custom-input"
                        type="text"
                        name="middle_name"
                      />
                      <span
                        v-if="!$v.order.middle_name.required && $v.order.middle_name.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6"></div>
                    <div class="column is-6">
                      <label for="phone" class="label">Номер телефона</label>
                      <input id="phone" v-model="order.phone" class="custom-input" type="text" name="phone" />
                      <span
                        v-if="!$v.order.phone.required && $v.order.phone.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="email" class="label">E-mail</label>
                      <input id="email" v-model="order.email" class="custom-input" type="email" name="email" />
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
                    <div class="column is-full">
                      <p class="subtitle is-4 registration__subtile_background">Информация о доставке</p>
                    </div>
                    <div class="column is-6">
                      <label for="city" class="label">Город</label>
                      <input id="city" v-model="order.city" class="custom-input" type="text" name="city" />
                      <span
                        v-if="!$v.order.city.required && $v.order.city.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="street" class="label">Улица</label>
                      <input id="street" v-model="order.street" class="custom-input" type="text" name="street" />
                      <span
                        v-if="!$v.order.street.required && $v.order.street.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="house" class="label">Дом</label>
                      <input id="house" v-model="order.house" class="custom-input" type="text" name="house" />
                      <span
                        v-if="!$v.order.house.required && $v.order.house.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label for="flat" class="label">Квартира</label>
                      <input id="flat" v-model="order.flat" class="custom-input" type="text" name="flat" />
                    </div>
                    <div class="column is-6">
                      <label class="radio-container"
                        >Доставка
                        <input id="deliveryTrue" v-model="order.delivery_type" value="delivery" type="radio" name />
                        <span class="radiomark"></span>
                      </label>
                      <span
                        v-if="!$v.order.delivery_type.required && $v.order.delivery_type.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6">
                      <label class="radio-container"
                        >Забрать самому
                        <input
                          id="deliveryFalse"
                          v-model="order.delivery_type"
                          value="yourself"
                          type="radio"
                          name
                          @change="
                            () => {
                              order.receiverCity = ''
                              order.receiverCityId = ''
                              currentReceiverCity = ''
                            }
                          "
                        />
                        <span class="radiomark"></span>
                      </label>
                      <span
                        v-if="!$v.order.delivery_type.required && $v.order.delivery_type.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div v-if="order.delivery_type === 'delivery'" class="column is-6">
                      <label for="deliveryCompany" class="label">Город доставки</label>
                      <br />
                      <div class="custom-select">
                        <select
                          id="deliveryCompany"
                          v-model="currentReceiverCity"
                          @change="setReceiverCity(currentReceiverCity)"
                        >
                          <option v-for="city in cities" :key="city.code" :value="city">{{ city.name }}</option>
                        </select>
                      </div>
                      <span
                        v-if="!$v.order.receiverCity.required && $v.order.receiverCity.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span>
                    </div>
                    <div class="column is-6"></div>
                    <div class="column is-6"></div>
                    <div class="column is-full">
                      <label for="deliveryFalse" class="label">Комментарий к доставке</label>
                      <textarea
                        id="comment"
                        v-model="order.delivery_message"
                        class="custom-textarea"
                        placeholder="Комментарий"
                        type="textarea"
                        name="comment"
                      ></textarea>
                    </div>
                    <div class="column is-6">
                      <label for="deliveryCompany" class="label">Тип оплаты</label>
                      <br />
                      <div class="custom-select">
                        <select id="paymentType" v-model="order.payment_type">
                          <option value="loan">Кредит</option>
                          <option value="cash">Наличные</option>
                          <option value="online">Онлайн-оплата</option>
                        </select>
                      </div>
                      <!-- <span
                        v-if="!$v.order.payment_type.required && $v.order.payment_type.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span> -->
                    </div>
                    <div v-if="order.payment_type === 'loan'" class="column is-6">
                      <label for="deliveryCompany" class="label">Город кредитования</label>
                      <br />
                      <div class="custom-select">
                        <select id="deliveryCompany" v-model="loanCity">
                          <option v-for="city in cities" :key="city.homebankCode" :value="city.homebankCode">
                            {{ city.name }}
                          </option>
                        </select>
                      </div>
                      <!-- <span
                        v-if="!$v.loanCity.required && $v.loanCity.$error"
                        class="red subtitle is-6 error__subtitle"
                      >
                        Обязательное поле
                      </span> -->
                    </div>
                  </div>
                </div>

                <div class="column is-4 is-offset-2 sidebar">
                  <div class="card">
                    <div class="card-content">
                      <div class="card-content__header">
                        <h3 class="card-content__main-title title is-4 is-spaced">Ваш заказ</h3>
                        <a class="subtitle is-5" @click="currentStep = ''">Изменить</a>
                      </div>
                      <hr />

                      <div class="card__block">
                        <div v-for="(product, index) in products" :key="`item-${index}`">
                          <h3 class="card-content__main-title title is-4 is-spaced">{{ product.title }}</h3>
                          <!-- <p class="bank-price subtitle is-6">
                            Рассрочка:
                            {{
                              Math.floor(product.price * product.qty * 0.3)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                            }}
                            тенге
                          </p> -->
                          <h3 class="title is-5">
                            Стоимость:
                            {{ (product.price * product.qty).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') }}
                            тенге
                          </h3>
                          <hr />
                        </div>
                      </div>

                      <div class="card__block">
                        <p class="title is-5">
                          Общая сумма:
                          {{
                            totalPrice
                              .toFixed()
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                          }}
                          тенге
                        </p>
                      </div>

                      <div class="card-content__buttons card__block">
                        <div class="card-content__buttons_header columns is-multiline">
                          <div class="column is-full">
                            <button
                              :class="['button button_red', { 'is-loading': isLoading }]"
                              @click.prevent="createOrder()"
                            >
                              Оформить заказ
                            </button>
                          </div>
                        </div>
                      </div>
                      <span v-if="error" class="red subtitle is-6 error__subtitle">{{ error }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="orderInfo">
              <div class="columns is-multiline is-centered">
                <div class="column is-full">
                  <h2 class="title is-3 has-text-centered is-spaced green">Спасибо за заказ!</h2>
                  <h2 class="title is-3 has-text-centered is-spaced">Номер вашего заказа: № {{ orderInfo.id }}</h2>
                  <p class="subtitle has-text-centered is-4">
                    Дата оформления: {{ new Date(orderInfo.created_at).toLocaleString('kk-KZ') }}
                  </p>
                  <p class="subtitle has-text-centered is-5 middlegray">Заказ будет сохранен в вашем личном кабинете</p>
                  <p class="subtitle has-text-centered is-5 green">
                    Наши менеджеры свяжутся с вами в ближайшее время для подтверждения заказа!
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </section>
    </main>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

export default {
  components: {},
  mixins: [loaders],
  data() {
    return {
      currentStep: '',
      productsObj: {},
      productsArr: [],
      totalPrice: 0,

      couponStatus: {
        name: '',
        sale: null
      },
      couponFailed: false,
      couponSale: '',

      delivery: true,
      deliveryCompany: '',
      comment: '',
      loanCity: '',

      order: {
        client_type: '',
        name: '',
        second_name: '',
        middle_name: '',
        email: '',
        phone: '',
        city: '',
        street: '',
        house: '',
        flat: '',
        delivery_type: '',
        delivery_company_name: '',
        delivery_message: '',
        payment_type: '',
        coupon: '',
        senderCity: 'Nur-Sultan',
        senderCityId: '4961',
        receiverCity: '',
        receiverCityId: '',
        tariffList: [
          {
            id: 1
          }
        ]
        // services: [
        //   {
        //     id: 2,
        //     param: 1000
        //   }
        // ]
      },
      currentReceiverCity: null,

      error: false,
      orderInfo: null
    }
  },
  computed: {
    products() {
      if (process.browser) {
        return this.$store.state.cart.products
      }
      return ''
    },
    isLoading() {
      return this.$store.state.isLoading
    },
    cities() {
      return this.$store.state.cities
    },
    apiPath() {
      return `${this.$store.state.apiPath}storage`
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  created() {
    if (process.browser) {
      const products = JSON.parse(localStorage.getItem('products')) || []
      this.createCartData(products)
    }

    if (this.isAuthenticated) {
      this.order.name = this.loggedInUser.name || ''
      this.order.second_name = this.loggedInUser.second_name || ''
      this.order.middle_name = this.loggedInUser.middle_name || ''
      this.order.email = this.loggedInUser.email || ''
      this.order.phone = this.loggedInUser.phone || ''
      this.order.city = this.loggedInUser.city || ''
      this.order.street = this.loggedInUser.street || ''
      this.order.house = this.loggedInUser.house || ''
      this.order.flat = this.loggedInUser.flat || ''
    }
  },
  methods: {
    async addToWishlist(id) {
      await this.$axios.post(`/user/wishlist/${id}`)
      this.fetchWishlist()
    },
    async fetchWishlist() {
      await this.$store.dispatch('account/fetchWishlist')
    },
    setReceiverCity(currentReceiverCity) {
      this.order.receiverCity = currentReceiverCity.name
      this.order.receiverCityId = currentReceiverCity.code
    },
    async checkPromo() {
      try {
        this.$store.dispatch('editIsLoading', true)
        this.couponFailed = false
        const response = await this.$axios.get(`coupon/${this.order.coupon}`)
        this.couponStatus = response.data
        this.couponSale = response.data.sale
        this.getTotalPrice()
        this.totalPrice = this.totalPrice - (this.totalPrice / 100) * response.data.sale
        this.$store.dispatch('editIsLoading', false)
      } catch {
        this.getTotalPrice()
        this.order.coupon = ''
        this.couponSale = ''
        this.couponFailed = true
        this.couponStatus = {
          name: '',
          sale: null
        }
        this.$store.dispatch('editIsLoading', false)
      }
    },
    goToNext(value) {
      this.currentStep = value
      this.scrollTop()
    },
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    createCartData(products) {
      if (process.browser) {
        if (products) {
          this.productsArr = []
          this.productsObj = {}

          products.forEach((product) => {
            this.productsObj[product.id] = product

            if (
              (this.productsObj[product.id] &&
                this.productsObj[product.id].qty &&
                this.productsObj[product.id].qty < 1) ||
              !this.productsObj[product.id].qty
            ) {
              this.productsObj[product.id].qty = 1
            }
            this.productsArr.push(this.productsObj[product.id])
          })

          localStorage.setItem('products', JSON.stringify(this.productsArr))
          this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))

          this.getTotalPrice()
        }
      }
    },
    async createOrder() {
      try {
        this.$store.dispatch('editIsLoading', true)

        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.orderInfo = null
          const newProducts = []

          this.productsArr.forEach((product) => {
            const newProduct = {
              product_id: product.id,
              qty: product.qty
            }

            newProducts.push(newProduct)
          })

          const body = {
            client_type: this.order.client_type,
            second_name: this.order.second_name,
            name: this.order.name,
            middle_name: this.order.middle_name,
            email: this.order.email,
            phone: this.order.phone,
            city: this.order.city,
            street: this.order.street,
            house: this.order.house,
            flat: this.order.flat,
            delivery_type: this.order.delivery_type,
            delivery_company_name: this.order.delivery_company_name,
            delivery_message: this.order.delivery_message,
            payment_type: this.order.payment_type,
            coupon: this.order.coupon,
            products: newProducts,
            senderCity: this.order.senderCity,
            receiverCity: this.order.receiverCity,
            senderCityId: this.order.senderCityId,
            receiverCityId: this.order.receiverCityId,
            tariffList: this.order.tariffList,
            services: [
              {
                id: 2,
                param: 1000
              }
            ]
          }
          if (this.order.payment_type === 'loan') {
            body.sales_place = this.loanCity
          }

          const response = await this.$axios.post('/orders', body)

          if (this.order.payment_type === 'online') {
            window.open(response.data, '_self')
          } else if (this.order.payment_type === 'loan') {
            window.open(response.data.attributes.url, '_self')
          } else {
            this.orderInfo = response.data
          }

          localStorage.removeItem('products')
          this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))
          this.$forceUpdate()

          this.scrollTop()
        }
      } catch {
        this.error = 'Ошибка, попробуйте позднее!'
      } finally {
        this.$store.dispatch('editIsLoading', false)
      }
    },
    removeFromCart(id) {
      if (process.browser) {
        const products = this.products.filter((product) => product.id !== id)

        this.createCartData(products)
        localStorage.setItem('products', JSON.stringify(products))
        this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))

        this.$forceUpdate()
      }
    },
    editProductsCount(value, product) {
      if (process.browser) {
        if (value) {
          this.productsObj[product.id].qty += 1
        } else if (!value && this.productsObj[product.id].qty > 1) {
          this.productsObj[product.id].qty -= 1
        }

        localStorage.setItem('products', JSON.stringify(this.productsArr))
        this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))

        this.getTotalPrice()
        this.$forceUpdate()
      }
    },
    getTotalPrice() {
      this.totalPrice = 0

      this.products.forEach((product) => {
        const price =
          parseInt(this.productsObj[product.id].price) -
          (parseInt(this.productsObj[product.id].sale || 0) / 100) * parseInt(this.productsObj[product.id].price)

        this.totalPrice += price * this.productsObj[product.id].qty
      })
    }
  },
  head: {
    title: 'Корзина | Интернет—магазин t-shop.kz'
  },
  validations: {
    order: {
      client_type: {
        required
      },
      name: {
        required
      },
      second_name: {
        required
      },
      middle_name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        required
      },
      city: {
        required
      },
      street: {
        required
      },
      house: {
        required
      },
      delivery_type: {
        required
      },
      payment_type: {
        required
      }
      // receiverCity: {
      //   required: requiredIf(() => this.order.delivery_type === 'delivery')
      // }
    }
    // loanCity: {
    //   required: requiredIf(() => this.order.payment_type === 'loan')
    // }
  }
}
</script>

<style lang="scss" scoped>
.catalog {
  .cart-product {
    &__subtitle_red {
      color: $red;
    }

    &__buttons-wrapper {
      @include vertical-end;
    }

    &__button_red {
      color: $red;

      [class^='icon__'],
      [class*=' icon__'] {
        color: $red;
      }

      &:hover {
        color: $white !important;

        [class^='icon__'],
        [class*=' icon__'] {
          color: $white !important;
        }
      }
    }

    &__buttons {
      width: 100%;
      @include horizontal-between;
      @include vertical-end;

      .subtitle {
        margin-bottom: 0 !important;
        @include vertical-center;

        [class^='icon__'],
        [class*=' icon__'] {
          padding-left: 0;
          padding-bottom: 0;
          padding-top: 0;
        }

        &:hover {
          color: $red;
          transition: 0.3s;

          [class^='icon__'],
          [class*=' icon__'] {
            color: $red;
          }
        }
      }
    }
  }

  .count {
    display: flex;

    &__number {
      padding: 0 0.7rem;
      margin-bottom: 0.5rem;
    }

    &__button {
      padding: 0;
      width: 1.5rem;
      height: 1.5rem;
      background-color: $gray;
      color: $white;
      font-weight: 600;
      border: none;
    }
  }

  .bank-price {
    opacity: 0.6;
  }

  .promocode {
    .custom-input {
      height: 100%;
    }
  }

  .registration {
    &__back {
      margin-bottom: 3rem;
      cursor: pointer;

      [class^='icon__'],
      [class*=' icon__'] {
        padding: 0.5rem 0.5rem 0.5rem 0;
      }
    }

    &__subtile_background {
      padding: 1rem;
      background: $gray;
      margin-top: 1rem;

      &:nth-child(1) {
        margin-top: 1rem;
      }
    }

    .label {
      display: inline-block;
    }

    .card {
      &__block {
        margin-bottom: 2rem;

        .card-content {
          &__main-title {
            margin-top: 1.5rem !important;
          }
        }
      }
    }
  }

  .sidebar {
    .card {
      &-content {
        &__buttons {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
