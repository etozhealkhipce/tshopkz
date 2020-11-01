<template>
  <div class="columns is-centered is-vcentered">
    <div class="column is-8">
      <div class="auth">
        <div class="columns is-multiline is-centered is-vcentered">
          <div class="column is-full auth__header">
            <a class="icon__back" @click.prevent="$emit('isRegister')"></a>
            <h2 class="title is-4 has-text-centered">Регистрация</h2>
            <nuxt-link to="/" class="icon__close"></nuxt-link>
          </div>

          <template v-if="!emailSent">
            <div class="column is-6 auth__form">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <label class="label" for="name">Имя</label>
                  <input v-model.trim="$v.userInfo.name.$model" name="name" class="custom-input" type="text" />
                  <span
                    v-if="!$v.userInfo.name.required && $v.userInfo.name.$error"
                    class="red subtitle is-6 error__subtitle"
                  >
                    Обязательное поле
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <label class="label" for="email">E-mail</label>
                  <input v-model.trim="$v.userInfo.email.$model" name="email" class="custom-input" type="email" />
                  <span
                    v-if="!$v.userInfo.email.required && $v.userInfo.email.$error"
                    class="red subtitle is-6 error__subtitle"
                  >
                    Обязательное поле
                  </span>
                  <span
                    v-if="!$v.userInfo.email.email && $v.userInfo.email.$error"
                    class="red subtitle is-6 error__subtitle"
                  >
                    Неверный формат почты
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <label class="label" for="password">Пароль</label>
                  <input
                    v-model.trim="$v.userInfo.password.$model"
                    name="password"
                    class="custom-input"
                    type="password"
                  />
                  <span
                    v-if="!$v.userInfo.password.required && $v.userInfo.password.$error"
                    class="red subtitle is-6 error__subtitle"
                  >
                    Обязательное поле
                  </span>
                  <span
                    v-if="!$v.userInfo.password.minLength && $v.userInfo.password.$error"
                    class="red subtitle is-6 error__subtitle"
                  >
                    Минимальная длина пароля 8 символов
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button :class="['button button_red', { 'is-loading': isLoading }]" @click.prevent="register()">
                    Зарегистрироваться
                  </button>
                </p>
                <span v-if="error" class="has-text-centered subtitle is-6 error__subtitle error__subtitle_form">
                  {{ error }}
                </span>
                <p v-if="error" class="auth__link subtitle is-6 has-text-centered">
                  <a href>Забыли пароль?</a>
                </p>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="columns is-multiline is-centered is-vcentered auth__content">
              <div class="column is-8">
                <p class="subtitle is-4 has-text-centered">
                  Для завершения регистрации перейдите по ссылке в письме, которое мы отправили на
                  <span class="green">{{ userInfo.email }}</span>
                </p>
                <nuxt-link to="/"><button class="button button_red">Перейти на главную</button></nuxt-link>
                <a class="button button_red" @click.prevent="$emit('isRegister')">Войти</a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

export default {
  mixins: [loaders],
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: null
      },
      emailSent: false
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    async register() {
      try {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.dispatch('editIsLoading', true)

          const register = await this.$axios.post('/register', {
            name: this.userInfo.name,
            email: this.userInfo.email,
            password: this.userInfo.password
          })

          await this.$axios.get('/email/resend', {
            headers: {
              Authorization: `Bearer ${register.data.token}`
            }
          })

          this.$store.dispatch('editIsLoading', false)
          this.emailSent = true
        }
      } catch {
        this.$store.dispatch('editIsLoading', false)
        this.error = 'Ошибка, такой e-mail существует!'
      }
    }
  },
  validations: {
    userInfo: {
      name: {
        required
      },
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  @include vertical-center;

  .auth {
    &__content {
      min-height: 500px;
    }

    &__form {
      .button {
        margin-top: 1rem;
      }
    }
  }
}
</style>
