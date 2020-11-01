<template>
  <main class="main">
    <MainSwiperScreen />
    <MainCategoriesScreen />
    <MainConfigScreen />
    <MainInstagramFeed />
    <MainProgress />
    <MainAskedQuestions />
  </main>
</template>

<script>
import MainSwiperScreen from '@/components/index/MainSwiperScreen'
import MainCategoriesScreen from '@/components/index/MainCategoriesScreen'
import MainConfigScreen from '@/components/index/MainConfigScreen'
import MainInstagramFeed from '@/components/index/MainInstagramFeed'
import MainProgress from '@/components/index/MainProgress'
import MainAskedQuestions from '@/components/index/MainAskedQuestions'

export default {
  components: {
    MainSwiperScreen,
    MainCategoriesScreen,
    MainConfigScreen,
    MainInstagramFeed,
    MainProgress,
    MainAskedQuestions
  },
  head: {
    title: 'Главная | Интернет—магазин t-shop.kz'
  }
}
</script>

<style></style>
