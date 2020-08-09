<template>
  <li class="w-full lg:w-auto flex mb-0">
    <nuxt-link
      :to="link.to"
      class="w-full h-full text-sm sm:text-base p-2 sm:p-3 text-center text-gray-800 hover:text-pink hover:no-underline"
      exactActiveClass="text-pink"
    >
      {{ link.text }}
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { LinkType } from '~/utils/links';

@Component
export default class LayoutLink extends Vue {
  @Prop() readonly link!: LinkType;
}
</script>
