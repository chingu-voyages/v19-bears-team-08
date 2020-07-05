<template>
  <div class="flex flex-col md:flex-row items-center md:items-start">
    <fa icon="spinner" class="text-pink text-2xl" spin />
    <p v-if="text" class="mt-2 md:ml-3">{{ text }}</p>
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
