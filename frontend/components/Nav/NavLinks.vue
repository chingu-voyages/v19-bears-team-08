<template>
  <div class="flex-auto flex flex-col justify-between pt-3">
    <!-- Top Links -->
    <ul>
      <NavLink v-for="link in links.top" :key="link.to" :link="link" />
    </ul>

    <!-- Bottom Links -->
    <ul v-if="isMounted">
      <NavLink v-for="link in bottomLinks" :key="link.text" :link="link" />
    </ul>
    <div v-else class="py-3 mx-auto">
      <StyledLoader />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

type LinkTypes = {
  to: string;
  text: string;
  authRequired: boolean;
};

@Component
export default class Links extends Vue {
  isMounted = false;

  mounted() {
    this.isMounted = true;
  }

  links = {
    top: [
      { to: '/', text: 'Home', authRequired: null },
      { to: '/about', text: 'About', authRequired: null },
      { to: '/faq', text: 'FAQ', authRequired: null },
      { to: '/pricing', text: 'Pricing', authRequired: null },
      { to: '/schedule', text: 'Schedule', authRequired: null },
      { to: '/howitworks', text: 'How It Works', authRequired: null },
      { to: '/showcase', text: 'Showcase', authRequired: null },
    ],
    bottom: [
      { to: '/login', text: 'Log In', authRequired: false },
      { to: '/signup', text: 'Sign Up', authRequired: false },
      { to: '/profile', text: 'Profile', authRequired: true },
      { to: '/settings', text: 'Settings', authRequired: true },
      { to: '/logout', text: 'Log Out', authRequired: true },
    ],
  };

  public get bottomLinks(): LinkTypes[] {
    return this.links.bottom.filter(
      link => link.authRequired === this.$auth.loggedIn
    );
  }
}
</script>

<style></style>
