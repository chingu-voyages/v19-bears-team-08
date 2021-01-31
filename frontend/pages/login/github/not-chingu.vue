<template>
  <div>
    <StyledHero
      header="No Chingu Account Found"
      subText="
        Hey! 
        You successfully logged in with GitHub, but we couldn't find a Chingu account associated with your GitHub account.
        Please create an account here first.
        If you have a Chingu account and still can't login, please contact us below. 
        "
      imgSrc="/page/signupthanks/WIP.svg"
      imgAlt="work in progress"
    >
      <StyledButtonGroup>
        <StyledButton green normal to="/signup" text="Create Account" />
        <StyledButton
          pink
          inverted
          href="mailto:chingucommunity@gmail.com"
          text="Contact Us"
        />
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script>
export default {
  name: 'NoChinguAccountFound',
  head() {
    return {
      title: 'No Chingu Account Found | Chingu',
    };
  },
};
</script>
