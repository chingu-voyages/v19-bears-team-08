<template>
  <div>
    <StyledHeader level="h1" text="Project Showcase" />

    <p>
      If you want to work on this page, please visit the GitHub issue
      <a
        class="text-pink"
        target="_blank"
        href="https://github.com/chingu-voyages/v19-bears-team-08/issues/22"
      >
        here.
      </a>
    </p>
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';

export default {
  components: {
    StyledHeader,
  },
  head() {
    return {
      title: 'Project Showcase | Chingu',
    };
  },
};
</script>

<style></style>
