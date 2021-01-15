<template>
  <component
    :is="type"
    class="btn"
    :class="{
      'btn-green': green,
      'btn-pink': pink,
      'btn-normal': normal,
      'btn-inverted': inverted,
      'btn-full': full,
      'btn-disabled': disabled,
      'btn-github': github,
    }"
    :disabled="disabled"
    :to="to"
    :href="href"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class StyledButton extends Vue {
  // STYLING
  @Prop({ type: Boolean, default: false }) readonly green!: boolean;
  @Prop({ type: Boolean, default: false }) readonly pink!: boolean;
  @Prop({ type: Boolean, default: false }) readonly normal!: boolean;
  @Prop({ type: Boolean, default: false }) readonly inverted!: boolean;
  @Prop({ type: Boolean, default: false }) readonly full!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly github!: boolean;

  // FUNCTIONALITY
  @Prop({ type: String, required: false }) readonly to!: string;
  @Prop({ type: String, required: false }) readonly href!: string;
  @Prop({ type: Function, default: () => undefined }) readonly onClick!: any;

  get type(): string {
    if (this.href) return 'a';
    if (this.to) return 'nuxt-link';
    return 'button';
  }
}
</script>

<style lang="postcss">
.btn {
  @apply font-bold py-2 px-4 rounded border transition-all duration-100;
}
.btn:hover {
  @apply no-underline;
}
.btn-normal {
  @apply text-white;
}
.btn-inverted {
  @apply bg-transparent;
}
.btn-full {
  @apply w-full;
}
.btn-disabled,
.btn-disabled:hover {
  @apply cursor-not-allowed;
  opacity: 0.5 !important;
}

.btn-green.btn-normal {
  @apply bg-green border-green;
}
.btn-green.btn-normal:hover {
  @apply bg-green opacity-75;
}
.btn-green.btn-inverted {
  @apply text-green border-green;
}
.btn-green.btn-inverted:hover {
  @apply bg-green text-white border-transparent;
}

.btn-pink.btn-normal {
  @apply bg-pink border-pink;
}
.btn-pink.btn-normal:hover {
  @apply bg-pink opacity-75;
}
.btn-pink.btn-inverted {
  @apply text-pink border-pink;
}
.btn-pink.btn-inverted:hover {
  @apply bg-pink text-white border-transparent;
}

.btn-github {
  background-color: #24292e;
  border-color: #24292e;
  color: white;
}
.btn-github:hover {
  @apply opacity-75;
}
</style>
