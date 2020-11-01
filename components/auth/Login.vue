<template>
  <div class="columns is-centered is-vcentered">
    <div class="column is-8">
      <div class="auth">
        <div class="columns is-multiline is-centered">
          <div class="column is-full auth__header">
            <h2 class="title is-4 has-text-centered">Вход</h2>
            <nuxt-link to="/" class="icon__close"></nuxt-link>
          </div>
          <div class="column is-6 auth__form">
            <p class="subtitle is-6 has-text-centered">Войти через социальные сети</p>
            <div class="auth__icons">
              <span class="icon__fb" @click="loginSocial('facebook')"></span>
              <span class="icon__ig" @click="loginSocial('instagram')"></span>
              <span class="icon__mr" @click="loginSocial('mailru')"></span>
              <span class="icon__vk" @click="loginSocial('vkontakte')"></span>
            </div>
            <p class="subtitle is-6 has-text-centered">или используя вход</p>

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
                <button :class="['button button_red', { 'is-loading': isLoading }]" @click.prevent="login()">
                  Войти
                </button>
              </p>
            </div>

            <span v-if="error" class="has-text-centered subtitle is-6 error__subtitle error__subtitle_form">
              {{ error }}
            </span>

            <p class="auth__link subtitle is-6 has-text-centered">
              <a href @click.prevent="$emit('isRestore')">Забыли пароль?</a>
            </p>

            <div class="field">
              <p class="control">
                <button class="button" @click.prevent="$emit('isRegister')">Зарегистрироваться</button>
              </p>
            </div>
          </div>
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
        email: '',
        password: null
      }
    }
  },
  methods: {
    async loginSocial(provider) {
      const response = await this.$axios.get(`/login/${provider}`)
      window.open(response.data, '_self')
      // console.log(response)
    },
    async login() {
      try {
        this.error = ''
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.dispatch('editIsLoading', true)
          await this.$auth.loginWith('local', { data: this.userInfo })
          this.$store.dispatch('editIsLoading', false)
          this.$router.push('/')
        }
      } catch (err) {
        // eslint-disable-next-line
        if (err.response.status == 403) {
          this.error = 'Доступ запрещен!'
        } else {
          this.error = 'Неверный логин или пароль!'
        }
        this.$store.dispatch('editIsLoading', false)
      }
    }
  },
  validations: {
    userInfo: {
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

<style scoped lang="scss"></style>
