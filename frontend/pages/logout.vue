<template>
  <div>
    <StyledHeader level="h1" text="Logging out..." />

    <StyledLoader text="Please wait..." />
  </div>
</template>

<script>
export default {
  name: 'Logout',
  head() {
    return {
      title: 'Logout | Chingu',
    };
  },
  mounted() {
    this.$auth.logout().then(() => {
      this.$toast.success('Successfully logged out');
      this.$router.push('/');
    });
  },
};
</script>
