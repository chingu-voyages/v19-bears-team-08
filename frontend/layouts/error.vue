<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="message"
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
        subText: this.message,
        imgSrc: '/page/error/BlankCanvas.svg',
        imgAlt: 'blank canvas',
      },
    };
  },
  computed: {
    statusCode() {
      console.log(this.error);
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
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
      title: this.message,
    };
  },
};
</script>
