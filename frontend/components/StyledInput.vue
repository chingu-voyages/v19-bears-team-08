<template>
  <div class="pb-5 relative flex flex-col">
    <label class="text-xl" :for="name">
      <slot />
    </label>
    <input
      class="w-full rounded p-2 mt-2 bg-gray-300 text-base border"
      :class="{ 'border-red-700': showError }"
      :type="type"
      :name="name"
      :minLength="minLength"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :value="inputVal"
      @input="onInputChange"
      @blur="onBlur"
    />
    <p
      v-if="showError"
      class="text-xs text-center text-red-500 w-full absolute bottom-0"
    >
      {{ errors[error] }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator'

@Component
export default class StyledInput extends Vue {
  @Prop({ type: String, default: 'text' }) readonly type!: string
  @Prop(Number) readonly minLength!: number
  @Prop(Number) readonly maxLength!: number
  @Prop(Boolean) readonly required!: boolean
  @Prop(String) readonly placeholder!: string
  @Prop(String) readonly name!: string
  @Prop() readonly value!: any
  @Prop() readonly checkFormValidity!: () => boolean
  @Model('input', { type: String }) inputVal!: string

  showError = false
  error = ''

  errors = {
    tooLong: `${this.capitalizedName} is too long. Max ${this.maxLength} characters.`,
  }

  get capitalizedName(): string {
    return this.name.replace(this.name[0], this.name[0].toUpperCase())
  }

  @Emit('input')
  onInputChange(e: Event): string {
    return (e.target as HTMLInputElement).value
  }

  @Emit('blur')
  onBlur(e: Event): void {
    const isValid = (e.target as HTMLInputElement).checkValidity()
    this.showError = !isValid
    this.checkFormValidity()
  }
}
</script>

<style scoped lang="postcss">
input:invalid {
  @apply border-red-700;
}
</style>
