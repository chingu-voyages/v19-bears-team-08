<template>
  <div
    class="input-container relative w-full mb-5"
    :class="{ inputInlineButton: showInlineButton }"
  >
    <label v-if="showLabel" class="text-xl" :for="name">
      {{ label }}
    </label>

    <input
      :class="{ 'border-red-700': !!error }"
      :required="required"
      :type="type"
      :name="name"
      :minLength="minLength"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :value="inputVal"
      @input="onInputChange"
      @blur="onBlur"
    />

    <StyledButton
      v-if="showInlineButton"
      green
      normal
      type="submit"
      class="w-24 absolute"
      :text="buttonText"
    />

    <p v-if="!!error" class="text-xs text-center text-red-500 w-full">
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'nuxt-property-decorator';

@Component
export default class StyledInput extends Vue {
  @Prop(Number) readonly minLength!: number;
  @Prop(Number) readonly maxLength!: number;
  @Prop(Boolean) readonly required!: boolean;
  @Prop({ type: String, required: true }) readonly placeholder!: string;
  @Prop({ type: String, default: 'text' }) readonly type!: string;
  @Prop({ type: String, required: true }) readonly name!: string;
  @Prop({ type: String, required: true }) readonly label!: string;
  @Prop({ type: Boolean, default: false }) readonly showLabel!: boolean;
  @Prop({ type: String, required: false }) readonly buttonText!: string;
  @Prop({ type: Boolean, required: false }) readonly showInlineButton!: boolean;
  @Prop() readonly value!: any;
  @Model('input', { type: String }) inputVal!: string;

  error = '';

  errors: any = {
    tooLong: `${this.label} is too long. Max ${this.maxLength} characters.`,
    tooShort: `${this.label} is too short. Min ${this.minLength} character${
      this.minLength === 0 ? '' : 's'
    }.`,
    typeMismatch: `${
      this.label
    } is currently not acceptable. Please enter a valid ${this.label.toLowerCase()}`,
    valueMissing: `${this.label} is required`,
  };

  checkForError(target: HTMLInputElement) {
    const isValid = target.checkValidity();
    if (isValid) {
      this.error = '';
    } else {
      const validityState: any = target.validity;
      for (const key in validityState) {
        if (validityState[key]) {
          const customMsg = this.errors[key];
          this.error = customMsg || target.validationMessage;
          break;
        }
      }
    }
  }

  @Emit('input')
  onInputChange(e: Event): string {
    // if there's an error present, this will ...
    // ... update the error state as the user types
    if (this.error) {
      this.checkForError(e.target as HTMLInputElement);
    }
    return (e.target as HTMLInputElement).value;
  }

  @Emit('blur')
  onBlur(e: Event): void {
    this.checkForError(e.target as HTMLInputElement);
  }
}
</script>

<style lang="postcss" scoped>
.input-container:last-of-type {
  margin-bottom: 1.875rem;
}
/* this is here because of the last child selector in /layout/default */
.input-container p {
  @apply -mb-5 leading-5;
}
.input-container input {
  @apply relative w-full rounded p-3 bg-gray-300 text-base border;
}
.inputInlineButton input {
  padding-right: calc(6rem + 4px + 0.5rem);
}
.inputInlineButton button {
  margin-left: -6.25rem;
  top: 4px;
  right: 4px;
}
</style>
