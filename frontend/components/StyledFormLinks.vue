<template>
  <div class="styled-form-links">
    <slot />
  </div>
</template>

<script>
export default { name: 'StyledFormLinks' };
</script>

<style lang="postcss">
.styled-form-links {
  @apply flex flex-wrap justify-between w-full mt-2 pt-2;
}
.styled-form-links a {
  @apply text-gray-700 mb-2 px-2 no-underline;
}
.styled-form-links a:hover {
  @apply underline;
}
</style>
