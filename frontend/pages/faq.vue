<template>
  <div>
    <StyledHeader level="h1">Frequently Asked Questions</StyledHeader>
    <nuxt-content :document="faqs" />
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';

export default {
  components: {
    StyledHeader,
  },
  async asyncData({ $content }) {
    const faqs = await $content('pages/faq').fetch();
    return { faqs };
  },
  head() {
    return {
      title: 'FAQ | Chingu',
    };
  },
};
</script>

<style lang="postcss" scoped>
h3 {
  @apply text-center mt-10;
}
h3:first-child {
  @apply mt-0;
}
@screen md {
  h3 {
    @apply text-left;
  }
}
p {
  @apply mb-6 px-2;
}
a {
  @apply text-pink;
}
</style>
