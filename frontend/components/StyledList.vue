<template>
  <div class="flex flex-col">
    <StyledListItem
      v-for="(item, index) in list"
      :key="item.title"
      :item="item"
      :index="index"
      :isCentered="isCentered"
      :listDesc="listDesc"
      :isNumbered="isNumbered"
      :activeItem="activeItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ListItemType } from '~/components/StyledListItem.vue';

@Component({ name: 'StyledList' })
export default class StyledList extends Vue {
  @Prop(Array) readonly list!: ListItemType[];
  @Prop({ type: Boolean }) readonly isCentered!: boolean;
  @Prop({ type: Boolean }) readonly listDesc!: boolean;
  @Prop({ type: Boolean }) readonly isNumbered!: boolean;
  @Prop({ type: Number, default: 0 }) readonly activeItem!: number;
}
</script>
