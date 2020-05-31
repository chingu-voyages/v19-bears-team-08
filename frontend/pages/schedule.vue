<template>
  <div class="container">
    <h2 class="mb-2">Schedules</h2>

    <div class="flex flex-col">
      <h3 class="mb-2">Voyages</h3>
      <blockquote
        class="text-gray-800 py-4 px-8 mt-3 mb-4 mx-0 bg-gray-300 border-pink border-l-4 italic"
      >
        <p class="text-gray-700">
          We start a new voyage launch on the first Sunday of every month
        </p>
      </blockquote>
      <StyledList :list="voyageSchedule" />
    </div>

    <div class="flex flex-col">
      <h3 class="mb-2">Pair Programming</h3>
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
import StyledList from '~/components/StyledList.vue';

@Component({
  components: {
    StyledList,
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
.container > div {
  @apply my-4;
}
.container > div:last-child {
  @apply mt-16 mb-0;
}
</style>
