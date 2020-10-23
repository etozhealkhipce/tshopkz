<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div v-for="item in 3" :key="item" class=" column is-4">
          <div class="progress">
            <div class="progress__content">
              <h2 class="title is-1">20 <span class="title">ЛЕТ</span></h2>
              <p class="subtitle is-4">Опыта <br />на рынке</p>
            </div>
          </div>
        </div>
        <div class="progress__title column is-full">
          <h2 class="title is-3 is-uppercase has-text-centered">Нашему многолетнему опыту доверяют тысячи людей!</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 1.5rem 0;

  &__content {
    text-align: left;

    .title,
    .subtitle {
      text-transform: uppercase;
    }

    .title {
      font-size: 3rem;
      color: $red;

      .title {
        font-size: 1.5rem;
        font-weight: 400;
      }
    }

    .subtitle {
      font-weight: 600;
    }
  }

  &__title {
    margin-top: 3rem;
  }
}
</style>
