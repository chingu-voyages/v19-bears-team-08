<template>
  <div>
    <StyledHeader :level="1" :size="4">Log in below</StyledHeader>
    <StyledForm :handleSubmit="handleSubmit">
      <template v-slot:inputs>
        <StyledInput
          v-model="email"
          required
          name="email"
          type="email"
          placeholder="Your email address"
        >
          Email
        </StyledInput>

        <StyledInput
          v-model="password"
          required
          name="password"
          type="password"
          :minLength="6"
          :maxLength="20"
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
  email = ''
  password = ''

  handleSubmit() {
    console.log(this.email, this.password)
    setTimeout(() => {
      console.log('send form submission here..')
    }, 2000)
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
