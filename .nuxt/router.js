import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7c900e20 = () => interopDefault(import('..\\pages\\account.vue' /* webpackChunkName: "pages_account" */))
const _d4784d16 = () => interopDefault(import('..\\pages\\auth.vue' /* webpackChunkName: "pages_auth" */))
const _40c8faed = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages_cart" */))
const _930ec252 = () => interopDefault(import('..\\pages\\category\\index.vue' /* webpackChunkName: "pages_category_index" */))
const _14584382 = () => interopDefault(import('..\\pages\\configurator.vue' /* webpackChunkName: "pages_configurator" */))
const _70953d90 = () => interopDefault(import('..\\pages\\product\\index.vue' /* webpackChunkName: "pages_product_index" */))
const _6f1f9e39 = () => interopDefault(import('..\\pages\\results.vue' /* webpackChunkName: "pages_results" */))
const _25012c2a = () => interopDefault(import('..\\pages\\stocks.vue' /* webpackChunkName: "pages_stocks" */))
const _2888964c = () => interopDefault(import('..\\pages\\tradein.vue' /* webpackChunkName: "pages_tradein" */))
const _35f9ce01 = () => interopDefault(import('..\\pages\\wholesale.vue' /* webpackChunkName: "pages_wholesale" */))
const _66683c8e = () => interopDefault(import('..\\pages\\order\\failed.vue' /* webpackChunkName: "pages_order_failed" */))
const _08b86402 = () => interopDefault(import('..\\pages\\order\\success.vue' /* webpackChunkName: "pages_order_success" */))
const _0ccd70c3 = () => interopDefault(import('..\\pages\\register\\success.vue' /* webpackChunkName: "pages_register_success" */))
const _e9b51f56 = () => interopDefault(import('..\\pages\\restore\\form.vue' /* webpackChunkName: "pages_restore_form" */))
const _967c04e2 = () => interopDefault(import('..\\pages\\category\\_slug.vue' /* webpackChunkName: "pages_category__slug" */))
const _6ede9c48 = () => interopDefault(import('..\\pages\\product\\_slug.vue' /* webpackChunkName: "pages_product__slug" */))
const _c3bb2856 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/account",
    component: _7c900e20,
    name: "account"
  }, {
    path: "/auth",
    component: _d4784d16,
    name: "auth"
  }, {
    path: "/cart",
    component: _40c8faed,
    name: "cart"
  }, {
    path: "/category",
    component: _930ec252,
    name: "category"
  }, {
    path: "/configurator",
    component: _14584382,
    name: "configurator"
  }, {
    path: "/product",
    component: _70953d90,
    name: "product"
  }, {
    path: "/results",
    component: _6f1f9e39,
    name: "results"
  }, {
    path: "/stocks",
    component: _25012c2a,
    name: "stocks"
  }, {
    path: "/tradein",
    component: _2888964c,
    name: "tradein"
  }, {
    path: "/wholesale",
    component: _35f9ce01,
    name: "wholesale"
  }, {
    path: "/order/failed",
    component: _66683c8e,
    name: "order-failed"
  }, {
    path: "/order/success",
    component: _08b86402,
    name: "order-success"
  }, {
    path: "/register/success",
    component: _0ccd70c3,
    name: "register-success"
  }, {
    path: "/restore/form",
    component: _e9b51f56,
    name: "restore-form"
  }, {
    path: "/category/:slug",
    component: _967c04e2,
    name: "category-slug"
  }, {
    path: "/product/:slug",
    component: _6ede9c48,
    name: "product-slug"
  }, {
    path: "/",
    component: _c3bb2856,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
