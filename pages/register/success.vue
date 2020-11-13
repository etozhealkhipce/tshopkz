<template>
  <main class="main">
    <section class="section">
      <div class="container">
        <div class="catalog">
          <div class="columns is-multiline is-centered">
            <div class="column is-full">
              <h2 class="title is-3 has-text-centered is-spaced green">E-mail подтвержден!</h2>
              <h2 class="title is-3 has-text-centered is-spaced">Войдите с помощью подтвержденных данных</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  head: {
    title: 'Успешная регистрация | Интернет—магазин t-shop.kz'
  },
  middleware: ['auth'],
  auth: 'guest'
}
</script>

<style lang="scss">
.catalog {
  .cart-product {
    &__subtitle_red {
      color: $red;
    }

    &__buttons-wrapper {
      @include vertical-end;
    }

    &__button_red {
      color: $red;

      [class^='icon__'],
      [class*=' icon__'] {
        color: $red;
      }

      &:hover {
        color: $white !important;

        [class^='icon__'],
        [class*=' icon__'] {
          color: $white !important;
        }
      }
    }

    &__buttons {
      width: 100%;
      @include horizontal-between;
      @include vertical-end;

      .subtitle {
        margin-bottom: 0 !important;
        @include vertical-center;

        [class^='icon__'],
        [class*=' icon__'] {
          padding-left: 0;
          padding-bottom: 0;
          padding-top: 0;
        }

        &:hover {
          color: $red;
          transition: 0.3s;

          [class^='icon__'],
          [class*=' icon__'] {
            color: $red;
          }
        }
      }
    }
  }

  .count {
    display: flex;

    &__number {
      padding: 0 0.7rem;
      margin-bottom: 0.5rem;
    }

    &__button {
      padding: 0;
      width: 1.5rem;
      height: 1.5rem;
      background-color: $gray;
      color: $white;
      font-weight: 600;
      border: none;
    }
  }

  .bank-price {
    opacity: 0.6;
  }

  .promocode {
    .custom-input {
      height: 100%;
    }
  }

  .registration {
    &__back {
      margin-bottom: 3rem;
      cursor: pointer;

      [class^='icon__'],
      [class*=' icon__'] {
        padding: 0.5rem 0.5rem 0.5rem 0;
      }
    }

    &__subtile_background {
      padding: 1rem;
      background: $gray;
      margin-top: 1rem;

      &:nth-child(1) {
        margin-top: 1rem;
      }
    }

    .label {
      display: inline-block;
    }

    .card {
      &__block {
        margin-bottom: 2rem;

        .card-content {
          &__main-title {
            margin-top: 1.5rem !important;
          }
        }
      }
    }
  }

  .sidebar {
    .card {
      &-content {
        &__buttons {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
