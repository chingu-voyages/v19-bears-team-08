<template>
  <li v-if="!link.authRequired" class="w-full flex">
    <nuxt-link
      :to="link.to"
      class="w-full h-full p-3 text-center hover:bg-gray-200"
      exactActiveClass="bg-gray-200"
    >
      {{ link.text }}
    </nuxt-link>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type LinkTypes = {
  to: string;
  text: string;
  authRequired: boolean;
};

@Component
export default class Link extends Vue {
  @Prop() readonly link!: LinkTypes;
}
</script>

<style></style>
