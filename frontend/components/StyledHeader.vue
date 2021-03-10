<template>
  <component
    :is="level"
    class="header pr-2 text-center md:text-left"
    :class="className"
  >
    <span v-for="sText in splitText" :key="sText">
      {{ sText }}
    </span>
  </component>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class StyledHeader extends Vue {
  @Prop({ type: String, required: true }) readonly level!: string;
  @Prop({ type: String, required: true }) readonly text!: string;
  @Prop(String) readonly className!: string;

  public get splitText() {
    return this.text.split(' ');
  }
}
</script>

<style lang="postcss" scoped>
@screen md {
  .header {
    margin-left: -0.75rem !important;
  }
}
.header span {
  margin-right: -0.25rem !important;
  @apply inline-block pl-3;
}
.header span:first-child {
  @apply relative pl-3;
}
.header span:first-child:before {
  content: '';
  height: 2ch;
  @apply absolute top-0 left-0 w-1 bg-pink opacity-50;
}
.header span:first-child:after {
  content: '';
  width: 2ch;
  @apply absolute top-0 left-0 h-1 bg-green opacity-50;
}
</style>
