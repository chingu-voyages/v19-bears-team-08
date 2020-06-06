<template>
  <div class="form-container">
    <slot />

    <form @submit.prevent="handleSubmit">
      <slot name="inputs" />

      <StyledButton green normal full type="submit">
        Submit
      </StyledButton>
    </form>

    <slot name="extras" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import StyledButton from '~/components/StyledButton.vue';

@Component({
  components: {
    StyledButton,
  },
})
export default class StyledForm extends Vue {
  @Prop({ type: Function, required: true })
  readonly handleSubmit!: () => Promise<any>;
}
</script>

<style scoped>
.form-container {
  width: 90%;
  min-width: 310px;
  max-width: 400px;
  margin-top: 1rem;
}

button {
  margin-top: 0.75rem;
}
</style>
