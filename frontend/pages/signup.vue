<template>
  <div>
    <StyledHeader level="h1">Sign up below</StyledHeader>

    <StyledAuthForm :handleSubmit="handleSubmit">
      <template v-slot:inputs>
        <StyledInput
          v-model="name"
          required
          name="name"
          placeholder="Your full name"
          label="Name"
        />

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
          placeholder="A unique password between 6 and 20 characters"
          :minLength="6"
          :maxLength="20"
          label="Password"
        />
      </template>

      <template v-slot:extras>
        <div class="flex justify-between w-full mt-2 pt-2">
          <nuxt-link to="/login" class="form-links">
            Have an account? Log in here.
          </nuxt-link>
        </div>
      </template>
    </StyledAuthForm>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledInput from '~/components/StyledInput.vue';
import StyledAuthForm from '~/components/StyledAuthForm.vue';

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledAuthForm,
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
      });
  }
}
</script>

<style></style>
