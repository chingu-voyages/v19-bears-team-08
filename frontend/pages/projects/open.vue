<template>
  <div>
    <StyledHero
      splitBody
      header="Open Projects"
      subText="
        Sick of creating small apps?
        Want to work on a larger codebase?
        Here's a list of projects from Chingu members.
      "
      imgSrc="/page/projects/Typing.svg"
      imgAlt="code typing"
    >
      <StyledButtonGroup>
        <nuxt-link to="/projects/add">
          <StyledButton normal green>Add Project</StyledButton>
        </nuxt-link>
      </StyledButtonGroup>
    </StyledHero>

    <div v-if="!projects.length" class="text-lg">
      No open projects available currently.
    </div>

    <div v-else>
      <div v-for="project in projects" :key="project._id">{{ project }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

type OpenProject = {
  _id: string;
  ownerId: string;
  link: string;
};

@Component({
  asyncData(ctx) {
    return ctx.$axios
      .$get('/projects')
      .then(({ projects }) => ({ projects }))
      .catch(err => ctx.error(err));
  },
  head() {
    return {
      title: 'Open Projects | Chingu',
    };
  },
})
export default class OpenProjects extends Vue {
  projects: OpenProject[] = [];
}
</script>
