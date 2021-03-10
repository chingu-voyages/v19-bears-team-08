<template>
  <div class="w-full border shadow-md rounded-md p-4 pl-6 m-3">
    <StyledHeader level="h3" :text="header" />

    <StyledButton normal green text="Save" class="float-right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class ProfileSection extends Vue {
  @Prop({ type: String, required: true }) readonly header!: string;
}
</script>

<style></style>
