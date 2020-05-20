<template>
  <div class="pb-5 relative flex flex-col">
    <label class="text-xl" :for="name">
      {{ label }}
    </label>

    <input
      class="w-full rounded p-2 mt-2 bg-gray-300 text-base border"
      :class="{ 'border-red-700': !!error }"
      :required="required"
      :type="type || 'text'"
      :name="name"
      :minLength="minLength"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :value="inputVal"
      @input="onInputChange"
      @blur="onBlur"
    />

    <p
      v-if="!!error"
      class="text-xs text-center text-red-500 w-full absolute bottom-0"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';

@Component
export default class StyledInput extends Vue {
  @Prop(String) readonly type!: string;
  @Prop(Number) readonly minLength!: number;
  @Prop(Number) readonly maxLength!: number;
  @Prop(Boolean) readonly required!: boolean;
  @Prop({ type: String, required: true }) readonly placeholder!: string;
  @Prop({ type: String, required: true }) readonly name!: string;
  @Prop({ type: String, required: true }) readonly label!: string;
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

<style></style>
