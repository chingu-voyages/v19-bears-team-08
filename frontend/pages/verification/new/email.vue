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
  name: 'RequestNewVerificationEmail',
  data() {
    return {
      email: '',

      hero: {
        header: 'Account Verification',
        subText: `
          Before you request another email, please double check your spam folder.
          Otherwise, feel free to request another email.
        `,
        imgSrc: '/page/requestemailverification/Letter.svg',
        imgAlt: 'letter',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$toast.info('Processing...');
      this.$axios
        .$post(`/user/verify`, { email: this.email })
        .then(resp => {
          this.$router.push('/signup/thanks');
          this.$toast.success(resp.message);
        })
        .catch(err => this.$toast.error(err.message));
    },
  },
  head() {
    return {
      title: 'Account Verification | Chingu',
    };
  },
};
</script>
