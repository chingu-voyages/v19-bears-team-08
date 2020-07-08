<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <form class="w-full" @submit.prevent="handleSubmit">
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
export default {
  name: 'ForgotPassword',
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
      this.$toast.info('Processing...');
      this.$axios
        .$get(`/user/password/forgot/${this.email}`)
        .then(resp => {
          this.$router.push('/');
          this.$toast.success(resp.message);
        })
        .catch(err => this.$toast.error(err.message));
    },
  },
  head() {
    return {
      title: 'Forgot Password | Chingu',
    };
  },
};
</script>
