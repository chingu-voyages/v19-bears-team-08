<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <StyledButtonGroup>
        <MailtoLink>
          <StyledButton green normal>
            Contact Us
          </StyledButton>
        </MailtoLink>
        <nuxt-link to="/verification/new/email">
          <StyledButton pink inverted>
            Get Another Email
          </StyledButton>
        </nuxt-link>
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'UnverifiedAccount',
  data() {
    return {
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
      title: 'Unverified Account | Chingu',
    };
  },
};
</script>
