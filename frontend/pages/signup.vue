<template>
  <div>
    <StyledHeader :level="1" :size="4">Sign up below</StyledHeader>

    <StyledForm>
      <template v-slot:inputs>
        <StyledInput required name="name" placeholder="Your full name">
          Name
        </StyledInput>

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
          placeholder="A unique password between 6 and 20 characters"
          :minLength="6"
          :maxLength="20"
        >
          Password
        </StyledInput>
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
export default class Signup extends Vue {}
</script>

<style></style>
