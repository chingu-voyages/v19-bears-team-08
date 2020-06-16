<template>
  <div>
    <StyledHeader level="h1">
      Welcome to Chingu
    </StyledHeader>

    <p>
      We could have a notifications board, pull Chingu tweets, links to external
      source, etc.. here
    </p>
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
      title: 'Home | Chingu',
    };
  },
};
</script>

<style></style>
