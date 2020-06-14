<template>
  <div>
    <h2 class="mb-4">Pricing</h2>

    <div class="flex flex-col md:flex-row my-6">
      <div
        v-for="option in options"
        :key="option.title"
        class="flex w-full flex-col items-center p-2"
      >
        <h3>{{ option.title }}</h3>
        <p class="text-center">{{ option.subtitle }}</p>
        <h2 class="mb-2">{{ currency + option.price }}</h2>
        <nuxt-link to="/login">
          <StyledButton green normal>
            Apply Now
          </StyledButton>
        </nuxt-link>
        <ul>
          <li
            v-for="perk in option.perks"
            :key="perk"
            class="my-3 flex items-center"
          >
            <span />
            {{ perk }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import StyledButton from '~/components/StyledButton.vue';

export default {
  name: 'Pricing',
  components: {
    StyledButton,
  },
  data() {
    return {
      currency: '$',
      options: [
        {
          title: 'Voyage Cohort',
          subtitle: 'For those who want to level-up',
          price: 29,
          perks: [
            'Matched with a remote developer team',
            '6 weeks of team developer experience',
            '1 team developer project for your portfolio',
            '6 pair-programming matches',
            'Completion Certificate',
            'Connect with a community of learners who share your goal',
            'Get out of tutorial purgatory',
          ],
        },
        {
          title: 'Job-Ready Path',
          subtitle: 'For those who want to get a job within a year',
          price: 129,
          perks: [
            'Join all Voyage sessions in a year (up to 6)',
            '1 year of developer experience for your resume',
            '6 team projects in your portfolio',
            '50 pair-programming matches',
            'Completion Certificates',
          ],
        },
      ],
    };
  },
  head() {
    return {
      title: 'Pricing | Chingu',
    };
  },
};
</script>

<style lang="postcss" scoped>
li span:before {
  content: '🚀';
  @apply mr-1;
}
</style>
