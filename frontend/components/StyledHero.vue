<template>
  <div class="my-6 md:my-8 flex flex-col-reverse md:flex-row items-center">
    <div
      class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
    >
      <StyledHeader level="h1">{{ header }}</StyledHeader>

      <p class="mb-6 text-center md:text-left max-w-md md:max-w-none">
        {{ subText }}
      </p>

      <div
        class="flex justify-center md:justify-start w-full max-w-md md:max-w-none"
      >
        <slot />
      </div>
    </div>

    <img
      :src="imgSrc"
      :alt="imgAlt"
      class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-6"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import StyledHeader from '~/components/StyledHeader.vue';

@Component({
  name: 'StyledHero',
  components: {
    StyledHeader,
  },
})
export default class StyledHero extends Vue {
  @Prop({ type: String, required: true }) readonly header!: string;
  @Prop({ type: String, required: true }) readonly subText!: string;
  @Prop({ type: String, required: true }) readonly imgSrc!: string;
  @Prop({ type: String, required: true }) readonly imgAlt!: string;
}
</script>

<style lang="postcss" scoped>
img {
  margin-bottom: 1.5rem !important;
}
@screen md {
  img {
    margin-bottom: 0 !important;
  }
}
</style>
