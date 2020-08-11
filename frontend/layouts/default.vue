<template>
  <div class="layout-container">
    <nav
      class="fixed md:relative lg:fixed z-20 top-0 w-full md:w-64 lg:w-full h-16 md:h-24 lg:h-16 px-4 bg-gray-300"
    >
      <div
        class="flex justify-between items-center max-w-screen-lg m-auto py-2 md:py-3 lg:py-2"
      >
        <!-- Chingu logo link here -->
        <nuxt-link
          to="/"
          class="h-auto w-12 md:w-20 lg:w-12 m-0 md:mx-auto lg:m-0"
        >
          <img src="/Logo.png" alt="Chingu logo" />
        </nuxt-link>

        <!-- Large screen size links and button/dropdown -->
        <div class="hidden lg:flex items-end">
          <!-- Links for screen sizes >= lg -->
          <ul class="flex mr-2">
            <LayoutLink
              v-for="link in links.main"
              :key="link.to"
              :link="link"
            />
          </ul>

          <LayoutAuthDropdown :icon="isMounted ? 'user' : 'spinner'">
            <LayoutLink v-for="link in authLinks" :key="link.to" :link="link" />
          </LayoutAuthDropdown>
        </div>

        <!-- Button for screen sizes < lg -->
        <LayoutMenuButton :isOpen="isOpen" :setIsOpen="setIsOpen" />
      </div>
    </nav>

    <!-- Sidebar for screen sizes < lg -->
    <aside
      class="absolute md:fixed lg:hidden top-0 flex flex-col w-64 bg-gray-300 pt-20 md:pt-24 py-4 md:py-3 z-10 transform md:translate-x-0 transition-transform duration-150"
      :class="{
        'translate-x-0': isOpen,
        '-translate-x-full shadow-none': !isOpen,
      }"
    >
      <div class="flex-auto flex flex-col justify-between">
        <!-- Top Links -->
        <ul>
          <LayoutLink v-for="link in links.main" :key="link.to" :link="link" />
        </ul>

        <!-- Bottom Links -->
        <ul v-if="isMounted">
          <LayoutLink v-for="link in authLinks" :key="link.to" :link="link" />
        </ul>
        <div v-else class="py-3 mx-auto">
          <StyledLoader />
        </div>
      </div>
    </aside>

    <!-- Nuxt Page Content -->
    <main
      class="md:absolute top-0 w-full h-screen overflow-y-auto overflow-x-hidden flex flex-col items-center md:items-start lg:items-center bg-gray-200 md:opacity-100 transition-all duration-100"
      :class="{ 'opacity-25': isOpen }"
    >
      <div class="page-container">
        <nuxt />
      </div>
    </main>
  </div>
</template>

<script>
import { links } from '~/utils';

export default {
  name: 'Layout',
  data() {
    return {
      links,
      isMounted: false,
      isOpen: false,
    };
  },
  computed: {
    authLinks() {
      return this.$auth.loggedIn ? links.restricted : links.auth;
    },
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.onResize();
      window.addEventListener('resize', this.onResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    setIsOpen(boolean) {
      this.isOpen = boolean;
    },
    onResize() {
      const isMedium = window.innerWidth > 767 && window.innerWidth < 1025;
      this.isOpen = isMedium;
    },
    onRouteChange() {
      this.isOpen = false;
    },
  },
};
</script>

<style lang="postcss">
* > :first-child {
  margin-top: 0;
}
* > :last-child {
  margin-bottom: 0;
}

nav {
  box-shadow: 1px 0 5px 1px #d1d4d8;
}
@screen md {
  nav {
    @apply shadow-none;
  }
}
@screen lg {
  nav {
    box-shadow: 1px 0 5px 1px #d1d4d8;
  }
}

aside {
  @apply h-screen;
}
@screen md {
  aside {
    @apply fixed pt-24;
  }
}
@screen lg {
  aside {
    @apply hidden;
  }
}

main {
  @apply pt-24 pb-5 px-2;
}
@screen sm {
  main {
    @apply px-4;
  }
}
@screen md {
  main {
    padding-left: 18.5rem;
    @apply py-6;
  }
}
@screen lg {
  main {
    @apply pt-24 pb-8 px-10;
  }
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
@screen lg {
  .page-container > div {
    @apply items-center;
  }
}
</style>
