<template>
  <div>
    <StyledHero
      header="Unverified Account"
      subText="
        It looks like you still haven't verified your email, so your account isn't accessible yet.
        Please check your inbox for an email from us to activate your account.
        If you never received an email from us, check your spam folder or contact us."
      imgSrc="/page/signupthanks/WIP.svg"
      imgAlt="work in progress"
    >
      <StyledButtonGroup>
        <StyledButton
          green
          normal
          href="mailto:chingucommunity@gmail.com"
          text="Contact Us"
        />
        <StyledButton
          pink
          inverted
          to="/verification/new/email"
          text="Get Another Email"
        />
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'UnverifiedAccount',
  head() {
    return {
      title: 'Unverified Account | Chingu',
    };
  },
};
</script>
