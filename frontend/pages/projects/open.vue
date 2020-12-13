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

    <div v-if="!projects.length" class="text-lg text-center">
      No open projects available currently.
    </div>

    <div
      v-else
      class="flex flex-wrap justify-center md:justify-between items-center md:items-start"
    >
      <Intersect
        v-for="project in projects"
        :key="project._id"
        :enter="entry => handleCardEnter(entry, project._id, project.link)"
      >
        <StyledOpenProjectCard :project="project" />
      </Intersect>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { OpenProjectCard } from '~/types/open-project';
import { GithubRepo } from '~/types/github-repo';

@Component({
  // asyncData(ctx) {
  //   return ctx.$axios
  //     .$get('/projects')
  //     .then(({ projects }) => ({ projects }))
  //     .catch(err => ctx.error(err));
  // },
  fetchOnServer: false,
  head() {
    return {
      title: 'Open Projects | Chingu',
    };
  },
})
export default class OpenProjects extends Vue {
  projects: OpenProjectCard[] = [
    {
      isLoadingRepoDeets: true,
      _id: 'idk',
      ownerId: 'idk',
      link: 'dastrong/eslintherok-front',
    },
    {
      isLoadingRepoDeets: true,
      _id: 'idk3',
      ownerId: 'idk3',
      link: 'chingu-voyages/v16-bears-team-04',
    },
    {
      isLoadingRepoDeets: true,
      _id: 'idk2',
      ownerId: 'idk2',
      link: 'chingu-voyages/v19-bears-team-08',
    },
    {
      isLoadingRepoDeets: true,
      _id: 'idk7',
      ownerId: 'idk7',
      link: 'chingu-voyages/v19-bears-team-08l',
    },
  ];

  // async fetch(): Promise<void> {
  //   this.$toast.info('Grabbing repository details...');

  //   const allRepoDetails = this.projects.map(({ link }) =>
  //     this.$axios.$get(`https://api.github.com/repos/${link}`)
  //   );

  //   await Promise.all(allRepoDetails)
  //     .then((data: RepoDeets[]) => {
  //       this.projects = this.projects.map((project, i) => ({
  //         ...project,
  //         ownerImg: data[i].owner.avatar_url,
  //         repoName: data[i].name,
  //         description: data[i].description,
  //         issueCount: data[i].open_issues,
  //         language: data[i].language,
  //         liveUrl: data[i].homepage,
  //         repoUrl: data[i].html_url,
  //       }));
  //       console.log(this.projects);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.$toast.clear();
  //       this.$toast.error("Sorry, we couldn't grab those extra details.");
  //     });
  // }

  handleCardEnter(
    entry: IntersectionObserverEntry,
    id: string,
    link: string
  ): Promise<void> {
    console.log(entry);
    // return this.$axios
    //   .$get(`https://api.github.com/repos/${link}`)
    //   .then((data: GithubRepo) => {
    //     const projectIdx = this.projects.findIndex(({ _id }) => _id === id);
    //     if (projectIdx === -1) {
    //       this.$toast.error(`Unexpected error with project: ${id}`);
    //     } else {
    //       const updatedProject = {
    //         ...this.projects[projectIdx],
    //         isLoadingRepoDeets: false,
    //         ownerUrl: data.owner.html_url,
    //         ownerImg: data.owner.avatar_url,
    //         repoName: data.name,
    //         description: data.description,
    //         issueCount: data.open_issues,
    //         language: data.language,
    //         liveUrl: data.homepage,
    //         repoUrl: data.html_url,
    //         lastUpdated: data.updated_at,
    //       };
    //       this.$set(this.projects, projectIdx, updatedProject);
    //     }
    //   })
    //   .catch(err => console.log(err));
  }
}
</script>
