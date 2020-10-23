<template>
  <client-only>
    <section class="section">
      <div class="container">
        <Login v-if="!isRegister && !isRestore" @isRegister="isRegister = true" @isRestore="isRestore = true" />
        <Register v-if="isRegister" @isRegister="isRegister = false" />
        <Restore v-if="isRestore" @isRestore="isRestore = false" />
      </div>
    </section>
  </client-only>
</template>

<script>
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Restore from '@/components/auth/Restore'

export default {
  middleware: ['auth'],
  auth: 'guest',
  layout: 'empty',
  components: {
    Login,
    Register,
    Restore
  },
  data() {
    return {
      isRegister: false,
      isRestore: false
    }
  },

  methods: {}
}
</script>

<style scoped lang="scss"></style>
