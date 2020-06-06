<template>
  <div>
    <h2 class="mb-2">Profile</h2>
    <p>{{ this.$auth.user.name }}</p>
    <p>{{ this.$auth.user.email }}</p>
    <p>{{ this.$auth.user.creationDate }}</p>
    <p>{{ JSON.stringify(this.$auth.user.roles) }}</p>
    <p>{{ JSON.stringify(this.$auth.user.activeMember) }}</p>
    <p>This would be the profile page</p>
    <p>We can slowly add things as the voyage progresses</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import StyledButton from '~/components/StyledButton.vue';

@Component({
  components: { StyledButton },
  middleware: ['auth'],
})
export default class Profile extends Vue {}
</script>

<style></style>
