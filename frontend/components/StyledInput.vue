<template>
  <label class="text-xl">
    <slot />
    <input
      :type="type"
      :minLength="minLength"
      :maxLength="maxLength"
      class="w-full rounded mt-1 mb-2 p-2 bg-gray-300 text-base"
    />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class StyledInput extends Vue {
  @Prop({ default: 'text' }) readonly type!: string
  @Prop() readonly minLength!: number
  @Prop() readonly maxLength!: number
  @Prop() readonly required!: boolean
}
</script>

<style></style>
