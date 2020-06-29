<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="message"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <div class="flex">
        <nuxt-link to="/" class="my-0">
          <StyledButton green normal>Go Home</StyledButton>
        </nuxt-link>

        <StyledButton pink inverted :onClick="goBack" class="my-0 ml-3">
          Go Back
        </StyledButton>
      </div>
    </StyledHero>
  </div>
</template>

<script>
import StyledHero from '~/components/StyledHero.vue';
import StyledButton from '~/components/StyledButton.vue';

export default {
  name: 'ErrorPage',
  components: {
    StyledHero,
    StyledButton,
  },
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
