<template>
  <div
    class="flex justify-center items-center rounded-full h-10 w-10 bg-green transform transition-transform duration-150"
    :class="{ 'bg-pink': isActive }"
  >
    <div v-if="hasContent" class="absolute text-white font-bold">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component({ name: 'StyledCircleContainer' })
export default class StyledCircleContainer extends Vue {
  @Prop({ type: Boolean }) readonly isActive!: boolean;
  @Prop({ type: Boolean }) readonly hasContent!: boolean;
}
</script>
