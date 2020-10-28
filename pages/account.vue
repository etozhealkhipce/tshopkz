<template>
  <client-only>
    <main class="main">
      <section class="section">
        <div class="container">
          <div class="columns is-multiline is-variable is-4">
            <div class="main-title column is-4">
              <h2 class="title is-3 is-uppercase">Личный кабинет</h2>

              <div class="account">
                <p class="account__name subtitle is-4">{{ loggedInUser.name }}</p>

                <template v-if="!editPassword && !editEmail">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="name">Имя</label>
                      <input v-model.trim="$v.userInfo.name.$model" name="name" class="custom-input" type="text" />
                      <span
                        v-if="!$v.userInfo.name.required && $v.userInfo.name.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="second_name">Фамилия</label>
                      <input v-model="userInfo.second_name" name="second_name" class="custom-input" type="text" />
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="middle_name">Отчество</label>
                      <input v-model="userInfo.middle_name" name="middle_name" class="custom-input" type="text" />
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="phone">Телефон</label>
                      <input
                        v-model.trim="$v.userInfo.phone.$model"
                        placeholder="+7 (___) ___-__-__"
                        name="phone"
                        class="custom-input"
                        type="text"
                      />
                      <span
                        v-if="!$v.userInfo.phone.required && $v.userInfo.phone.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                      <span
                        v-if="!$v.userInfo.phone.phoneValidator && $v.userInfo.phone.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Неверный формат телефона</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="city">Город</label>
                      <input v-model.trim="$v.userInfo.city.$model" name="city" class="custom-input" type="text" />
                      <span
                        v-if="!$v.userInfo.city.required && $v.userInfo.city.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="street">Улица</label>
                      <input v-model.trim="$v.userInfo.street.$model" name="street" class="custom-input" type="text" />
                      <span
                        v-if="!$v.userInfo.street.required && $v.userInfo.street.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="house">Дом</label>
                      <input v-model.trim="$v.userInfo.house.$model" name="house" class="custom-input" type="text" />
                      <span
                        v-if="!$v.userInfo.house.required && $v.userInfo.house.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="flat">Квартира</label>
                      <input v-model.trim="$v.userInfo.flat.$model" name="flat" class="custom-input" type="text" />
                      <span
                        v-if="!$v.userInfo.flat.required && $v.userInfo.flat.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                    </p>
                  </div>
                </template>
                <div v-if="editPassword && !editEmail" class="field">
                  <p class="control has-icons-left has-icons-right">
                    <label class="label" for="password">Новый пароль</label>
                    <input v-model.trim="$v.password.$model" name="password" class="custom-input" type="password" />
                    <span v-if="!$v.password.required && $v.password.$error" class="red subtitle is-6 error__subtitle"
                      >Обязательное поле</span
                    >
                    <span v-if="!$v.password.minLength && $v.password.$error" class="red subtitle is-6 error__subtitle"
                      >Минимальная длина пароля 8 символов</span
                    >
                  </p>
                </div>

                <template v-if="editEmail && !editPassword">
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="email">Новый E-mail</label>
                      <input
                        v-model.trim="$v.userInfo.email.$model"
                        :placeholder="loggedInUser.email"
                        name="email"
                        class="custom-input"
                        type="text"
                      />
                      <span
                        v-if="!$v.userInfo.email.required && $v.userInfo.email.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                      <span
                        v-if="!$v.userInfo.email.email && $v.userInfo.email.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Неверный формат почты</span
                      >
                    </p>
                  </div>
                  <div class="field">
                    <p class="control has-icons-left has-icons-right">
                      <label class="label" for="password">Пароль</label>
                      <input v-model.trim="$v.password.$model" name="password" class="custom-input" type="password" />
                      <span v-if="!$v.password.required && $v.password.$error" class="red subtitle is-6 error__subtitle"
                        >Обязательное поле</span
                      >
                      <span
                        v-if="!$v.password.minLength && $v.password.$error"
                        class="red subtitle is-6 error__subtitle"
                        >Минимальная длина пароля 8 символов</span
                      >
                    </p>
                  </div>
                </template>

                <div class="field account__button">
                  <p class="control">
                    <button
                      v-if="!editPassword && !editEmail"
                      :class="['button button_red', { 'is-loading': isLoading }]"
                      @click.prevent="editUser()"
                    >
                      Сохранить
                    </button>
                    <button
                      v-if="editPassword && !editEmail"
                      :class="['button button_red', { 'is-loading': isLoading }]"
                      @click.prevent="editUserPassword()"
                    >
                      Изменить пароль
                    </button>
                    <button
                      v-if="editEmail && !editPassword"
                      :class="['button button_red', { 'is-loading': isLoading }]"
                      @click.prevent="editUserEmail()"
                    >
                      Изменить E-mail
                    </button>
                  </p>
                  <span v-if="error" class="has-text-centered subtitle is-6 error__subtitle error__subtitle_form">{{
                    error
                  }}</span>
                  <span v-if="editDone" class="has-text-centered subtitle is-6 done__subtitle done__subtitle_form"
                    >Изменение сохранено!</span
                  >
                  <span v-if="emailSent" class="has-text-centered subtitle is-6 done__subtitle done__subtitle_form"
                    >Для завершения смены e-mail перейдите по ссылке в письме!</span
                  >
                </div>

                <div class="field account__button">
                  <p v-if="!editPassword && !editEmail" class="control">
                    <a class="subtitle is-6" @click.prevent="editPassword = true">Изменить пароль</a>
                  </p>
                  <p v-if="!editEmail && !editPassword" class="control">
                    <a class="subtitle is-6" @click.prevent="editEmail = true">Изменить E-mail</a>
                  </p>
                  <p v-if="editPassword || editEmail" class="control">
                    <a class="subtitle is-6" @click.prevent="resetEdit()">Отменить</a>
                  </p>
                </div>

                <hr />
                <div class="account__logout">
                  <span class="logout-subtitle subtitle is-6">Изменено: {{ userInfo.updated }}</span>
                  <a class="logout-button subtitle is-5" @click.prevent="logOut()">Выйти</a>
                </div>
              </div>
            </div>
            <div class="column is-8">
              <div class="tabs">
                <ul>
                  <li :class="{ 'is-active': currentTab === 'wishlist' }" @click="currentTab = 'wishlist'">
                    <a>Избранное</a>
                  </li>
                  <li :class="{ 'is-active': currentTab === 'configs' }" @click="currentTab = 'configs'">
                    <a>Мои конфигурации</a>
                  </li>
                  <li :class="{ 'is-active': currentTab === 'orders' }" @click="currentTab = 'orders'">
                    <a>Мои заказы</a>
                  </li>
                </ul>
              </div>

              <div v-if="currentTab === 'wishlist'" class="columns is-multiline">
                <template v-if="Object.keys(wishlist).length !== 0">
                  <div v-for="(product, index) in wishlist" :key="`item-${index}`" class="column is-6">
                    <div class="card">
                      <div class="card-image">
                        <figure class="image is-square">
                          <p class="power title is-3">84</p>
                          <img :src="`${photoPath}/${product.main_img}`" :alt="`product-${index}`" />
                        </figure>
                      </div>
                      <div class="card-content">
                        <div class="card-content__header">
                          <!-- <a class="subtitle is-6"> <span class="icon__sravnenie"></span>Сравнение </a> -->
                          <a class="subtitle is-6" @click.prevent="removeFromWishlist(product.id)">
                            <span class="icon__close"></span>Убрать
                          </a>
                        </div>
                        <hr />
                        <h3 class="card-content__main-title title is-3 is-spaced">{{ product.title }}</h3>
                        <!-- <p class="bank-price subtitle is-6">
                          Рассрочка:
                          {{
                            Math.floor(product.price * 0.3)
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                          }}
                          тг.
                        </p> -->
                        <p class="price subtitle is-4">
                          {{
                            Math.round(
                              parseInt(product.price) - (parseInt(product.sale || 0) / 100) * parseInt(product.price)
                            )
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                          }}
                          тг.
                        </p>
                        <p v-if="product.sale" class="price subtitle is-4">
                          Скидка:
                          <span class="green">
                            {{ product.sale }}
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

                        <div class="card-content__buttons">
                          <div class="card-content__buttons_header columns is-multiline">
                            <div class="column is-full">
                              <button class="button button_red" @click.prevent="addToCart(product)">В корзину</button>
                            </div>
                            <div class="column is-full">
                              <button class="button">Подробнее</button>
                            </div>
                            <div class="column is-full">
                              <button class="button card-content__buttons_create">Собрать компьютер</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="column is-full">
                    <h2 class="subtitle is-4">Продукты не добавлены</h2>
                  </div>
                </template>
              </div>

              <div v-if="currentTab === 'configs'" class="columns is-multiline"></div>

              <div v-if="currentTab === 'orders'" class="columns is-multiline">
                <template v-if="Object.keys(orders).length !== 0">
                  <div v-for="(order, index) in orders" :key="`order-${index}`" class="column is-6">
                    <div class="card">
                      <div class="card-content">
                        <h3 class="card-content__main-title title is-3 is-spaced">Заказ № {{ order.id }}</h3>
                        <hr />
                        <ul>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Имя</span>
                            <span class="subtitle is-5">{{ order.name }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Фамилия</span>
                            <span class="subtitle is-5">{{ order.second_name }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Телефон</span>
                            <span class="subtitle is-5"> {{ order.phone }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Статус заказа</span>
                            <span class="subtitle is-5">{{ order.order_status }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Тип оплаты</span>
                            <span class="subtitle is-5">{{
                              order.payment_type == 'cash'
                                ? 'Наличные'
                                : order.payment_type == 'loan'
                                ? 'Кредит'
                                : 'Онлайн'
                            }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Физ. или юр. лицо</span>
                            <span class="subtitle is-5">{{
                              order.client_type == 'individual' ? 'Физ. лицо' : 'Юр. лицо'
                            }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Дата</span>
                            <span class="subtitle is-5">{{ new Date(order.created_at).toLocaleString('kk-KZ') }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Служба доставки</span>
                            <span class="subtitle is-5">{{ order.delivery_company_name }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Стоимость доставки</span>
                            <span class="subtitle is-5">{{ order.delivery_price }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Адрес</span>
                            <span class="subtitle is-5">{{ order.city }}</span>
                            <span class="subtitle is-5">{{ order.street }}</span>
                            <span class="subtitle is-5">{{ order.house }}</span>
                            <span class="subtitle is-5">{{ order.flat }}</span>
                          </li>
                          <li class="card-content__part">
                            <span class="card-content__part_name subtitle is-6">Общая стоимость заказа</span>
                            <span class="subtitle is-5">
                              {{
                                Math.floor(order.total_price * 0.3)
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                              }}
                              тг.</span
                            >
                          </li>
                        </ul>
                        <hr />
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="column is-full">
                    <h2 class="subtitle is-4">Продукты не добавлены</h2>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </client-only>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email, minLength, helpers } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

// eslint-disable-next-line no-useless-escape
const phoneValidator = helpers.regex('phoneValidator', /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/)

export default {
  mixins: [loaders],
  middleware: ['auth'],
  data() {
    return {
      emailSent: false,
      editPassword: false,
      editEmail: false,
      editDone: true,
      currentTab: 'wishlist',
      userInfo: {
        name: '',
        address: '',
        email: '',
        phone: null,
        city: '',
        house: '',
        middle_name: '',
        second_name: '',
        street: '',
        flat: ''
      },
      password: ''
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
    wishlist() {
      return this.$store.state.account.wishlist
    },
    orders() {
      return this.$store.state.account.orders
    },
    photoPath() {
      return `${this.$store.state.photoPath}storage`
    }
  },
  created() {
    this.setUser()
    this.fetchWishlist()
    this.fetchOrders()

    if (this.$route.params.currentTab) {
      this.currentTab = this.$route.params.currentTab
    }

    this.editDone = false
  },
  methods: {
    async removeFromWishlist(id) {
      await this.$axios.delete(`/user/wishlist/${id}`)
      this.fetchWishlist()
    },
    setUser() {
      this.userInfo.city = this.loggedInUser.city || ''
      this.userInfo.house = this.loggedInUser.house || ''
      this.userInfo.middle_name = this.loggedInUser.middle_name || ''
      this.userInfo.name = this.loggedInUser.name || ''
      this.userInfo.phone = this.loggedInUser.phone || ''
      this.userInfo.second_name = this.loggedInUser.second_name || ''
      this.userInfo.street = this.loggedInUser.street || ''
      this.userInfo.flat = this.loggedInUser.flat || ''
      this.userInfo.updated = new Date(this.loggedInUser.updated_at).toLocaleString('kk-KZ') || ''
      this.userInfo.email = this.loggedInUser.email || ''
    },
    async editUser() {
      try {
        this.$v.userInfo.$touch()
        if (!this.$v.userInfo.$invalid) {
          this.$store.dispatch('editIsLoading', true)

          const urlencoded = this.urlencodedGenerate()
          await this.$axios.put('/user', urlencoded, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })

          this.$store.dispatch('editIsLoading', false)
          this.editDone = true

          setTimeout(() => {
            this.editDone = false
          }, 2000)

          await this.$auth.fetchUser()
          this.setUser()
        }
      } catch {
        this.$store.dispatch('editIsLoading', false)
        this.error = 'Ошибка, попробуйте позднее!'
      }
    },
    async editUserPassword() {
      try {
        this.$v.password.$touch()

        if (!this.$v.password.$invalid) {
          this.error = ''
          this.editDone = false
          this.$store.dispatch('editIsLoading', true)

          const urlencoded = this.urlencodedGenerate()
          urlencoded.append('password', this.password)

          await this.$axios.put('/user', urlencoded, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })

          this.$store.dispatch('editIsLoading', false)
          this.resetEdit()
          this.editDone = true

          setTimeout(() => {
            this.editDone = false
          }, 2000)
        }
      } catch {
        this.$store.dispatch('editIsLoading', false)
        this.error = 'Ошибка, попробуйте позднее!'
      }
    },
    async editUserEmail() {
      try {
        this.$v.userInfo.email.$touch()
        this.$v.password.$touch()

        if (!this.$v.userInfo.email.$invalid && !this.$v.password.$invalid) {
          this.error = ''
          this.editDone = false
          this.$store.dispatch('editIsLoading', true)

          if (this.loggedInUser.email !== this.userInfo.email) {
            const loginResponse = await this.$axios.post('/login', {
              email: this.loggedInUser.email,
              password: this.password
            })

            if (loginResponse.data.token) {
              const urlencoded = this.urlencodedGenerate()
              urlencoded.append('email', this.userInfo.email)
              await this.$axios.put('/user', urlencoded)
              this.emailSent = true
            } else {
              this.error = 'Неверный пароль!'
            }
          } else {
            this.error = 'Измените e-mail!'
          }

          this.$store.dispatch('editIsLoading', false)
        } else {
        }
      } catch {
        this.$store.dispatch('editIsLoading', false)
        this.error = 'Неверный пароль!'
      }
    },
    async fetchWishlist() {
      await this.$store.dispatch('account/fetchWishlist')
    },
    async fetchOrders() {
      await this.$store.dispatch('account/fetchOrders')
    },
    async logOut() {
      await this.$auth.logout()
    },
    urlencodedGenerate() {
      const urlencoded = new URLSearchParams()
      urlencoded.append('name', this.userInfo.name)
      urlencoded.append('email', this.userInfo.email)
      urlencoded.append('address', this.userInfo.address)
      urlencoded.append('phone', this.userInfo.phone)
      urlencoded.append('city', this.userInfo.city)
      urlencoded.append('house', this.userInfo.house)
      urlencoded.append('middle_name', this.userInfo.middle_name)
      urlencoded.append('second_name', this.userInfo.second_name)
      urlencoded.append('street', this.userInfo.street)
      urlencoded.append('flat', this.userInfo.flat)
      urlencoded.append('password', this.password)

      return urlencoded
    },
    resetEdit() {
      this.editPassword = false
      this.editEmail = false
      this.error = false
      this.editDone = false
    }
  },
  validations: {
    userInfo: {
      name: {
        required
      },
      phone: {
        required,
        phoneValidator
      },
      city: {
        required
      },
      house: {
        required
      },
      street: {
        required
      },
      flat: {
        required
      },
      email: {
        email,
        required
      }
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  padding: 4rem 1.5rem;
}

.account {
  &__name {
    margin-top: 1rem;
  }

  &__button {
    .control {
      padding: 0.5rem 0 0.5rem 0;
    }

    a {
      transition: 0.3s;

      &:hover {
        color: $red;
      }
    }
  }

  &__logout {
    width: 100%;
    @include horizontal-between;

    .logout-subtitle {
      margin-top: 1.5rem;
      margin-bottom: 0;
      @include vertical-end;
    }

    .logout-button {
      color: $red;
      margin-right: 0;
      transition: 0.3s;
      margin-top: 1.5rem;

      &:hover {
        color: $white;
      }
    }
  }
}

.card {
  .image {
    position: relative;

    .power {
      position: absolute;
      left: 1rem;
      top: 1rem;
      color: #47e220;
      z-index: 1;
    }
  }
}
</style>
