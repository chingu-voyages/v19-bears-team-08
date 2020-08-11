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
.nuxt-content {
  max-width: 600px;
}
.faq-page h3 {
  @apply mt-10;
}
.faq-page h3:first-child {
  @apply mt-0;
}
.faq-page p {
  @apply pt-3 pb-1 pl-3 pr-2 mb-0 border-pink;
  border-left-width: 2px;
}
.faq-page h3 + p {
  @apply pt-1;
}
.faq-page a {
  @apply text-pink;
}
</style>
