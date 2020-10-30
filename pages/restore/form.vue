<template>
  <client-only>
    <section class="section">
      <div class="container">
        <div class="columns is-centered is-vcentered">
          <div class="column is-8">
            <div class="auth">
              <div class="columns is-multiline is-centered is-vcentered">
                <div class="column is-full auth__header">
                  <h2 class="title is-3 has-text-centered">Восстановление пароля</h2>
                  <nuxt-link to="/" class="icon__close"></nuxt-link>
                </div>

                <template v-if="!newPasswordSent">
                  <div class="column is-6 auth__form">
                    <div class="field">
                      <p class="control has-icons-left has-icons-right">
                        <label class="label" for="name">Новый пароль</label>
                        <input v-model.trim="$v.newPassword.$model" name="email" class="custom-input" type="text" />
                        <span
                          v-if="!$v.newPassword.required && $v.newPassword.$error"
                          class="red subtitle is-6 error__subtitle"
                        >
                          Обязательное поле
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
                  </div>
                </template>
                <template v-else-if="error">
                  <div class="columns is-multiline is-centered is-vcentered auth__content">
                    <div class="column is-8">
                      <p class="subtitle is-4 has-text-centered">
                        Ошибка! Попробуйте позднее!
                      </p>
                      <nuxt-link to="/"><button class="button button_red">Перейти на главную</button></nuxt-link>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="columns is-multiline is-centered is-vcentered auth__content">
                    <div class="column is-8">
                      <p class="subtitle is-4 has-text-centered">
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
import { required } from 'vuelidate/lib/validators'
import loaders from '~/mixins/loaders'

export default {
  middleware: ['auth'],
  auth: 'guest',
  layout: 'empty',
  mixins: [loaders],
  data() {
    return {
      newPassword: '',

      newPasswordSent: false,
      error: false
    }
  },
  methods: {
    async setNewPassword() {
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
    newPassword: {
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
