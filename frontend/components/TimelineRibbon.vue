<template>
  <div class="flex" :style="{ width, height: '80px' }">
    <!-- LEFT ARROW -->
    <div>
      <svg
        width="12"
        height="80"
        viewBox="0 0 12 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H12V39.5181V80H0L12 39.5181L0 0Z" :fill="color" />
        <path d="M0 0H12V39.5181V80H0L12 39.5181L0 0Z" :fill="color" />
      </svg>
    </div>
    <!-- MIDDLE -->
    <div
      :style="{ backgroundColor: color }"
      class="flex justify-center items-center w-full text-center text-xs sm:text-sm md:text-base"
    >
      {{ text }}
    </div>

    <!-- RIGHT ARROW -->
    <div>
      <svg
        width="12"
        height="80"
        viewBox="0 0 12 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L12 39.5181L0 80V39.5181V0Z" :fill="color" />
        <path d="M0 0L12 39.5181L0 80V39.5181V0Z" :fill="color" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

@Component
export default class TimelineRibbon extends Vue {
  @Prop({ type: String, default: '300' }) readonly width!: string;
  @Prop({ type: String, default: '#fff' }) readonly color!: string;
  @Prop({ type: String, default: 'Text Here' }) readonly text!: string;
}
</script>

<style></style>
