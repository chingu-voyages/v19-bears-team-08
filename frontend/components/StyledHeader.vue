<template>
  <component :is="level" class="header relative pl-3 pr-2 mx-auto">
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class StyledHeader extends Vue {
  @Prop() readonly level!: number;
}
</script>

<style lang="postcss" scoped>
@screen md {
  .header {
    margin-left: -0.75rem !important;
  }
}
.header:before {
  content: '';
  height: 2ch;
  @apply absolute top-0 left-0 w-1 bg-pink opacity-50;
}
.header:after {
  content: '';
  width: 2ch;
  @apply absolute top-0 left-0 h-1 bg-green opacity-50;
}
</style>
