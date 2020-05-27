<template>
  <div
    class="min-h-screen max-h-screen overflow-hidden bg-gray-200 flex flex-row"
  >
    <div
      class="fixed z-20 top-0 w-full h-12 flex justify-between px-2 items-center bg-gray-300 md:hidden"
    >
      <div
        class="flex justify-center items-center h-10 w-10 rounded-full bg-gray-300 hover:bg-gray-200"
      >
        <fa
          v-if="isOpen"
          icon="times"
          class="md:hidden text-xl"
          @click="setIsOpen(false)"
        />
        <fa
          v-else
          icon="bars"
          class="md:hidden text-xl"
          @click="setIsOpen(true)"
        />
      </div>
      <nuxt-link to="/">
        <img src="/Logo.png" alt="Chingu logo" class="w-10" />
      </nuxt-link>
    </div>
    <nav
      class="absolute md:static flex flex-col h-full md:h-auto w-64 bg-gray-300 pt-10 md:mt-0 md:py-3 z-10 transition-transform duration-150 transform md:translate-x-0"
      :class="{
        'translate-x-0': isOpen,
        '-translate-x-full': !isOpen,
      }"
    >
      <nuxt-link class="flex flex-col items-center" to="/">
        <img src="/Logo.png" alt="Chingu logo" class="w-20 hidden md:block" />
      </nuxt-link>

      <Links />
    </nav>

    <main
      class="w-full overflow-y-auto overflow-x-hidden mt-12 md:mt-0 px-3 md:px-6 py-3 md:py-5 transition-all duration-100"
      :class="{
        'bg-gray-700 opacity-25': isOpen,
      }"
    >
      <nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Links from '~/components/Links.vue';

@Component({
  components: {
    Links,
  },
})
export default class DefaultLayout extends Vue {
  isOpen = false;

  setIsOpen(bool: boolean) {
    this.isOpen = bool;
  }

  onResize() {
    this.isOpen = window.innerHeight > 767;
  }

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  }
}
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
