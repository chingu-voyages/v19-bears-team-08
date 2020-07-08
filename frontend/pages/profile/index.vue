<template>
  <div>
    <StyledHeader level="h1" text="Profile" />

    <h4>Want to connect your GitHub?</h4>
    <StyledInput
      required
      showInlineButton
      label="GitHub Username"
      name="githubUsername"
      type="text"
      :minLength="3"
      placeholder="Enter your GitHub username"
    />
    <div v-if="this.$auth.strategy.name === 'github'">
      <p>{{ this.$auth.user.github.user.name }}</p>
      <p>{{ this.$auth.user.email }}</p>
    </div>

    <div v-else>
      <p>{{ this.$auth.user.email }}</p>
      <p>{{ this.$auth.user.creationDate }}</p>
      <p>{{ JSON.stringify(this.$auth.user.roles) }}</p>
      <p>{{ JSON.stringify(this.$auth.user.activeMember) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  middleware: 'auth',
  head() {
    return {
      title: 'Your Profile | Chingu',
    };
  },
})
export default class Profile extends Vue {
  get user() {
    console.log(this.$auth.strategy.name);
    return this.$auth.strategy;
  }
}
</script>

<style></style>
