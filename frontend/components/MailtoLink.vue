<template>
  <a :href="`mailto:${email}`">
    <slot />
  </a>
</template>

<script>
export default {
  data() {
    return {
      email: 'chingucommunity@gmail.com',
    };
  },
};
</script>
