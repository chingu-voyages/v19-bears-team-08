<template>
  <span
    class="styled-skeleton relative overflow-hidden bg-gray-300 block"
    :class="className"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class StyledSkeleton extends Vue {
  @Prop({ type: String, required: false, default: '' }) className!: string;
}
</script>

<style lang="postcss">
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.styled-skeleton:after {
  content: '';
  @apply absolute inset-0;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 2s infinite;
}
</style>
