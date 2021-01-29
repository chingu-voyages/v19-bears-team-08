<template>
  <div
    class="flex flex-col md:flex-row-reverse items-center md:items-start md:justify-between w-full my-6 md:my-8"
  >
    <img
      :src="imgSrc"
      :alt="imgAlt"
      class="h-56 sm:h-64 md:h-auto w-auto sm:w-1/2 md:w-2/5 ml-0 mb-6 md:mb-0 md:pl-1"
    />

    <div
      class="flex flex-col items-center md:items-start self-start w-full md:w-7/12 px-2 md:px-0"
    >
      <StyledHeader level="h1" :text="header" />

      <p
        v-for="(text, index) in bodyText"
        :key="text + index"
        class="text-center md:text-left max-w-md md:max-w-none"
        :class="index === bodyText.length - 1 ? 'mb-6' : 'mb-1'"
      >
        {{ text }}
      </p>

      <div
        class="flex justify-center md:justify-start w-full max-w-md md:max-w-none"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class StyledHero extends Vue {
  @Prop({ type: String, required: true }) readonly header!: string;
  @Prop({ type: String, required: true }) readonly subText!: string;
  @Prop({ type: String, required: true }) readonly imgSrc!: string;
  @Prop({ type: String, required: true }) readonly imgAlt!: string;
  @Prop({ type: Boolean, default: false }) readonly splitBody!: boolean;

  get bodyText(): string[] {
    if (!this.splitBody) return [this.subText];
    const re = /[^.!?>]+[.!?>]+/g;
    return this.subText.match(re) || [this.subText];
  }
}
</script>
