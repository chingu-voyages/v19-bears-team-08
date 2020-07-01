<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <a :href="`mailto:${email}`">
        <StyledButton green normal>
          Contact Us
        </StyledButton>
      </a>
    </StyledHero>
  </div>
</template>

<script>
import StyledHero from '~/components/StyledHero.vue';
import StyledButton from '~/components/StyledButton.vue';

export default {
  name: 'SignupThanks',
  components: {
    StyledHero,
    StyledButton,
  },
  asyncData(ctx) {
    return {
      email: ctx.env.EMAIL,
    };
  },
  data() {
    return {
      email: '',
      hero: {
        header: 'Welcome to Chingu',
        subText: `
          Thanks for creating an account at Chingu.
          Please check your inbox and verify the email that you signed up with to activate your account.
          If you haven't received an email within 10 minutes, check your spam folder or contact us.
        `,
        imgSrc: '/page/signupthanks/WIP.svg',
        imgAlt: 'work in progress',
      },
    };
  },
  head() {
    return {
      title: 'Welcome | Chingu',
    };
  },
};
</script>
