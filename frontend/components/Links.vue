<template>
  <div class="flex-auto flex flex-col justify-between">
    <!-- Other Links -->
    <ul class="mt-3">
      <Link v-for="link in links.other" :key="link.to" :link="link" />
    </ul>

    <!-- Auth Links -->
    <ul>
      <Link v-for="link in links.auth" :key="link.to" :link="link" />
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Link from '~/components/Link.vue'

@Component({
  components: {
    Link,
  },
})
export default class Links extends Vue {
  links = {
    auth: [
      { to: '/login', text: 'Log In', authRequired: false },
      { to: '/signup', text: 'Sign Up', authRequired: false },
      { to: '/logout', text: 'Log Out', authRequired: true },
    ],
    other: [
      { to: '/', text: 'Home', authRequired: false },
      { to: '/profile', text: 'Profile', authRequired: false },
    ],
  }
}
</script>

<style></style>
