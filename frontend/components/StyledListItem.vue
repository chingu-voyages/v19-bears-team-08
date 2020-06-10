<template>
  <div
    class="flex listitem"
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
        :class="{ 'bg-pink': activeColor }"
      />
      <div
        class="flex justify-center items-center rounded-full h-10 w-10 bg-green transform transition-transform duration-150"
        :class="{ 'bg-pink': activeColor }"
      >
        <div v-if="bubbleText" class="absolute text-white font-bold">
          {{ index + 1 }}
        </div>
      </div>
    </div>

    <!-- right side -->
    <div class="text-container">
      <h4>{{ item.title }}</h4>
      <ul
        v-if="item.information && item.information.length"
        class="text-gray-800"
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

@Component({})
export default class StyledListItem extends Vue {
  @Prop({ type: Object, required: true }) readonly item!: ListItemType;
  @Prop({ type: Number, required: true }) readonly index!: number;
  @Prop({ type: Boolean }) readonly isCentered!: boolean;
  @Prop({ type: Boolean }) readonly listDesc!: boolean;
  @Prop({ type: Boolean }) readonly bubbleText!: boolean;
  @Prop({ type: Number, default: 0 }) readonly activeItem!: number;

  get activeColor(): boolean {
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
.listitem .text-container ul li:last-child {
  margin-bottom: 0px;
}

.listitem:last-child .text-container ul {
  padding-bottom: 0px;
}

h4 {
  margin: 7px 0 9px;
  @apply leading-none;
}
</style>
