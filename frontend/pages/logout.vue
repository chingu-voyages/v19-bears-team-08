<template>
  <div>
    <StyledHeader level="h1" text="Logging out..." />

    <StyledLoader text="Please wait..." />
  </div>
</template>

<script>
export default {
  name: 'Logout',
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
