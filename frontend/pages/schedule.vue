<template>
  <div>
    <h2 class="mb-2">Schedule</h2>
    <p>We start a new voyage launch on the first Sunday of every month</p>

    <!-- Timeline -->
    <Timeline>
      <TimelineRibbon width="17%" color="#95F2FF" text="Preparation" />
      <TimelineRibbon width="23%" color="#FEA1E9" text="Solo Project" />
      <TimelineRibbon width="45%" color="#A1FEB0" text="Voyage" />
      <TimelineRibbon width="15%" color="#A1D1FE" text="Showcase" />
    </Timeline>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Timeline from '~/components/Timeline.vue';
import TimelineRibbon from '~/components/TimelineRibbon.vue';

@Component({
  components: {
    Timeline,
    TimelineRibbon,
  },
})
export default class Schedule extends Vue {}
</script>

<style></style>
