<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide
      v-for="(slide, index) in sliders"
      :key="`slid-${index}`"
      style="background: url('images/slide1.jpg') center/cover no-repeat"
    >
      <div class="container slide">
        <div class="columns slide__content">
          <div class="column is-3-desktop is-3-widescreen is-10-tablet is-12-mobile">
            <h1 class="title is-spaced">{{ slide.title }}</h1>
            <p class="subtitle">{{ slide.description }}</p>
            <p class="subtitle has-text-weight-bold">Стоимость: {{ slide.price }}</p>

            <div class="buttons">
              <nuxt-link :to="slide.slug"><button class="button button_red">Подробнее</button></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>

    <div slot="pagination" class="swiper-pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  async fetch() {
    await this.$store.dispatch('main.page/fetchSliders')
  },
  data: () => ({
    swiperOption: {
      direction: 'horizontal',
      height: 700,
      autoplay: {
        delay: 2000
      },
      pagination: {
        // el: '.swiper-pagination'
        // type: 'bullets'
        // bulletClass: 'swiper-bullet',
        // bulletActiveClass: 'swiper-bullet_active'
      }
    }
  }),
  computed: {
    sliders() {
      return this.$store.state['main.page'].sliders
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  &-slide {
    height: 700px;
    display: flex;
    align-items: center;

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      background: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(226, 32, 40, 1) 100%);
      height: 2px;
    }
  }

  .slide {
    padding: 0 1.5rem;

    &__content {
      justify-content: flex-end;

      .buttons {
        .button_red {
          margin-right: 1.5rem;
        }
      }
    }
  }
}
</style>
