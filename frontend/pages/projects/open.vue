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
        <StyledButton normal green to="/projects/add" text="Add Project" />
      </StyledButtonGroup>
    </StyledHero>

    <div v-if="!projects.length" class="text-lg text-center">
      No open projects available currently.
    </div>

    <div
      v-else
      class="flex flex-col justify-center md:justify-between items-center md:items-start lg:items-center w-full"
    >
      <Intersect
        v-for="project in projects"
        :key="project.chingu._id"
        :enter="
          () => handleCardEnter(project.chingu._id, project.chingu.repoName)
        "
      >
        <StyledOpenProjectCard :project="project" />
      </Intersect>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import {
  // OpenProjectChinguTypes,
  OpenProjectCardTypes,
} from '~/types/open-project';
import { GithubRepo } from '~/types/github-repo';

@Component({
  // asyncData(ctx) {
  //   return ctx.$axios
  //     .$get('/projects')
  //     .then(({ projects }: { projects: OpenProjectChinguTypes[] }) => {
  //       console.log(projects);
  //       return {
  //         // set Chingu backend projects and remove placeholder cards
  //         projects,
  //         showPlaceholders: false,
  //       };
  //     })
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
  projects: OpenProjectCardTypes[] = [
    {
      chingu: {
        repoName: 'chingu-voyages/v16-bears-team-04',
        _id: 'sdsds',
        repoOwnerName: 'sdsdsd',
        chinguOwnerId: 'dfdfdf',
      },
    },
    {
      chingu: {
        repoName: 'dastrong/eslintherok-front',
        _id: 'ssdsdsds',
        repoOwnerName: 'sdsdsd',
        chinguOwnerId: 'dfdfdf',
      },
    },
    {
      chingu: {
        repoName: 'RepoName',
        _id: 'sdsdsdfsdfs',
        repoOwnerName: 'sdsdsd',
        chinguOwnerId: 'dfdfdf',
      },
    },
    {
      chingu: {
        repoName: 'RepoName',
        _id: 'sdsdsdfsdfsds',
        repoOwnerName: 'sdsdsd',
        chinguOwnerId: 'dfdfdf',
      },
    },
  ];

  handleCardEnter(id?: string, repoName?: string): Promise<void> {
    return this.$axios
      .$get(`https://api.github.com/repos/${repoName}`)
      .then((data: GithubRepo) => {
        const projectIdx = this.projects.findIndex(
          ({ chingu }) => chingu._id === id
        );
        if (projectIdx === -1) {
          this.$toast.error(`Unexpected error with project: ${id}`);
        } else {
          const updatedProject = {
            ...this.projects[projectIdx],
            github: {
              ownerUrl: data.owner.html_url,
              ownerImg: data.owner.avatar_url,
              description: data.description,
              issueCount: data.open_issues,
              language: data.language,
              liveUrl: data.homepage,
              repoUrl: data.html_url,
              lastUpdated: data.updated_at,
            },
          };
          this.$set(this.projects, projectIdx, updatedProject);
        }
      })
      .catch(err => console.log(err));
  }
}
</script>
