<template>
  <div>
    <StyledHeader level="h1">
      Profile
    </StyledHeader>

    <h4>Want to connect your GitHub?</h4>
    <StyledInput
      required
      type="text"
      :minLength="3"
      placeholder="Enter your GitHub username"
      name="githubUsername"
      label="GitHub Username"
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
import StyledHeader from '~/components/StyledHeader.vue';
import StyledButton from '~/components/StyledButton.vue';
import StyledInput from '~/components/StyledInput.vue';

@Component({
  components: {
    StyledHeader,
    StyledButton,
    StyledInput,
  },
  middleware: ['auth'],
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
