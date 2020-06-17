<template>
  <div>
    <StyledHeader level="h1">Forgot Password</StyledHeader>

    <p>This would be the forgot password page</p>
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';

export default {
  components: {
    StyledHeader,
  },
  head() {
    return {
      title: 'Forgot Password | Chingu',
    };
  },
};
</script>

<style></style>
