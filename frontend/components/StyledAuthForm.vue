<template>
  <div class="w-full max-w-md">
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
export default class StyledAuthForm extends Vue {
  @Prop({ type: Function, required: true })
  readonly handleSubmit!: () => Promise<any>;
}
</script>
