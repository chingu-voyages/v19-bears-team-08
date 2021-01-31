<template>
  <div class="flex flex-col md:flex-row-reverse items-center">
    <p v-if="text" class="mb-5 md:mb-0 md:ml-3 text-center">{{ text }}</p>
    <fa icon="spinner" class="text-pink text-4xl md:text-2xl" spin />
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>
