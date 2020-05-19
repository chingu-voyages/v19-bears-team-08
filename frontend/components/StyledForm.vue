<template>
  <div ref="form" class="form-container">
    <form :setDisableSubmit="disableSubmit.set" @submit.prevent="handleSubmit">
      <slot name="inputs" :checkFormValidity="disableSubmit.set" />

      <StyledButton
        green
        normal
        full
        type="submit"
        :disabled="disableSubmit.get"
      >
        Submit
      </StyledButton>
    </form>

    <slot name="extras" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import StyledButton from '~/components/StyledButton.vue'

@Component({
  components: {
    StyledButton,
  },
})
export default class StyledForm extends Vue {
  @Prop() readonly handleSubmit!: () => Promise<any>
  @Ref() readonly form!: HTMLFormElement

  disableSubmit = {
    get: (): boolean => this.form.checkValidity(),
    set: (): boolean => this.form.checkValidity(),
  }
}
</script>

<style>
.form-container {
  width: 400px;
  margin-top: 1rem;
}

button {
  margin-top: 0.75rem;
}
</style>
