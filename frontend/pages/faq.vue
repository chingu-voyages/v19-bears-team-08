<template>
  <div>
    <StyledHeader level="h1" text="Frequently Asked Questions" />
    <nuxt-content :document="faqs" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const faqs = await $content('pages/faq').fetch();
    return { faqs };
  },
  data() {
    return {
      faqs: '',
    };
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
  @apply px-2 mb-2;
}
a {
  @apply text-pink;
}
</style>
