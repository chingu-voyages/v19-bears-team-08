<template>
  <div class="flex flex-col">
    <StyledListItem
      v-for="(item, index) in list"
      :key="item.title"
      :item="item"
      :index="index"
      :isCentered="isCentered"
      :listDesc="listDesc"
      :bubbleText="bubbleText"
      :activeItem="activeItem"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { ListItemType } from '~/components/StyledListItem.vue';

@Component({
  name: 'List',
})
export default class StyledList extends Vue {
  @Prop(Array) readonly list!: ListItemType[];
  @Prop({ type: Boolean, default: false }) readonly isCentered!: boolean;
  @Prop({ type: Boolean, default: false }) readonly listDesc!: boolean;
  @Prop({ type: Boolean, default: false }) readonly bubbleText!: boolean;
  @Prop({ type: Number, default: 0 }) readonly activeItem!: number;
}
</script>

<style lang="postcss"></style>
