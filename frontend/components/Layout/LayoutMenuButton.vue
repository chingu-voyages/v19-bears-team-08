<template>
  <fa
    class="md:hidden h-12 w-12 p-3 rounded-full bg-gray-300 hover:bg-gray-200 text-xl cursor-pointer"
    style="width: 3rem;"
    :icon="icon"
    @click="setIsOpen(!isOpen)"
    @blur="setIsOpen(false)"
  />
</template>

<script>
export default {
  name: 'LayoutMenuButton',
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    setIsOpen: {
      type: Function,
      required: true,
    },
  },
  computed: {
    icon() {
      return this.isOpen ? 'times' : 'bars';
    },
  },
};
</script>
