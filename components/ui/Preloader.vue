<template>
  <div class="preloader" :class="[full ? 'preloader__height_full' : 'preloader__height_half']">
    <div class="preloader__animation"></div>
    <p class="subtitle is-5 has-text-centered">Загрузка...</p>
  </div>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.preloader {
  width: 100%;
  @include column-full-center;

  &__animation {
    margin-bottom: 1rem;
    background: #e22028;
    height: 2px;
    animation: example 1s infinite;
  }

  &__height {
    &_full {
      height: 100vh;
    }

    &_half {
      margin: 10rem 0 10rem 0;
    }
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
