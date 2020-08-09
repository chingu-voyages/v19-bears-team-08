<template>
  <div class="relative">
    <button
      ref="dropdownbutton"
      :class="
        isOpen
          ? 'border-pink focus:border-pink'
          : 'border-transparent focus:border-green'
      "
      class="content-center rounded-full w-12 h-12 border hover:border-green focus:outline-none"
      tabindex="0"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="handleClick"
      @keyup.esc="closeMenu"
      @blur="closeMenu"
    >
      <fa
        :icon="iconName"
        :class="(isOpen || spin) && 'text-pink'"
        :spin="spin"
      />
    </button>

    <transition
      enterActiveClass="transition ease-out duration-100 transform"
      enterClass="opacity-0 scale-90"
      enterToClass="opacity-100 scale-100"
      leaveActiveClass="transition ease-in duration-75 transform"
      leaveClass="opacity-100 scale-100"
      leaveToClass="opacity-0 scale-90"
    >
      <div
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-56 bg-gray-300 rounded-md shadow-lg border border-pink"
      >
        <ul class="rounded-md shadow-xs py-2">
          <slot />
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class LayoutAuthDropdown extends Vue {
  @Prop({ type: String, required: true }) icon!: string;

  isOpen = false;

  get iconName(): string {
    return this.isOpen ? 'times' : this.icon;
  }

  get spin(): boolean {
    return this.iconName === 'spinner';
  }

  handleClick(): void {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.isOpen = true;
    }
  }

  closeMenu(): void {
    (this.$refs.dropdownbutton as HTMLButtonElement).blur();
    this.isOpen = false;
  }
}
</script>
