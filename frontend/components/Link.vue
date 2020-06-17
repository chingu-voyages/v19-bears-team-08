<template>
  <li v-if="showLink" class="w-full flex mb-0">
    <nuxt-link
      :to="link.to"
      class="w-full h-full text-sm sm:text-base p-2 sm:p-3 text-center text-gray-800 hover:text-pink"
      exactActiveClass="text-pink"
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

@Component({})
export default class Link extends Vue {
  @Prop() readonly link!: LinkTypes;

  get showLink(): boolean {
    return (
      this.link.authRequired === null ||
      !!this.link.authRequired === this.$auth.loggedIn
    );
  }
}
</script>

<style></style>
