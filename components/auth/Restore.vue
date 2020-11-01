<template>
  <div class="columns is-centered is-vcentered">
    <div class="column is-8">
      <div class="auth">
        <div class="columns is-multiline is-centered is-vcentered">
          <div class="column is-full auth__header">
            <a class="icon__back" @click.prevent="$emit('isRestore')"></a>
            <h2 class="title is-4 has-text-centered">Восстановление пароля</h2>
            <nuxt-link to="/" class="icon__close"></nuxt-link>
          </div>

          <template v-if="!emailSent">
            <div class="column is-6 auth__form">
              <div class="field">
                <p class="control has-icons-left has-icons-right">
                  <label class="label" for="name">E-mail</label>
                  <input v-model.trim="$v.email.$model" name="email" class="custom-input" type="text" />
                  <span v-if="!$v.email.required && $v.email.$error" class="red subtitle is-6 error__subtitle">
                    Обязательное поле
                  </span>
                </p>
              </div>
              <div class="field">
                <p class="control">
                  <button :class="['button button_red', { 'is-loading': isLoading }]" @click.prevent="restore()">
                    Восстановить пароль
                  </button>
                </p>
                <span v-if="error" class="has-text-centered subtitle is-6 error__subtitle error__subtitle_form">
                  Пользователь не найден!
                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="columns is-multiline is-centered is-vcentered auth__content">
              <div class="column is-8">
                <p class="subtitle is-4 has-text-centered">
                  Для восставления пароля перейдите по ссылке в письме, которое мы отправили на
                  <span class="green">{{ email }}</span>
                </p>
                <nuxt-link to="/"><button class="button button_red">Перейти на главную</button></nuxt-link>
                <a class="button button_red" @click.prevent="$emit('isRestore')">Войти</a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

export default {
  mixins: [loaders],
  data() {
    return {
      email: '',

      emailSent: false,
      error: false
    }
  },
  methods: {
    async restore() {
      try {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.dispatch('editIsLoading', true)

          await this.$axios.post('password/email', {
            email: this.email
          })

          this.emailSent = true
          this.$store.dispatch('editIsLoading', false)
        }
      } catch (error) {
        this.$store.dispatch('editIsLoading', false)
        this.error = error
      }
    }
  },
  validations: {
    email: {
      email,
      required
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
