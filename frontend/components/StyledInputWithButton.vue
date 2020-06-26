<template>
  <form
    :onSubmit="handleSubmit"
    class="styledInputWithButton-container relative w-full"
  >
    <input
      class="w-full rounded p-3 mt-2 mb-5 bg-gray-300 text-base border"
      :class="{ 'border-red-700': !!error }"
      required
      :type="type || 'text'"
      :name="name"
      :minLength="minLength"
      :maxLength="maxLength"
      :placeholder="placeholder"
      :value="value"
      @input="onInputChange"
    />
    <!-- @blur="onBlur" -->

    <StyledButton green normal type="submit" class="w-24 absolute">
      {{ buttonText }}
    </StyledButton>
  </form>
</template>

<script>
import StyledButton from '~/components/StyledButton.vue';

export default {
  components: {
    StyledButton,
  },
  props: {
    handleSubmit: {
      type: Function,
      required: true,
      default: () => console.log('submitting form?'),
    },
    buttonText: {
      type: String,
      default: 'Submit',
    },
    placeholder: {
      type: String,
      required: true,
      default: 'Placeholder here...',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      required: true,
    },
    minLength: {
      type: Number,
      default: 0,
    },
    maxLength: {
      type: Number,
      default: Infinity,
    },
    value: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      error: '',
    };
  },
  methods: {
    onInputChange(e) {
      return this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="postcss" scoped>
.styledInputWithButton-container input {
  padding-right: calc(6rem + 4px + 0.5rem);
}
.styledInputWithButton-container button {
  margin-left: -6.25rem;
  top: 4px;
  right: 4px;
}
</style>
