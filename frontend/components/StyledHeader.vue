<template>
  <component
    :is="['h1', 'h2', 'h3', 'h4', 'h5', 'h6'][level - 1]"
    class="font-light leading-tight"
    :class="[
      ...(size <= 1 ? ['text-1xl'] : []),
      ...(size === 2 ? ['text-2xl'] : []),
      ...(size === 3 ? ['text-3xl'] : []),
      ...(size === 4 ? ['text-4xl'] : []),
    ]"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class StyledHeader extends Vue {
  @Prop() readonly level!: number;
  @Prop() readonly size!: number;
}
</script>

<style></style>
