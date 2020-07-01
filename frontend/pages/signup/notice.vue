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
  name: 'UnverifiedAccount',
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
        header: 'Unverified Account',
        subText: `
          It looks like you still haven't verified your email, so your account isn't accessible yet.
          Please check your inbox for an email from us to activate your account.
          If you never received an email from us, check your spam folder or contact us.
        `,
        imgSrc: '/page/signupthanks/WIP.svg',
        imgAlt: 'work in progress',
      },
    };
  },
  head() {
    return {
      title: 'Unverified | Chingu',
    };
  },
};
</script>
