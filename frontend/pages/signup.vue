<template>
  <div>
    <StyledHeader :level="1" :size="4">Sign up below</StyledHeader>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import StyledHeader from '~/components/StyledHeader.vue'

@Component({
  components: {
    StyledHeader,
  },
})
export default class Signup extends Vue {}
</script>

<style></style>
