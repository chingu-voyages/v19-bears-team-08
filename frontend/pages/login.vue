<template>
  <div>
    <StyledHeader :level="1" :size="4">Log in below</StyledHeader>
    <StyledForm :handleSubmit="handleSubmit">
      <template v-slot:inputs>
        <StyledInput
          required
          name="email"
          type="email"
          placeholder="Your email address"
        >
          Email
        </StyledInput>

        <StyledInput
          required
          name="password"
          type="password"
          placeholder="Your password"
        >
          Password
        </StyledInput>
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
import { Vue, Component } from 'vue-property-decorator'
import StyledHeader from '~/components/StyledHeader.vue'
import StyledInput from '~/components/StyledInput.vue'
import StyledForm from '~/components/StyledForm.vue'

@Component({
  components: {
    StyledHeader,
    StyledInput,
    StyledForm,
  },
})
export default class Login extends Vue {
  handleSubmit() {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('send form submission here..')
    }, 2000)
  }
}
</script>

<style>
.form-links {
  @apply text-gray-700 no-underline;
}
.form-links:hover {
  @apply underline;
}
</style>
