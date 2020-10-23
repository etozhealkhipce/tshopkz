<template>
  <div :class="['modal', { 'is-active': isActive }]">
    <div class="modal-background"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss"></style>
