<template>
  <div>
    <StyledHeader :level="1" :size="4">Log in below</StyledHeader>

    <StyledForm :handleSubmit="localLogin">
      <template>
        <StyledButton full github :onClick="githubLogin">
          <fa :icon="['fab', 'github']" />
          Login With Github
        </StyledButton>

        <div class="text-center text-xl mt-2 mb-1">OR</div>
      </template>

      <template v-slot:inputs>
        <StyledInput
          v-model="email"
          required
          name="email"
          type="email"
          placeholder="Your email address"
          label="Email"
        />

        <StyledInput
          v-model="password"
          required
          name="password"
          type="password"
          :minLength="6"
          :maxLength="20"
          placeholder="Your password"
          label="Password"
        />
      </template>

      <template v-slot:extras>
        <div class="flex justify-between w-full mt-1 p-2">
          <nuxt-link to="/signup" class="form-links">
            No account? Sign up here.
          </nuxt-link>

          <nuxt-link to="/forgotpassword" class="form-links">
            Forgot Password?
          </nuxt-link>
        </div>
      </template>
    </StyledForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledInput from '~/components/StyledInput.vue';
import StyledForm from '~/components/StyledForm.vue';
import StyledButton from '~/components/StyledButton.vue';

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledForm,
    StyledButton,
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
    this.$auth.loginWith('local', { data }).then(() => {
      this.$toast.clear();
      this.$toast.success(`Welcome back, ${this.$auth.user.name}!`);
    });
  }
}
</script>

<style lang="postcss">
.form-links {
  @apply text-gray-700 no-underline;
}
.form-links:hover {
  @apply underline;
}
</style>
