<template>
  <div class="preloader">
    <div class="preloader__animation"></div>
    <p class="subtitle is-5 has-text-centered">Загрузка...</p>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.preloader {
  width: 100%;
  margin: 10rem 0 10rem 0;
  @include column-full-center;

  &__animation {
    margin-bottom: 1rem;
    background: #e22028;
    height: 2px;
    animation: example 1s infinite;
  }
}

@keyframes example {
  0% {
    width: 5%;
  }
  10% {
    width: 10%;
  }
  20% {
    width: 20%;
  }
  30% {
    width: 30%;
  }
  40% {
    width: 40%;
  }
  50% {
    width: 50%;
  }
  60% {
    width: 60%;
  }
  70% {
    width: 70%;
  }
  80% {
    width: 80%;
  }
  90% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}
</style>
