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
          <StyledButton normal green>View Open Projects</StyledButton>
        </nuxt-link>
        <nuxt-link to="/login">
          <StyledButton inverted pink>Login</StyledButton>
        </nuxt-link>
      </StyledButtonGroup>
    </StyledHero>

    <form class="w-full max-w-md" @submit.prevent="verifyRepo">
      <StyledInput
        v-model="githubRepoUrl"
        required
        name="githubRepoUrl"
        label="Github Repo Url"
        :minLength="3"
        placeholder="Enter your repo url here"
        showInlineButton
        buttonText="Search"
      />
    </form>

    <div
      class="flex flex-col items-center md:items-start lg:items-center w-full pt-1 sm:p-2 md:p-4"
    >
      <StyledHeader level="h2" text="Your Repo Preview" />

      <div v-if="!project.ownerName" class="text-center">
        Please enter your GitHub repository URL above and search first.
      </div>

      <template v-else>
        <StyledOpenProjectCard :project="project" />

        <StyledButton normal green :onClick="handleSubmit">
          Submit Project
        </StyledButton>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { OpenProjectCard } from '~/types/open-project';
import { GithubRepo } from '~/types/github-repo';

type CachedProject = OpenProjectCard & { url: string };

@Component({
  head() {
    return {
      title: 'Add Project | Chingu',
    };
  },
})
export default class AddProjectPage extends Vue {
  githubRepoUrl: string = '';
  project: OpenProjectCard = {};
  cachedProjects: CachedProject[] = [];

  @Watch('githubRepoUrl')
  onRepoChange(): void {
    if (!this.project.repoName) return;
    this.project = {};
  }

  checkUrl(): string[] | void {
    try {
      // extract the owner and name from repo url
      return this.githubRepoUrl.split('github.com/')[1].split('/');
    } catch (err) {
      console.log(err);
      this.$toast.error('Invalid Repo Url');
    }
  }

  verifyRepo() {
    const repo = this.checkUrl();
    if (!repo) return;

    const [owner, name] = repo;
    const url = `https://api.github.com/repos/${owner}/${name}`;

    // check cachedProjects to see if the user has already search this one
    const cachedProject = this.cachedProjects.find(
      cachedProject => cachedProject.url.toLowerCase() === url.toLowerCase()
    );
    if (cachedProject) {
      this.project = cachedProject;
      console.log('cached project');
      return;
    }

    this.$axios
      .$get(url)
      .then((data: GithubRepo) => {
        console.log(data);
        // extract the data we want
        const project = {
          ownerUrl: data.owner.html_url,
          ownerName: data.owner.login,
          ownerImg: data.owner.avatar_url,
          repoName: data.name,
          description: data.description,
          issueCount: data.open_issues,
          language: data.language,
          liveUrl: data.homepage,
          repoUrl: data.html_url,
          lastUpdated: data.updated_at,
        };
        // since it's a successful new search - add project repo to 'cache'
        this.cachedProjects.push({ ...project, url });
        // set project
        this.project = project;
      })
      .catch(err => {
        console.log(err);
        this.$toast.clear();
        this.$toast.error('Repo not found. Please try again.');
      });
  }

  handleSubmit() {
    this.$axios
      .$post('/projects', {
        repoOwner: this.project.ownerName,
        repoName: this.project.repoName,
      })
      .then(data => {
        console.log(data);
        this.$toast.success('Successfully added your project to our list.');
      })
      .catch(err => {
        console.log(err);
        this.$toast.error('Unexpected error. Please try again later.');
      });
  }
}
</script>
