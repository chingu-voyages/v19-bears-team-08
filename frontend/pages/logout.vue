<template>
  <div>
    <StyledHeader level="h1" text="Logging out..." />

    <StyledLoader text="Please wait..." />
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';
import StyledLoader from '~/components/StyledLoader.vue';

export default {
  name: 'Logout',
  components: {
    StyledHeader,
    StyledLoader,
  },
  mounted() {
    this.$auth.logout().then(() => {
      this.$toast.success('Successfully logged out');
      this.$router.push('/');
    });
  },
  head() {
    return {
      title: 'Logout | Chingu',
    };
  },
};
</script>
