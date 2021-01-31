<template>
  <div>
    <StyledHeader level="h1" text="Please Wait" />

    <StyledLoader text="Fetching your Chingu profile..." />
  </div>
</template>

<script>
export default {
  name: 'GitHubRedirect',
  head() {
    return {
      title: 'Please wait... | Chingu',
    };
  },
};
</script>
