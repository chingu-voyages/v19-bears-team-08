<template>
  <div
    class="min-h-screen max-h-screen overflow-hidden bg-gray-200 flex flex-row"
  >
    <nav class=" flex flex-col lg:w-64 bg-gray-300 py-3">
      <nuxt-link class="flex flex-col items-center" to="/">
        <img src="/Logo.png" alt="Chingu logo" class="w-20" />
      </nuxt-link>

      <Links />
    </nav>

    <main class="w-full overflow-y-auto overflow-x-hidden px-6 py-5">
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import Links from '~/components/Links.vue';

export default {
  components: {
    Links,
  },
};
</script>

<style lang="postcss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1 {
  @apply text-5xl;
}
h2 {
  @apply text-4xl;
}
h3 {
  @apply text-3xl;
}
h4 {
  @apply text-2xl;
}
h5 {
  @apply text-xl;
}
h6 {
  @apply text-lg;
}
p {
  @apply text-gray-800 leading-relaxed;
}
</style>
