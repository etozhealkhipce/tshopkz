<template>
  <client-only>
    <section class="section">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-8">
            <div class="auth">
              <div class="columns is-multiline is-centered is-vcentered">
                <div class="column is-full auth__header">
                  <h2 class="title is-4 has-text-centered">Восстановление пароля</h2>
                  <nuxt-link to="/" class="icon__close"></nuxt-link>
                </div>

                <template v-if="!success">
                  <div class="column is-6 auth__form">
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <label class="label" for="name">E-mail</label>
                        <input v-model.trim="$v.email.$model" name="email" class="custom-input" type="text" />
                        <span
                          v-if="(!$v.email.required || !$v.email.email) && $v.email.$error"
                          class="red subtitle is-6 error__subtitle"
                        >
                          Неверный формат или поле не заполнено
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <label class="label" for="name">Новый пароль</label>
                        <input
                          v-model.trim="$v.newPassword.$model"
                          name="newPassword"
                          class="custom-input"
                          type="password"
                        />
                        <span
                          v-if="(!$v.newPassword.required || !$v.newPassword.minLength) && $v.newPassword.$error"
                          class="red subtitle is-6 error__subtitle"
                        >
                          Минимальная длина пароля 8 символов или поле не заполнено
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <label class="label" for="name">Повторите пароль</label>
                        <input
                          v-model.trim="$v.confirmNewPassword.$model"
                          name="confirmNewPassword"
                          class="custom-input"
                          type="password"
                        />
                        <span
                          v-if="
                            (!$v.confirmNewPassword.required || !$v.confirmNewPassword.sameAs) &&
                              $v.confirmNewPassword.$error
                          "
                          class="red subtitle is-6 error__subtitle"
                        >
                          Пароли не совпадают или поле не заполнено
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control">
                        <button
                          :class="['button button_red', { 'is-loading': isLoading }]"
                          @click.prevent="setNewPassword()"
                        >
                          Сменить пароль
                        </button>
                      </p>
                    </div>
                    <p v-if="error == '422'" class="subtitle is-6 has-text-centered red">
                      Ошибка! Неверный e-mail адрес!
                    </p>
                  </div>
                </template>

                <template v-else-if="success">
                  <div class="columns is-multiline is-centered is-vcentered auth__content">
                    <div class="column is-8">
                      <p class="subtitle is-4 has-text-centered green">
                        Новый пароль установлен!
                      </p>
                      <nuxt-link to="/"><button class="button button_red">Перейти на главную</button></nuxt-link>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </client-only>
</template>

<script>
import { required, sameAs, email, minLength } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

export default {
  mixins: [loaders],
  data() {
    return {
      email: '',
      newPassword: '',
      confirmNewPassword: '',

      success: false,
      error: false
    }
  },
  methods: {
    async setNewPassword() {
      try {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.$store.dispatch('editIsLoading', true)

          await this.$axios.post('password/reset', {
            email: this.email,
            token: this.$route.query.token,
            password: this.newPassword,
            password_confirmation: this.confirmNewPassword
          })

          this.success = true
        }
      } catch (error) {
        this.error = error.response.status
      } finally {
        this.$store.dispatch('editIsLoading', false)
      }
    }
  },
  head: {
    title: 'Восстановление пароля | Интернет—магазин t-shop.kz'
  },
  middleware: ['auth'],
  auth: 'guest',
  layout: 'empty',
  validations: {
    newPassword: {
      required,
      minLength: minLength(8)
    },
    confirmNewPassword: {
      required,
      sameAs: sameAs('newPassword')
    },
    email: {
      required,
      email
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
