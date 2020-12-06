export default {
  data() {
    return {
      error: ''
    }
  },
  mounted() {
    this.error = ''
    this.$store.dispatch('editIsLoading', false)
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  }
}
