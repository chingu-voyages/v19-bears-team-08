<template>
  <div>
    <div class="app-background app-background-left" />
    <div
      class="app-container min-h-screen max-h-screen ml-auto overflow-hidden bg-gray-200 flex flex-row"
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

      <!-- Sidebar -->
      <nav
        class="absolute md:static flex flex-col h-full md:h-auto w-64 bg-gray-300 pt-10 md:mt-0 md:py-3 z-10 transition-transform duration-150 transform md:translate-x-0"
        :class="{
          'translate-x-0': isOpen,
          '-translate-x-full': !isOpen,
        }"
      >
        <nuxt-link class="flex flex-col items-center" to="/">
          <img
            src="/Logo.png"
            alt="Chingu logo"
            class="w-20 h-20 hidden md:block"
          />
        </nuxt-link>

        <Links />
      </nav>

      <!-- Page Content -->
      <main
        class="w-full overflow-y-auto overflow-x-hidden mt-12 md:mt-0 px-2 sm:px-3 md:px-10 py-3 md:py-6 flex flex-col items-center md:items-start md:bg-gray-200 md:opacity-100 transition-all duration-100"
        :class="{ 'opacity-25': isOpen }"
      >
        <div class="page-container">
          <nuxt />
        </div>
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
      this.onResize();
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
.app-container {
  max-width: calc(100vw - ((100vw - 1024px) / 2));
  @apply w-full;
}
.page-container {
  @apply max-w-screen-md w-full;
}
.page-container > div {
  @apply flex flex-col items-center w-full;
}
@screen md {
  .page-container > div {
    @apply items-start;
  }
}

nav {
  box-shadow: 1px 0 5px 1px #d1d4d8;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-light;
}
h1 {
  @apply text-4xl mb-4 text-gray-900;
}
h2 {
  @apply text-3xl mb-3 text-gray-900;
}
h3 {
  @apply text-2xl mb-2 text-gray-800;
}
h4 {
  @apply text-xl mb-2 text-gray-800;
}
h5 {
  @apply text-lg mb-1 text-gray-700;
}
h6 {
  @apply text-base mb-1 text-gray-700;
}
@media md {
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
}
p,
li,
a,
div {
  @apply text-gray-600 font-normal leading-relaxed mb-1;
}
div {
  @apply mb-0;
}

* > :first-child {
  margin-top: 0;
}
* > :last-child {
  margin-bottom: 0;
}

.toasted-container .toasted.toasted-msg {
  justify-content: center;
  text-align: center;
  line-height: 1.3rem;
  padding: 5px 20px;
}
</style>
