<template>
  <header class="navbar-wrapper">
    <Modal :is-active.sync="isModalActive">
      <div class="location">
        <div class="columns is-multiline location__content">
          <div class="column is-full location__header">
            <h2 class="title is-4">Выберите свой город</h2>
            <a to="/" class="icon__close" @click="isModalActive = false"></a>
          </div>
          <div v-for="(city, index) in cities" :key="`city-${index}`" class="column is-3 location__body">
            <label class="radio-container"
              >{{ city.name }}
              <input :id="`label-${index}`" v-model="currentCity" class="radio" type="radio" name :value="city" />
              <span class="radiomark"></span>
            </label>
          </div>
        </div>
      </div>
    </Modal>

    <nav v-show="!navbarHidden" class="navbar">
      <div class="container">
        <div class="navbar__floor">
          <div class="navbar__block">
            <ul class="list">
              <li v-scroll-to="'#footer'" class="list__item">Контакты</li>
              <li class="list__item">
                <nuxt-link to="/stocks">Акции</nuxt-link>
              </li>
              <li class="list__item">
                <nuxt-link to="/wholesale">Для оптовых продаж</nuxt-link>
              </li>
              <li class="list__item">
                <nuxt-link to="/tradein">TRADE-IN</nuxt-link>
              </li>
              <li class="list__item">
                <nuxt-link to="/configurator">Конфигуратор</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="navbar__block city-wrapper" @click="isModalActive = true">
            <a class="city">
              Ваш город:
              <span class="city__name">{{ currentCity.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar_second" @mouseenter="secondNavbarEnter(true)" @mouseleave="secondNavbarEnter(false)">
      <div class="container">
        <div class="navbar__floor columns is-gapless">
          <div class="navbar__block logo-search-wrapper column is-5">
            <nuxt-link to="/" class="logo-wrapper">
              <img class="logo" src="../../static/logo.svg" alt />
            </nuxt-link>
            <div class="field has-addons search-wrapper">
              <div class="control">
                <input v-model="search" class="custom-input search" type="text" placeholder="Найти..." />
              </div>
              <div class="control">
                <a class="button button_red is-info" @click.prevent="goToSearch">Поиск</a>
              </div>
            </div>
          </div>

          <div class="navbar__block list-wrapper column is-7">
            <ul :class="['list', isAuthenticated ? 'list_end' : 'list_end']">
              <!-- <nuxt-link
                :to="{ name: 'account', params: { currentTab: 'orders' } }"
                class="list__item list__item_main-link"
              >
                <span class="icon__sravnenie"></span>
                Сравнение
              </nuxt-link> -->

              <nuxt-link
                v-if="isAuthenticated"
                :to="{ name: 'account', params: { currentTab: 'wishlist' } }"
                class="list__item list__item_main-link"
              >
                <span class="icon__bookmate"></span>
                Избранное ({{ wishlistLength }})
              </nuxt-link>

              <nuxt-link v-if="!isAuthenticated" to="/auth" class="list__item list__item_main-link">
                <span class="icon__user"></span>
                Вход / Регистрация
              </nuxt-link>

              <nuxt-link v-else to="/account" class="list__item list__item_main-link">
                <span class="icon__user"></span>
                Личный кабинет
              </nuxt-link>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar_third">
      <div class="container">
        <div class="navbar__floor columns is-gapless">
          <div class="navbar__block column">
            <ul class="list">
              <template v-for="(category, index) in categories">
                <nuxt-link
                  v-if="category.constructor_status === 'no'"
                  :key="`category-${index}`"
                  class="list__item"
                  :to="`/category/${category.slug}`"
                  @mouseenter.native="setFourthNav(index, true)"
                  >{{ category.title }}</nuxt-link
                >
              </template>
            </ul>
          </div>

          <nuxt-link to="/cart" class="navbar__block cart-wrapper column is-2">
            <span class="icon__basket"></span>
            <p class="cart">Корзина ({{ cartLength }})</p>
          </nuxt-link>
        </div>
      </div>
    </nav>

    <transition v-if="categories.length !== 0 && categories[categoryIndex].subcategories.length !== 0" name="fade">
      <nav v-show="fourthNavVisible" class="navbar navbar_fourth" @mouseleave="setFourthNav(categoryIndex, false)">
        <div class="container">
          <div class="navbar__floor columns is-gapless">
            <div class="navbar__block column">
              <ul class="list">
                <nuxt-link
                  v-for="(subcategory, index) in categories[categoryIndex].subcategories"
                  :key="`subcategory-${index}`"
                  no-prefetch
                  class="list__item"
                  :to="`/category/${subcategory.slug}`"
                  >{{ subcategory.title }}</nuxt-link
                >
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </transition>

    <div class="navbar_mobile">
      <div class="container">
        <div class="columns is-mobile navbar_mobile__default">
          <div v-if="!navbarVisible" class="logo-search-wrapper column is-6">
            <nuxt-link to="/" class="logo-wrapper">
              <img class="logo" src="../../static/logo.svg" alt />
            </nuxt-link>
          </div>
          <div v-if="navbarVisible && !isAuthenticated" class="navbar__block burger-wrapper column">
            <nuxt-link to="/auth" @click.native="closeNavbar()">
              <span class="icon__user"></span>
            </nuxt-link>
          </div>
          <div v-else-if="navbarVisible" class="navbar__block burger-wrapper column">
            <nuxt-link to="/account" @click.native="closeNavbar()">
              <span class="icon__user"></span>
            </nuxt-link>
          </div>
          <div v-if="isAuthenticated" class="navbar__block burger-wrapper column">
            <nuxt-link :to="{ name: 'account', params: { currentTab: 'wishlist' } }" @click.native="closeNavbar()">
              <span class="icon__bookmate"></span>
            </nuxt-link>
            ({{ wishlistLength }})
          </div>
          <div class="navbar__block burger-wrapper column">
            <nuxt-link to="/cart" @click.native="closeNavbar()">
              <span class="icon__basket"></span>
            </nuxt-link>
            ({{ cartLength }})
          </div>
          <div class="burger-wrapper burger-wrapper_close column" @click="showNavbar()">
            <div :class="['burger', { burger_open: navbarVisible }]">
              <span class="burger__first-element"></span>
              <span class="burger__second-element"></span>
              <span class="burger__third-element"></span>
            </div>
          </div>
        </div>
        <div v-if="navbarVisible" class="columns is-multiline navbar_mobile__body">
          <div class="column is-full">
            <div class="navbar__block city-wrapper" @click="isModalActive = true">
              <a class="city">
                Ваш город:
                <span class="city__name">{{ currentCity.name }}</span>
              </a>
            </div>
          </div>
          <div class="column is-ful">
            <div class="field has-addons search-wrapper">
              <div class="control">
                <input v-model="search" class="custom-input search" type="text" placeholder="Найти..." />
              </div>
              <div class="control">
                <a class="button button_red is-info" @click.prevent="goToSearch">Поиск</a>
              </div>
            </div>
          </div>
          <div class="column is-full">
            <aside class="menu">
              <template v-for="(category, index) in categories">
                <template v-if="category.constructor_status === 'no'">
                  <p
                    :key="`title-${index}`"
                    class="menu-label title is-5"
                    :to="`/category/${category.slug}`"
                    @click="setMobileFourthNav(index)"
                  >
                    {{ category.title }}
                  </p>
                  <ul
                    v-if="
                      fourthNavVisible &&
                        categoryIndex === index &&
                        categories.length !== 0 &&
                        categories[categoryIndex].subcategories.length !== 0
                    "
                    :key="`subcategories-${index}`"
                    class="menu-list"
                  >
                    <li>
                      <nuxt-link
                        v-for="(subcategory, index) in categories[categoryIndex].subcategories"
                        :key="`subcategory-${index}`"
                        no-prefetch
                        class="list__item"
                        :to="`/category/${subcategory.slug}`"
                        @click.native="closeNavbar()"
                        >{{ subcategory.title }}</nuxt-link
                      >
                    </li>
                  </ul>
                </template>
              </template>
            </aside>
            <hr />
          </div>
          <div class="column is-full navbar_mobile__footer">
            <ul>
              <li v-scroll-to="'#footer'" class="list__item subtitle is-6" @click="closeNavbar()">Контакты</li>
              <li class="subtitle is-6 list__item">
                <nuxt-link to="/stocks" @click.native="closeNavbar()">Акции</nuxt-link>
              </li>
              <li class="subtitle is-6 list__item">
                <nuxt-link to="/wholesale" @click.native="closeNavbar()">Для оптовых продаж</nuxt-link>
              </li>
              <li class="subtitle is-6 list__item" @click="goToAnchor('#faq')">FAQ</li>
              <li class="subtitle is-6 list__item">
                <nuxt-link to="/tradein" @click.native="closeNavbar()">TRADE-IN</nuxt-link>
              </li>
              <li class="subtitle is-6 list__item">
                <nuxt-link to="/configurator" @click.native="closeNavbar()">Конфигуратор</nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import Modal from '@/components/ui/Modal'

export default {
  components: {
    Modal
  },
  async fetch() {
    await this.$store.dispatch('categories/fetchCategories')
  },
  data() {
    return {
      categoryIndex: 0,
      fourthNavVisible: false,
      navbarVisible: false,
      isModalActive: false,
      currentCity: {
        name: 'Нур-Султан',
        code: '4961'
      },
      navbarHidden: false,

      search: '',
      searchResults: null
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    categories() {
      return this.$store.getters['categories/getCategories']
    },
    wishlistLength() {
      return this.$store.state.account.wishlist.length
    },
    cartLength() {
      return this.$store.state.cart.products.length
    },
    cities() {
      return this.$store.state.cities
    }
  },
  watch: {
    currentCity: {
      handler(val) {
        localStorage.setItem('city', JSON.stringify(val))
      }
    }
  },
  mounted() {
    if (this.isAuthenticated) this.fetchWishlist()
    this.$store.dispatch('cart/addCartProducts', localStorage.getItem('products'))

    JSON.parse(localStorage.getItem('city'))
      ? (this.currentCity = JSON.parse(localStorage.getItem('city')))
      : localStorage.setItem('city', this.currentCity)
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    showNavbar() {
      this.navbarVisible = !this.navbarVisible
      const body = document.querySelector('body')
      if (this.navbarVisible) {
        body.style.height = '100vh'
      } else {
        body.style.heigth = '100%'
      }
    },
    closeNavbar() {
      this.navbarVisible = false
      const body = document.querySelector('body')
      body.style.heigth = '100%'
    },
    setFourthNav(index, visible) {
      this.categoryIndex = index
      this.fourthNavVisible = visible
    },
    setMobileFourthNav(index) {
      if (this.categoryIndex === index && this.fourthNavVisible) {
        this.fourthNavVisible = false
      } else {
        this.categoryIndex = index
        this.fourthNavVisible = true
      }
    },
    async fetchWishlist() {
      try {
        await this.$store.dispatch('account/fetchWishlist')
      } catch (error) {
        console.log(error)
      }
    },
    handleScroll() {
      if (window.scrollY > 10) {
        this.navbarHidden = true
      } else {
        this.navbarHidden = false
      }
    },
    secondNavbarEnter(value) {
      if (value) {
        this.navbarHidden = false
        this.setFourthNav(0, false)
      }
    },
    goToSearch() {
      try {
        this.showNavbar()
        this.$store.dispatch('results.page/fetchResults', this.search)
        this.$router.push('/results')
      } catch (error) {
        console.log(error)
      } finally {
        this.search = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.location {
  padding: 2rem 2rem 2.5rem 2rem;
  background-color: black;
  border: 1px solid red;

  &__header {
    @include horizontal-between;
    @include vertical-center;
    margin-bottom: 1.5rem;

    .title {
      display: inline;
      margin-bottom: 0;
    }

    [class^='icon__'],
    [class*=' icon__'] {
      font-size: 1rem;
      padding: 0.5rem 0;
      color: $white;

      &:hover {
        color: $red;
      }
    }
  }

  &__body {
    label {
      margin-left: 0.5rem;
      cursor: pointer;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.navbar-wrapper {
  position: fixed;
  z-index: 999;
  width: 100%;
}

.navbar {
  display: block;
  padding: 0;
  background-color: $black;
  // padding: 0.5rem 0;

  &_mobile {
    display: none;
  }

  .list {
    box-shadow: none !important;

    &__item {
      cursor: pointer;
      transition: 0.3s;

      a {
        color: #4a4a4a !important;
        transition: 0.3s;

        &:hover {
          color: $red !important;
        }
      }

      &:hover {
        color: $red;
      }
    }
  }

  &_second {
    .list {
      &__item {
        color: $white;
        display: flex;
        align-items: center;
      }
    }

    .burger-wrapper {
      display: none;
    }
  }

  &_third {
    .list {
      &__item {
        color: $white;
        cursor: pointer;
      }
    }

    .cart-wrapper {
      .cart {
        color: $white;
        transition: 0.3s;
      }

      &:hover {
        .cart {
          color: $red;
        }
      }
    }
  }

  &_fourth {
    position: absolute;
    bottom: -3rem;
    width: 100%;
    background-color: $gray;

    .list {
      &__item {
        color: $white;
        cursor: pointer;
        transition: 0.3s;
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    opacity: 0.8;
    background-color: #262626;
  }

  &__floor {
    @include horizontal-between;
    position: relative;
    width: 100%;
  }

  &__block {
    @include vertical-center;
  }

  .logo-search-wrapper {
    .logo-wrapper {
      display: flex;
    }

    .search-wrapper {
      margin: 0 2rem 0 2rem;

      .button_red {
        &:hover {
          background: $red !important;
        }
      }
    }

    .logo {
      height: 3.5rem;
    }
  }

  .list {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: transparent;

    &__item {
      padding: 0 1.5rem 0 1.5rem;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }

      &_main-link {
        padding: 0 2rem 0 2rem;
      }
    }
  }

  .list_between {
    @include horizontal-between;
  }

  .list_end {
    @include horizontal-end;
  }

  .city-wrapper,
  .cart-wrapper {
    @include horizontal-end;
  }
}

.city-wrapper {
  .city {
    color: #4a4a4a;
    &__name {
      color: $white;
      font-weight: bold;
    }
  }
}

@media screen and (max-width: 1024px) {
  .navbar {
    display: none;
    transition: 0.3s;

    // &_second {
    //   position: fixed;
    //   width: 100%;
    //   display: block;
    //   padding: 0.5rem 1.5rem;

    //   .logo-search-wrapper {
    //     .search {
    //       display: none;
    //     }
    //   }

    //   .list-wrapper {
    //     display: none;
    //   }
    // }
  }

  .navbar_mobile {
    display: block;
    @include horizontal-between;
    background-color: black;

    &__default,
    &__body {
      padding: 1rem 1.5rem 0.5rem 1.5rem;
    }

    &__default {
      min-height: 135px;
    }

    &__body {
      height: 90vh;
      overflow-y: scroll;
      background: black;
      padding-bottom: 5rem;

      .menu {
        .title {
          color: white;
        }

        &-list {
          .list__item {
            color: white;
          }
        }
      }

      hr {
        margin: 1.5rem 0 1.5rem 0 !important;
      }
    }

    &__footer {
      .list__item {
        color: #47484e;
        a {
          color: #47484e;
        }
      }
    }

    .burger-wrapper {
      @include horizontal-center;
      @include vertical-center;

      &_close {
        position: relative;
        @include horizontal-end;
      }

      .burger {
        width: 1.3rem;
        padding-bottom: 0.3rem;
        @include horizontal-between;
        flex-direction: column;
        align-items: center;
        position: relative;

        &__first-element,
        &__second-element,
        &__third-element {
          height: 2px;
          margin: 3px;
          width: 100%;
          background-color: $white;
        }

        &_open {
          .burger__first-element {
            transform: rotate(45deg);
          }
          .burger__third-element {
            display: none;
          }
          .burger__second-element {
            position: absolute;
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
}
</style>
