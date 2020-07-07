<template>
  <div>
    <StyledHeader level="h1" text="Log in below" />

    <StyledAuthForm :handleSubmit="localLogin">
      <template v-slot:inputs>
        <StyledInput
          v-model="email"
          required
          showLabel
          label="Email"
          type="email"
          name="email"
          placeholder="Your email address"
        />

        <StyledInput
          v-model="password"
          required
          showLabel
          label="Password"
          type="password"
          name="password"
          :minLength="6"
          :maxLength="20"
          placeholder="Your password"
        />
      </template>

      <template v-slot:extras>
        <div class="text-center text-xl my-3 leading-none">OR</div>

        <StyledButton full github :onClick="githubLogin">
          <fa :icon="['fab', 'github']" />
          Login With Github
        </StyledButton>

        <StyledFormLinks>
          <nuxt-link to="/signup">
            No account? Sign up here.
          </nuxt-link>

          <nuxt-link to="/password/forgot">
            Forgot Password?
          </nuxt-link>
        </StyledFormLinks>
      </template>
    </StyledAuthForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledInput from '~/components/StyledInput.vue';
import StyledAuthForm from '~/components/StyledAuthForm.vue';
import StyledButton from '~/components/StyledButton.vue';
import StyledFormLinks from '~/components/StyledFormLinks.vue';

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledAuthForm,
    StyledButton,
    StyledFormLinks,
  },
  head() {
    return {
      title: 'Login | Chingu',
    };
  },
})
export default class Login extends Vue {
  email = '';
  password = '';

  githubLogin() {
    this.$toast.info('Processing...');
    this.$auth.loginWith('github');
  }

  localLogin() {
    this.$toast.info('Processing...');
    const data = { email: this.email, password: this.password };
    this.$auth
      .loginWith('local', { data })
      .then(() => {
        this.$router.push('/');
        this.$toast.clear();
        this.$toast.success(`Welcome back, ${this.$auth.user.local.name}!`);
      })
      .catch(err => this.$toast.error(err.message));
  }
}
</script>
