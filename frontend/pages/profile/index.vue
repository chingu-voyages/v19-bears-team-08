<template>
  <div>
    <StyledHeader level="h1" text="Your Profile" />

    <p class="mb-6 text-center md:text-left max-w-md md:max-w-none">
      View and manage your profile details below.
    </p>

    <!-- MEMBERSHIP STATUS -->
    <div class="flex items-center">
      <StyledCircleContainer hasContent :isActive="!isActiveMember">
        <fa :icon="isActiveMember ? 'user-check' : 'user-plus'" />
      </StyledCircleContainer>
      <div class="ml-2">
        <div v-if="isActiveMember">
          Your membership ends:
          <p class="text-center text-sm">
            {{ new Date().toDateString() }}
          </p>
        </div>
        <nuxt-link v-else to="/payment">Upgrade your membership now!</nuxt-link>
      </div>
    </div>

    <ProfileSection header="Account Information" />
    <ProfileSection header="Voyage Preferences" />
    <ProfileSection header="Voyage History" />
    <ProfileSection header="Testimonials" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { UserType } from 'types/user';

@Component({
  name: 'Profile',
  middleware: 'auth',
  head() {
    return {
      title: 'Profile | Chingu',
    };
  },
})
export default class Profile extends Vue {
  get isGithubAuth(): boolean {
    return this.$auth.strategy.name === 'github';
  }

  get user(): UserType {
    return this.$auth.user;
  }

  get isActiveMember(): boolean {
    return this.$auth.user.local.isActiveMember;
  }
}
</script>

<style></style>
