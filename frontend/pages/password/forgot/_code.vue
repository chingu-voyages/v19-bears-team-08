<template>
  <div>
    <StyledHeader level="h1" text="Change Password" />

    <StyledAuthForm :handleSubmit="handleSubmit">
      <template #inputs>
        <StyledInput
          v-model="email"
          required
          showLabel
          label="Email"
          placeholder="Your email address"
          type="email"
          name="email"
          :minLength="3"
          :maxLength="300"
        />
        <StyledInput
          v-model="password"
          required
          showLabel
          label="New Password"
          type="password"
          name="password"
          :minLength="6"
          :maxLength="20"
          placeholder="A unique password between 6 and 20 characters"
        />
        <StyledInput
          v-model="confirmPassword"
          required
          showLabel
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          :minLength="6"
          :maxLength="20"
          placeholder="Enter your new password again"
        />
        <StyledInput
          v-model="code"
          required
          showLabel
          label="Reset Code"
          type="text"
          name="resetCode"
          placeholder="Enter your password reset code"
        />
      </template>

      <template #extras>
        <StyledFormLinks>
          <nuxt-link to="/signup" class="form-links">
            No account? Sign up here.
          </nuxt-link>

          <nuxt-link to="/password/forgot" class="form-links">
            Need a new code?
          </nuxt-link>
        </StyledFormLinks>
      </template>
    </StyledAuthForm>
  </div>
</template>

<script>
export default {
  name: 'ChangePassword',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      code: this.$route.params.code,
    };
  },
  head() {
    return {
      title: 'Change Password | Chingu',
    };
  },
  methods: {
    handleSubmit() {
      if (this.code.length !== 20) {
        return this.$toast.error('Invalid Code');
      }
      if (this.password !== this.confirmPassword) {
        return this.$toast.error('Passwords must match');
      }
      this.$toast.info('Processing...');
      this.$axios
        .$post('/user/password/forgot/change', {
          email: this.email,
          password: this.password,
          code: this.code,
        })
        .then(resp => {
          this.$router.push('/login');
          this.$toast.success(resp.message);
        })
        .catch(err => this.$toast.error(err.message));
    },
  },
};
</script>
