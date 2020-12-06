<template>
  <main>
    <NavBar />
    <nuxt />
    <Footer />
  </main>
</template>

<script>
import NavBar from '@/components/layouts/NavBar.vue'
import Footer from '@/components/layouts/Footer.vue'

export default {
  components: {
    NavBar,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding-top: 0;
}
</style>
