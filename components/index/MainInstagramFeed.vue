<template>
  <section class="section">
    <div class="container">
      <div class="catalog">
        <div class="columns is-multiline is-variable is-4">
          <div class="main-title column is-full">
            <h2 class="title is-3 is-uppercase">Наш instagram</h2>
          </div>

          <div v-if="isDownload" class="column is-full">
            <Preloader />
          </div>

          <template v-else>
            <div v-for="(photo, index) in photos" :key="`photo-${index}`" class="column is-4">
              <figure class="image image is-1by1">
                <img :src="photo.node.display_url" />
                <div class="image__after">
                  <a :href="`https://instagram.com/${username}`" target="_blank" class="subtitle is-white"
                    >Перейти в профиль
                  </a>
                </div>
              </figure>
            </div>
          </template>

          <div class="button-wrapper column is-full">
            <button class="button button_red">Перейти в Instagram</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Preloader from '@/components/ui/Preloader'

export default {
  components: {
    Preloader
  },
  data() {
    return {
      isDownload: true
    }
  },
  computed: {
    photos() {
      return this.$store.state['main.page'].instagramPhotos
    },
    username() {
      return this.$store.state['main.page'].instagramUsername
    }
  },
  created() {
    this.getPhotos()
  },
  methods: {
    async getPhotos() {
      try {
        await this.$store.dispatch('main.page/fetchInstagram')
        this.isDownload = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.button-wrapper {
  @include horizontal-center;
  margin-top: 1rem;
}

.image {
  position: relative;

  &__after {
    position: absolute;
    transition: 0.3s;
    height: 100%;
    right: 0;
    left: 0;
    top: 0;
    margin: 0 auto;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    cursor: pointer;

    .image__after {
      opacity: 1;

      .subtitle {
        transition: 0.3s;

        &:hover {
          color: #bdbdbd;
        }
      }
    }
  }
}
</style>
