<template>
  <div
    class="open-project-card shadow-sm rounded-lg bg-white w-full max-w-md md:max-w-lg mb-4 md:mb-5 lg:mb-4 p-3 md:p-4 md:py-4 md:pr-4 border hover:border-green"
  >
    <a :href="project.repoUrl" target="_blank">
      <StyledHeader level="h3" :text="project.repoName || project.link" />
    </a>

    <div class="w-full">
      <div class="pt-1 pb-4">
        <template v-if="project.isLoadingRepoDeets">
          <StyledSkeleton className="h-5 w-4/12 inline-block" />
          <StyledSkeleton className="h-5 w-1/12 inline-block" />
          <StyledSkeleton className="h-5 w-3/12 inline-block" />
        </template>

        <template v-else>{{ project.description }}</template>
      </div>

      <div class="flex justify-between items-center h-6 w-full">
        <div class="flex justify-start items-center">
          <a
            :href="project.repoUrl + '/issues'"
            target="_blank"
            class="text-gray-700 mb-0 mr-2"
          >
            <div class="open-project-card__info flex items-center">
              <fa icon="exclamation-circle" class="mr-1" />
              <StyledSkeleton
                v-if="project.isLoadingRepoDeets"
                className="h-5 w-7/12 inline-block"
              />
              <span v-else>
                {{ getIssueText(project.issueCount) }}
              </span>
            </div>
          </a>
          <div class="open-project-card__info flex items-center mr-2">
            <fa icon="code" class="mr-1" />
            <StyledSkeleton
              v-if="project.isLoadingRepoDeets"
              className="h-5 w-11/12 inline-block"
            />
            <span v-else>
              {{ project.language }}
            </span>
          </div>
        </div>

        <div class="w-6 text-center">
          <fa v-if="project.isLoadingRepoDeets" spin icon="spinner" />
          <a v-else :href="project.ownerUrl" target="_blank">
            <img
              class="h-6 w-6 rounded-full transform transition-transform duration-150 scale-100 hover:scale-105"
              :src="project.ownerImg"
              :alt="project.repoName + 'owner'"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { OpenProjectCard } from '~/types/open-project';

@Component
export default class StyledOpenProjectCard extends Vue {
  @Prop({ type: Object, required: true }) project!: OpenProjectCard;

  getIssueText(issueCount: number | undefined): string {
    if (typeof issueCount === 'undefined') return 'Issues Error';
    const isSingle = issueCount === 1;
    const baseString = `${issueCount} issue`;
    return `${baseString}${isSingle ? '' : 's'}`;
  }

  get issueURL(): string {
    return this.project.repoUrl;
  }
}
</script>

<style lang="postcss">
@screen md {
  .open-project-card {
    padding-left: 1.75rem;
  }
}
@screen lg {
  .open-project-card {
    max-width: calc(50% - 0.5rem);
  }
}

.open-project-card__info {
  width: 6.25rem;
}
</style>
