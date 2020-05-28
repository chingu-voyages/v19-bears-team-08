<template>
  <div class="max-w-2xl">
    <h2 class="mb-4">
      Frequently Asked Questions
    </h2>
    <nuxt-content :document="faqs" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const faqs = await $content('pages/faq').fetch();
    return { faqs };
  },
};
</script>

<style lang="postcss" scoped>
h4 {
  @apply mb-3;
}
p {
  @apply mb-6 px-2;
}
a {
  @apply text-pink;
}
</style>
