<template>
  <div class="timeline relative flex items-center justify-center z-10 w-full">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="postcss" scoped>
.timeline:before {
  content: '';
  position: absolute;
  left: 0;
  background-color: blue;
  height: 30px;
  width: calc(100% - 12px);
  z-index: -1;
  @apply bg-gray-400;
}
</style>
