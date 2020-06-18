<template>
  <div>
    <StyledHeader level="h1">
      Project Showcase
    </StyledHeader>

    <p>This would be the showcase page</p>
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
      title: 'Project Showcase | Chingu',
    };
  },
};
</script>

<style></style>
