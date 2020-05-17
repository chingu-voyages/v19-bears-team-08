<template>
  <div>
    <StyledHeader :level="1" :size="4">Log in below</StyledHeader>

    <StyledInput required>
      Name
    </StyledInput>
    <StyledInput type="email" required>
      email
    </StyledInput>
    <StyledInput type="password" required min-length="6" max-length="20">
      Password
    </StyledInput>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import StyledHeader from '~/components/StyledHeader.vue'
import StyledInput from '~/components/StyledInput.vue'

@Component({
  components: {
    StyledHeader,
    StyledInput,
  },
})
export default class Login extends Vue {}
</script>

<style></style>
