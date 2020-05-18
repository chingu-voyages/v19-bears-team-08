<template>
  <div class="pb-5 relative flex flex-col">
    <label class="text-xl" :for="name">
      <slot />
    </label>
    <input
      :type="type"
      :name="name"
      :minLength="minLength"
      :maxLength="maxLength"
      :placeholder="placeholder"
      class="w-full rounded p-2 mt-2 bg-gray-300 text-base border"
      :class="{ 'border-red-700': !isValid && isActivated }"
      @blur="onBlur"
    />
    <p
      v-if="!isValid"
      class="text-xs text-center text-red-500 w-full absolute bottom-0"
    >
      {{ error }}
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class StyledInput extends Vue {
  @Prop({ default: 'text' }) readonly type!: string
  @Prop() readonly minLength!: number
  @Prop() readonly maxLength!: number
  @Prop() readonly required!: boolean
  @Prop() readonly placeholder!: string
  @Prop() readonly name!: string

  isActivated = false
  isValid = false
  error = ''

  onBlur(e: { target: { checkValidity: () => boolean } }) {
    this.isActivated = true
    this.isValid = e.target.checkValidity()
  }
}
</script>

<style></style>
