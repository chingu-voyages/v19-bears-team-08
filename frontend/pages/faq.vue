<template>
  <div class="faq-page">
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

<style lang="postcss">
.faq-page h3 {
  @apply text-center mt-10;
}
.faq-page h3:first-child {
  @apply mt-0;
}
@screen md {
  .faq-page h3 {
    @apply text-left;
  }
}
.faq-page p {
  @apply px-2 mb-2;
}
.faq-page a {
  @apply text-pink;
}
</style>
