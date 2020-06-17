<template>
  <div>
    <div
      class="my-6 md:my-8 flex flex-col-reverse md:flex-row md:flex-row items-center"
    >
      <div
        class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
      >
        <StyledHeader level="h1">
          Our Pricing
        </StyledHeader>
        <p class="mb-6 text-center md:text-left">
          We have two options available to get started. Try out a single voyage
          or have a year's access to really commit to leveling up.
        </p>
        <div class="flex">
          <nuxt-link to="/schedule">
            <StyledButton green normal>
              View Schedule
            </StyledButton>
          </nuxt-link>
          <nuxt-link to="/faqs" class="ml-3">
            <StyledButton pink inverted>
              Have a Question?
            </StyledButton>
          </nuxt-link>
        </div>
      </div>
      <img
        src="/page/pricing/TwoOptions.svg"
        alt="two options"
        class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-2"
      />
    </div>

    <div class="flex flex-col md:flex-row flex-wrap">
      <div
        v-for="option in options"
        :key="option.title"
        class="pricing-container flex w-full flex-col items-center md:items-start p-2 mb-6 md:mb-8"
      >
        <StyledHeader level="h2">{{ option.title }}</StyledHeader>
        <h6 class="text-center">{{ option.subtitle }}</h6>
        <h1 class="mb-2">{{ currency + option.price }}</h1>
        <nuxt-link to="/login">
          <StyledButton green normal>
            Apply Now
          </StyledButton>
        </nuxt-link>
        <ul class="mt-4 max-w-sm">
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
import StyledHeader from '~/components/StyledHeader.vue';
import StyledButton from '~/components/StyledButton.vue';

export default {
  name: 'Pricing',
  components: {
    StyledHeader,
    StyledButton,
  },
  data() {
    return {
      currency: '$',
      options: [
        {
          title: 'Single Voyage Cohort',
          subtitle: 'For those who want more teamwork experience quickly',
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
          subtitle: 'For those who aim to get a job within a year',
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
img {
  margin-bottom: 1.5rem !important;
}
@screen md {
  img {
    margin-bottom: 0 !important;
  }
}

.pricing-container {
  min-width: 300px;
}

li span:before {
  content: '🚀';
  @apply mr-1;
}
</style>
