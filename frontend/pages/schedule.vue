<template>
  <div>
    <StyledHero
      header="Our Schedules"
      subText="
        We offer two types of services: voyages and pair-programming. 
        The former is 6 weeks in length and the latter can be anything from 30 minutes to a couple of hours. 
        Below you'll find a breakdown of each service's schedule."
      imgSrc="/page/schedule/Events.svg"
      imgAlt="girl looking at a calendar"
    >
      <StyledButtonGroup>
        <StyledButton green normal to="/login" text="Create an Account" />
        <StyledButton pink inverted to="/pricing" text="View Pricing" />
      </StyledButtonGroup>
    </StyledHero>

    <div
      class="my-6 md:my-8 flex flex-col items-center md:items-start lg:items-center"
    >
      <StyledHeader level="h2" text="Voyages" />
      <blockquote
        class="text-gray-800 w-10/12 py-4 px-8 mt-3 mb-4 mx-0 bg-gray-300 border-pink border-l-4 italic"
      >
        <p class="text-gray-700">
          We start a new voyage launch on the first Sunday of every month
        </p>
      </blockquote>
      <StyledList :list="voyageSchedule" />
    </div>

    <div
      class="my-6 md:my-8 flex flex-col items-center md:items-start lg:items-center"
    >
      <StyledHeader level="h2" text="Pair Programming" />
      <blockquote
        class="text-gray-800 w-10/12 py-4 px-8 mt-3 mb-4 mx-0 bg-gray-300 border-pink border-l-4 italic"
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

@Component({
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
