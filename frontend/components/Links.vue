<template>
  <div class="flex-auto flex flex-col justify-between">
    <!-- Top Links -->
    <ul class="mt-3">
      <Link v-for="link in links.top" :key="link.to" :link="link" />
    </ul>

    <!-- Bottom Links -->
    <ul>
      <Link v-for="link in links.bottom" :key="link.to" :link="link" />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Link from '~/components/Link.vue';

@Component({
  components: {
    Link,
  },
})
export default class Links extends Vue {
  links = {
    top: [
      { to: '/', text: 'Home', authRequired: false },
      { to: '/about', text: 'About', authRequired: false },
      { to: '/faq', text: 'FAQ', authRequired: false },
      { to: '/pricing', text: 'Pricing', authRequired: false },
      { to: '/schedule', text: 'Schedule', authRequired: false },
      { to: '/howitworks', text: 'How It Works', authRequired: false },
      { to: '/showcase', text: 'Showcase', authRequired: false },
    ],
    bottom: [
      { to: '/login', text: 'Log In', authRequired: false },
      { to: '/signup', text: 'Sign Up', authRequired: false },
      { to: '/profile', text: 'Profile', authRequired: true },
      { to: '/settings', text: 'Settings', authRequired: true },
      { to: '/logout', text: 'Log Out', authRequired: true },
    ],
  };
}
</script>

<style></style>
