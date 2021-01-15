<template>
  <div>
    <StyledHero
      header="Welcome to Chingu"
      subText="
          Thanks for creating an account at Chingu.
          Please check your inbox and verify the email that you signed up with to activate your account.
          If you haven't received an email within 10 minutes, check your spam folder or contact us."
      imgSrc="/page/signupthanks/WIP.svg"
      imgAlt="work in progress"
    >
      <StyledButton
        green
        normal
        href="mailto:chingucommunity@gmail.com"
        text="Contact Us"
      />
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'SignupThanks',
  head() {
    return {
      title: 'Welcome | Chingu',
    };
  },
};
</script>
