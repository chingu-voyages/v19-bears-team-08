<template>
  <div
    class="listitem flex"
    :class="{
      'listitem-centered': isCentered,
      'opacity-50': index < activeItem - 1,
    }"
  >
    <!-- left side -->
    <div
      class="relative flex justify-center h-auto mr-4"
      :class="{ 'items-center': isCentered }"
    >
      <span
        class="absolute h-full w-1 bg-green"
        :class="{ 'bg-pink': isActiveItem }"
      />
      <StyledCircleContainer :hasContent="isNumbered" :isActive="isActiveItem">
        {{ index + 1 }}
      </StyledCircleContainer>
    </div>

    <!-- right side -->
    <div class="listitem__text-container">
      <h4>{{ item.title }}</h4>
      <ul
        v-if="item.information && item.information.length"
        :class="{ 'py-1': !isCentered, 'mt-2 mb-3': isCentered }"
      >
        <li
          v-for="info in item.information"
          :key="info"
          class="mb-1"
          :class="{ 'ml-5 list-outside list-disc': listDesc }"
        >
          {{ info }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

export type ListItemType = {
  title: string;
  information: string[];
};

@Component({ name: 'StyledListItem' })
export default class StyledListItem extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: ListItemType;
  @Prop({ type: Number, required: true }) readonly index!: number;
  @Prop({ type: Boolean }) readonly isCentered!: boolean;
  @Prop({ type: Boolean }) readonly isNumbered!: boolean;
  @Prop({ type: Boolean }) readonly listDesc!: boolean;
  @Prop({ type: Number, default: 0 }) readonly activeItem!: number;

  get isActiveItem(): boolean {
    return this.index === this.activeItem - 1 && !this.isCentered;
  }
}
</script>

<style lang="postcss" scoped>
.listitem-centered:first-child span {
  height: 50%;
  bottom: 0;
}
.listitem-centered:last-child span {
  height: 50%;
  top: 0;
}
.listitem .listitem__text-container ul li:last-child {
  margin-bottom: 0px;
}

.listitem:last-child .listitem__text-container ul {
  padding-bottom: 0px;
}

.listitem__text-container {
  margin: 8px 0;
}

h4 {
  margin-bottom: 9px;
  @apply leading-none;
}
</style>
