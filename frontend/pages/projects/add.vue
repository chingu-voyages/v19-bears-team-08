<template>
  <div>
    <StyledHero
      header="Add Your Project"
      subText="
        Do you have a project that you're working on, but not enough time to meet every stretch goal?
        Add it here to give others a chance to get some real world experience and meet your goals.
      "
      imgSrc="/page/projects/Typing.svg"
      imgAlt="code typing"
    >
      <StyledButtonGroup>
        <nuxt-link to="/projects/open">
          <StyledButton normal green>View Projects</StyledButton>
        </nuxt-link>
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component({
  head() {
    return {
      title: 'Add Project | Chingu',
    };
  },
})
export default class AddProjectPage extends Vue {}
</script>
