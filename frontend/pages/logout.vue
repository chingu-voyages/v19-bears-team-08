<template>
  <div>
    <h2>Logging out...</h2>
    <p>You will be redirected soon.</p>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    setTimeout(async () => {
      await this.$auth.logout();
      this.$toast.success('Successfully logged out');
    }, 2000);
  },
};
</script>
