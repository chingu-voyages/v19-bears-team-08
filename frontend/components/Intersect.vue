<template>
  <VueIntersect
    rootMargin="24px 16px 24px 296px"
    :threshold="[0.2]"
    @enter.once="enter"
  >
    <slot />
  </VueIntersect>
</template>

<script>
import VueIntersect from 'vue-intersect';

export default {
  components: { VueIntersect },
  props: {
    enter: {
      type: Function,
      required: true,
    },
  },
};
</script>
