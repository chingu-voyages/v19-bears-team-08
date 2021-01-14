<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <MailtoLink>
        <StyledButton green normal>Contact Us</StyledButton>
      </MailtoLink>
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'SignupThanks',
  data() {
    return {
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
