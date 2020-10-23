<template>
  <section class="section">
    <div class="container">
      <div class="config">
        <div class="config__content_wrapper">
          <div class="config__content">
            <h2 class="title">Собери свой мощный игровой ПК</h2>
            <p class="subtitle">В твоем арсенале мощнейшие комплектующие от ведущих производителей</p>

            <button class="button button_red">Собрать свой ПК</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.config {
  background: url('https://hyperpc.ru/images/company/why-hyperpc/oclab_overclock/why-hyperpc-overclocking-banner.jpg')
    center/cover no-repeat;
  height: 37rem;

  &__content_wrapper {
    @include vertical-end;
    height: 100%;
  }

  &__content {
    width: 100%;
    padding: 2.5rem;
    background-color: rgba(23, 23, 23, 0.95);
  }
}
</style>
