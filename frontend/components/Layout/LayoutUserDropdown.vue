<template>
  <div class="relative">
    <!-- <LayoutUserDropdownButton />
    <LayoutUserDropdownMenu /> -->

    <button
      ref="LayoutUserDropdownButton"
      :class="
        isOpen
          ? 'border-pink focus:border-pink'
          : 'border-transparent focus:border-green'
      "
      class="content-center rounded-full w-12 h-12 border hover:border-green focus:outline-none"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggleMenu"
      @keyup.esc="closeMenu"
      @keydown.tab="setKeyboardUse"
      @blur="closeAndBlur"
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
        <ul role="menu" aria-label="User" class="rounded-md shadow-xs py-2">
          <li
            v-for="(link, i) in authLinks"
            :key="link.to"
            role="menu-item"
            class="w-full lg:w-auto flex mb-0"
          >
            <nuxt-link
              :to="link.to"
              class="w-full h-full text-sm sm:text-base p-2 sm:p-3 text-center text-gray-800 hover:text-pink hover:no-underline"
              exactActiveClass="text-pink"
              data-dropdownitem="LayoutUserDropdownMenuItem"
              @keydown.native.tab="
                checkAndClose(i === authLinks.length - 1, $event)
              "
              @keydown.native.esc="closeAndFocus"
              @blur.native="blurLogic(i === authLinks.length - 1, $event)"
            >
              {{ link.text }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import { links } from '~/utils';

@Component
export default class LayoutUserDropdown extends Vue {
  @Prop({ type: String, required: true }) icon!: string;

  isOpen = false;
  isKeyboardUse = false;

  get authLinks() {
    return this.$auth.loggedIn ? links.restricted : links.auth;
  }

  get iconName(): string {
    return this.isOpen ? 'times' : this.icon;
  }

  get spin(): boolean {
    return this.iconName === 'spinner';
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    this.isKeyboardUse = false;
  }

  openMenu(): void {
    this.isOpen = true;
    this.isKeyboardUse = false;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  closeAndBlur(e: FocusEvent): void {
    // if the user tabs to an opened menu, don't close the menu
    if (this.isKeyboardUse) return;

    // if the user clicks and holds on an item in the dropdown don't close the list
    // the list will close upon route change already
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget?.dataset.dropdownitem === 'LayoutUserDropdownMenuItem')
      return;

    // otherwise close the menu and remove it's focus
    this.closeMenu();
    (this.$refs.LayoutUserDropdownButton as HTMLButtonElement).blur();
  }

  closeAndFocus() {
    this.closeMenu();
    (this.$refs.LayoutUserDropdownButton as HTMLButtonElement).focus();
  }

  setKeyboardUse(e: KeyboardEvent): void {
    if (e.shiftKey && e.key === 'Tab') {
      // if the user does shift+tab we need to close the menu
      this.closeMenu();
    } else {
      // otherwise the user is tabbing forward and we need to keep the menu open
      this.isKeyboardUse = true;
    }
  }

  checkAndClose(isLastItem: boolean, e: KeyboardEvent): void {
    // if it's the last item in, we need to close the menu
    if (isLastItem && !e.shiftKey) {
      this.closeMenu();
    }
  }

  blurLogic(isLastItem: boolean, e: FocusEvent): void {
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    if (relatedTarget?.dataset.dropdownitem === 'LayoutUserDropdownMenuItem') {
      if (!isLastItem) return;
      this.closeMenu();
    } else {
      this.closeMenu();
    }
  }

  @Watch('$nuxt.$route.path')
  onRouteChange() {
    this.isOpen = false;
  }
}
</script>
