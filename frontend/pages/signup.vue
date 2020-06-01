<template>
  <div>
    <StyledHeader :level="1" :size="4">Sign up below</StyledHeader>

    <StyledForm :handleSubmit="handleSubmit">
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
        <div class="flex justify-between w-full mt-1 p-2">
          <nuxt-link to="/login" class="form-links">
            Have an account? Log in here.
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

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledForm,
  },
})
export default class Signup extends Vue {
  name = '';
  email = '';
  password = '';

  async handleSubmit() {
    try {
      await this.$axios.$post('/user/register', {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.$toast.success('Thanks for joining!');
    } catch (err) {
      console.log(err);
      this.$toast.error('Error, please try again.');
    }
  }
}
</script>

<style></style>
