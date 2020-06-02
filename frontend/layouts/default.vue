<template>
  <div>
    <div class="app-background app-background-left" />
    <div class="app-background app-background-right" />
    <div
      class="min-h-screen max-h-screen max-w-screen-lg mx-auto overflow-hidden bg-gray-200 flex flex-row"
    >
      <div
        class="fixed z-20 top-0 w-full h-12 flex justify-between px-2 items-center bg-gray-300 md:hidden"
      >
        <nuxt-link to="/">
          <img src="/Logo.png" alt="Chingu logo" class="w-10" />
        </nuxt-link>
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
        class="w-full overflow-y-auto overflow-x-hidden mt-12 md:mt-0 px-2 sm:px-3 md:px-6 py-3 md:py-5 flex flex-col items-center md:items-start md:bg-gray-200 md:opacity-100 transition-all duration-100"
        :class="{ 'opacity-25': isOpen }"
      >
        <nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import Links from '~/components/Links.vue';

@Component({
  components: {
    Links,
  },
})
export default class Default extends Vue {
  isOpen = false;

  setIsOpen(bool: boolean) {
    this.isOpen = bool;
  }

  onResize() {
    this.isOpen = window.innerWidth > 767;
  }

  @Watch('$nuxt.$route.fullPath')
  onRouteChange() {
    this.isOpen = false;
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

.app-background {
  width: 50%;
  height: 100vh;
  position: absolute;
  z-index: -1;
}
.app-background-left {
  @apply bg-gray-300 left-0;
}
.app-background-right {
  @apply bg-gray-200 right-0;
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
