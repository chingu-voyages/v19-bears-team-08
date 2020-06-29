<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <form :handleSubmit="handleSubmit" class="w-full">
        <StyledInput
          v-model="email"
          required
          label="Email"
          showInlineButton
          buttonText="Submit"
          placeholder="Your email address"
          type="email"
          name="email"
          :minLength="3"
          :maxLength="300"
        />
      </form>
    </StyledHero>
  </div>
</template>

<script>
import StyledInput from '~/components/StyledInput.vue';
import StyledHero from '~/components/StyledHero.vue';

export default {
  name: 'ForgotPassword',
  components: {
    StyledInput,
    StyledHero,
  },
  data() {
    return {
      email: '',

      hero: {
        header: 'Forgot Password',
        subText: `
          Don't worry it happens to everyone. 
          Just submit the email address you signed up with and we'll send you an email to reset your password.
        `,
        imgSrc: '/page/forgotpassword/Password.svg',
        imgAlt: 'password screen',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log('sending you an email to reset your password');
    },
  },
  head() {
    return {
      title: 'Forgot Password | Chingu',
    };
  },
};
</script>
