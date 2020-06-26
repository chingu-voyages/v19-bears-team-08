<template>
  <div>
    <div class="my-6 md:my-8 flex flex-col-reverse md:flex-row items-center">
      <div
        class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
      >
        <StyledHeader level="h1">Forgot Password</StyledHeader>
        <p class="mb-6 mr-2 text-center md:text-left">
          Don't worry it happens to everyone. Just submit the email address you
          signed up with and we'll send you an email to reset your password.
        </p>
        <StyledInputWithButton
          v-model="email"
          :handleSubmit="handleSubmit"
          buttonText="Submit"
          placeholder="Your email address"
          type="email"
          name="email"
          :minLength="3"
          :maxLength="300"
        />

        <StyledAuthForm :handleSubmit="handleSubmit">
          <template v-slot:inputs>
            <StyledInput
              v-model="email"
              required
              type="email"
              name="email"
              :minLength="3"
              placeholder="The email you signed up to Chingu with"
            />
          </template>
        </StyledAuthForm>
      </div>

      <img
        src="/page/forgotpassword/Password.svg"
        alt="team spirit"
        class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-2"
      />
    </div>
  </div>
</template>

<script>
import StyledHeader from '~/components/StyledHeader.vue';
import StyledAuthForm from '~/components/StyledAuthForm.vue';
import StyledInput from '~/components/StyledInput.vue';
import StyledInputWithButton from '~/components/StyledInputWithButton.vue';

export default {
  name: 'ForgotPassword',
  components: {
    StyledHeader,
    StyledAuthForm,
    StyledInput,
    StyledInputWithButton,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    handleSubmit() {
      console.log('sending you an email to reset your password');
    },
  },
  head() {
    return {
      title: 'Forgot Password | Chingu',
    };
  },
};
</script>

<style lang="postcss" scoped>
img {
  margin-bottom: 1.5rem !important;
}
@screen md {
  img {
    margin-bottom: 0 !important;
  }
}
</style>
