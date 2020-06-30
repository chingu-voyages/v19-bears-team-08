<template>
  <div>
    <StyledHeader level="h1">Sign up below</StyledHeader>

    <StyledAuthForm :handleSubmit="handleSubmit">
      <template v-slot:inputs>
        <StyledInput
          v-model="name"
          required
          showLabel
          label="Name"
          name="name"
          placeholder="Your full name"
        />

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
          placeholder="A unique password between 6 and 20 characters"
        />
      </template>

      <template v-slot:extras>
        <StyledFormLinks>
          <nuxt-link to="/login">
            Have an account? Log in here.
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
import StyledFormLinks from '~/components/StyledFormLinks.vue';

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledAuthForm,
    StyledFormLinks,
  },
  head() {
    return {
      title: 'Signup | Chingu',
    };
  },
})
export default class Signup extends Vue {
  name = '';
  email = '';
  password = '';

  handleSubmit() {
    this.$toast.info('Processing...');
    this.$axios
      .$post('/user/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
      .then(({ token }) => {
        this.$auth.setStrategy('local');
        this.$auth.setUserToken(token).then(() => {
          this.$router.push('/profile');
          this.$toast.clear();
          this.$toast.success('Thanks for joining!');
        });
      })
      .catch(err => this.$toast.error(err.message));
  }
}
</script>
