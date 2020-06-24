<template>
  <div>
    <StyledHeader level="h1">
      {{
        isCodeExpired ? 'Failed Email Verification' : 'Verifying your email...'
      }}
    </StyledHeader>

    <StyledLoader v-if="!isCodeExpired" />

    <div v-else class="text-center md:text-left">
      <p class="mb-4">
        The code you're using has expired.
        <span class="italic">A code is only valid for 10 minutes.</span>
      </p>
      <p class="mb-4">
        If you're not receiving a verification email from us, please
        <a :href="`mailto:${email}`">contact us</a>
        directly.
      </p>
      <StyledButton green normal :onClick="getNewCode">
        I understand. Get new code.
      </StyledButton>
    </div>
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';
import StyledLoader from '~/components/StyledLoader.vue';
import StyledButton from '~/components/StyledButton.vue';

export default {
  name: 'VerifyEmail',
  components: {
    StyledHeader,
    StyledLoader,
    StyledButton,
  },
  asyncData(ctx) {
    return {
      email: ctx.env.EMAIL,
    };
  },
  data() {
    return {
      isCodeExpired: false,
      email: '',
    };
  },
  mounted() {
    const token = this.$route.params.token;

    // check for token and it's format before making API calls
    if (!token || token.length !== 36) {
      this.$toast.error('Email verification failed: Incorrect token format.');
      this.$router.push('/');
    } else {
      this.$axios
        .get(`/user/verify/${token}`)
        .then(({ data }) => console.log(data))
        .catch(err => {
          if (err.message === 'Code expired') {
            this.isCodeExpired = true;
          } else {
            this.$router.push('/');
          }
          this.$toast.error(`Email verification failed: ${err.message}`);
        });
    }
  },
  methods: {
    getNewCode() {
      console.log('getting new code');
    },
  },
  head() {
    return {
      title: 'Verifying Email | Chingu',
    };
  },
};
</script>

<style lang="postcss" scoped>
button {
  @apply mx-auto mt-1;
}
</style>
