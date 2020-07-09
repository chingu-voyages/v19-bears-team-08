<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <StyledButtonGroup>
        <nuxt-link to="/">
          <StyledButton green normal>Go Home</StyledButton>
        </nuxt-link>

        <StyledButton pink inverted :onClick="goBack">
          Go Back
        </StyledButton>
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      hero: {
        header: "We're Sorry",
        subText: `
          We've experienced an error. If you continue to experience this issue, please inform us.
        `,
        imgSrc: '/page/error/BlankCanvas.svg',
        imgAlt: 'blank canvas',
      },
    };
  },
  computed: {
    message() {
      console.error(this.error.message);
      return this.error.message || '<%= messages.client_error %>';
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  head() {
    return {
      title: 'Error | Chingu',
    };
  },
};
</script>
