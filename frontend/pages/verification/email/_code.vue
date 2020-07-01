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
        Please submit your email address below or
        <a :href="`mailto:${chinguEmail}`">contact us</a>
        directly.
      </p>
      <form class="mx-auto mt-1" @submit.prevent="getNewCode">
        <StyledInput
          v-model="email"
          required
          showInlineButton
          buttonText="Submit"
          label="Email"
          type="email"
          name="email"
          placeholder="Your email address"
        />
      </form>
    </div>
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';
import StyledLoader from '~/components/StyledLoader.vue';
import StyledInput from '~/components/StyledInput.vue';

export default {
  name: 'VerifyEmail',
  components: {
    StyledHeader,
    StyledLoader,
    StyledInput,
  },
  asyncData(ctx) {
    return {
      chinguEmail: ctx.env.EMAIL,
    };
  },
  data() {
    return {
      isCodeExpired: false,
      chinguEmail: '',
      email: '',
    };
  },
  mounted() {
    const code = this.$route.params.code;

    // check for code and it's format before making API calls
    if (!code || code.length !== 36) {
      this.$toast.error('Email verification failed: Incorrect code format.');
      this.$router.push('/');
    } else {
      this.$toast.info('Processing...');
      this.$axios
        .$get(`/user/verify/${code}`)
        .then(resp => {
          this.$router.push('/login');
          this.$toast.success(resp.message);
        })
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
      this.$toast.info('Processing...');
      this.$axios
        .$post('/user/verify', {
          email: this.email,
        })
        .then(resp => {
          this.$router.push('/signup/thanks');
          this.$toast.success(resp.message);
        })
        .catch(err => this.$toast.error(err.message));
    },
  },
  head() {
    return {
      title: 'Verifying Email | Chingu',
    };
  },
};
</script>
