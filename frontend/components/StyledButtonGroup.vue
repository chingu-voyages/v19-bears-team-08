<template>
  <div id="button-group" class="flex flex-wrap justify-center md:justify-start">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="postcss">
#button-group > * {
  margin: 5px;
}
@screen md {
  #button-group > * {
    margin-left: 0px;
  }
  #button-group > *:first-child {
    @apply mr-3;
  }
}
</style>
