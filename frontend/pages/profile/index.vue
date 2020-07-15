<template>
  <div>
    <StyledHeader level="h1" text="Your Profile" />
    <p class="mb-6 text-center md:text-left max-w-md md:max-w-none">
      View and manage your profile details below.
    </p>
    <p>{{ localUser.name }}</p>
    <p>{{ githubUser.name }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { LocalUser, GithubUser } from 'types/User';

@Component({
  name: 'YourProfile',
  middleware: 'auth',
  head() {
    return {
      title: 'Your Profile | Chingu',
    };
  },
})
export default class Profile extends Vue {
  get isGithubAuth(): boolean {
    return this.$auth.strategy.name === 'github';
  }

  get localUser(): LocalUser {
    return this.$auth.user.local;
  }

  get githubUser(): GithubUser {
    return this.$auth.user.github as GithubUser;
  }
}
</script>

<style></style>
