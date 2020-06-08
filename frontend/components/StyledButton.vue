<template>
  <button
    class="btn"
    :class="{
      'btn-green': isGreen,
      'btn-pink': isPink,
      'btn-normal': isNormal,
      'btn-inverted': isInverted,
      'btn-full': isFull,
      'btn-disabled': disabled,
      'btn-github': github,
    }"
    :disabled="isDisabled"
    :style="styles"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Form extends Vue {
  @Prop({ type: Boolean, default: false }) readonly green!: boolean;
  @Prop({ type: Boolean, default: false }) readonly pink!: boolean;
  @Prop({ type: Boolean, default: false }) readonly normal!: boolean;
  @Prop({ type: Boolean, default: false }) readonly inverted!: boolean;
  @Prop({ type: Boolean, default: false }) readonly full!: boolean;
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;
  @Prop({ type: Boolean, default: false }) readonly github!: boolean;
  @Prop({ type: Function, default: () => undefined }) readonly onClick!: any;
  @Prop({ type: Object, default: {} }) readonly styles!: any;

  isGreen = this.green;
  isPink = this.pink;
  isNormal = this.normal;
  isInverted = this.inverted;
  isFull = this.full;
  isDisabled = this.disabled;
  isGithub = this.github;
}
</script>

<style lang="postcss">
.btn {
  @apply font-bold py-2 px-4 rounded border transition-all duration-100;
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
