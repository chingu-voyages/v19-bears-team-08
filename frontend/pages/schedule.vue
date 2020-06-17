<template>
  <div>
    <div
      class="my-6 md:my-8 flex flex-col-reverse md:flex-row md:flex-row items-center"
    >
      <div
        class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
      >
        <StyledHeader level="h1">Our Schedules</StyledHeader>
        <p class="mb-6 text-center md:text-left">
          We offer two types of services: voyages and pair-programming. The
          former is 6 weeks in length and the latter can be anything from 30
          minutes to a couple of hours. Below you'll find a breakdown of each
          service's schedule
        </p>
        <div class="flex">
          <nuxt-link to="/login">
            <StyledButton green normal>
              Create an Account
            </StyledButton>
          </nuxt-link>
          <nuxt-link to="/pricing" class="ml-3">
            <StyledButton pink inverted>
              View Pricing
            </StyledButton>
          </nuxt-link>
        </div>
      </div>
      <img
        src="/page/schedule/Events.svg"
        alt="girl looking at a calendar"
        class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-2"
      />
    </div>

    <div class="my-6 md:my-8 flex flex-col">
      <StyledHeader level="h2">Voyages</StyledHeader>
      <blockquote
        class="text-gray-800 py-4 px-8 mt-3 mb-4 mx-0 bg-gray-300 border-pink border-l-4 italic"
      >
        <p class="text-gray-700">
          We start a new voyage launch on the first Sunday of every month
        </p>
      </blockquote>
      <StyledList :list="voyageSchedule" />
    </div>

    <div class="my-6 md:my-8 flex flex-col">
      <StyledHeader level="h2">Pair Programming</StyledHeader>
      <blockquote
        class="text-gray-800 py-4 px-8 mt-3 mb-4 mx-0 bg-gray-300 border-pink border-l-4 italic"
      >
        <p class="text-gray-700">
          We start a new voyage launch on the first Sunday of every month
        </p>
      </blockquote>
      <StyledList :list="pairProgramSchedule" isCentered listDesc />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledButton from '~/components/StyledButton.vue';
import StyledList from '~/components/StyledList.vue';

@Component({
  components: {
    StyledHeader,
    StyledButton,
    StyledList,
  },
  head() {
    return {
      title: 'Schedule | Chingu',
    };
  },
})
export default class Schedule extends Vue {
  voyageSchedule = [
    {
      title: 'Preparation',
      information: [
        'Sign up',
        'Familiarize yourself with our voyage process',
        'Receive Discord invitation',
      ],
    },
    {
      title: 'Solo Project',
      information: [
        'Choose a solo project',
        'Use discord groups for assistance',
        'Submit solo project for evaluation',
        'Receive feedback and tier suggestion',
      ],
    },
    {
      title: 'Voyage',
      information: [
        'Groups and GitHub repo created',
        'Select a team project and project manager',
        'Determine your MVP',
        'Assign tasks, complete them, and repeat',
        'Check-ins due each Monday',
      ],
    },
    {
      title: 'Showcase',
      information: [
        'Submit final project',
        'Complete voyage survey',
        'View other voyage projects and self reflect',
      ],
    },
  ];

  pairProgramSchedule = [
    {
      title: 'Preparation',
      information: [
        'Sign up by Tuesday 6pm GMT-4 (New York)',
        'Familiarize yourself with our pair programming section',
        'Receive Discord invitation on Wednesday',
      ],
    },
    {
      title: 'Pair Program',
      information: [
        'One week to work with your partner',
        'Aim to complete at least 1 one hour session',
      ],
    },
  ];
}
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
</style>
