<template>
  <div class="container">
    <div class="flex flex-col md:flex-row items-center">
      <div class="flex flex-col items-start w-3/5">
        <h2 class="text-left w-full mb-2">Developer Voyages</h2>
        <p>
          A Chingu Voyage is a remote 6-week program for web developers. You
          will build a project in a remote team and level-up with the technical
          and soft skills required in a professional software job.
        </p>
        <div class="flex mt-2">
          <nuxt-link to="/login">
            <StyledButton green normal>
              Create an Account
            </StyledButton>
          </nuxt-link>
          <nuxt-link to="/about" class="ml-3">
            <StyledButton pink inverted>
              About Us
            </StyledButton>
          </nuxt-link>
        </div>
      </div>
      <img
        src="/page/howitworks/TeamSpirit.svg"
        alt="team spirit"
        class="w-2/5 ml-2"
      />
    </div>

    <div class="flex flex-col">
      <h2 class="mb-2">Our Process</h2>

      <div
        v-for="(process, index) in processes"
        :key="process.title"
        class="flex items-center h-32 md:h-20"
      >
        <div class="relative flex justify-center items-center h-full mr-4">
          <div
            class="flex justify-center items-center rounded-full h-10 w-10 bg-green transform transition-transform duration-150"
          />
          <span
            class="absolute h-full w-1 bg-green"
            :class="{
              'first-connector': index === 0,
              'last-connector': index === processes.length - 1,
            }"
          />
          <div class="absolute text-white font-bold">
            {{ index + 1 }}
          </div>
        </div>
        <div>
          <h4>{{ process.title }}</h4>
          <p>{{ process.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StyledButton from '~/components/StyledButton.vue';

export default Vue.extend({
  name: 'HowItWorks',
  components: {
    StyledButton,
  },
  data() {
    return {
      processes: [
        {
          title: 'Apply',
          description:
            'Your learning adventure starts the moment you decide to join Chingu.',
        },
        {
          title: 'Prepare',
          description:
            "Finish or submit a project to make sure you're prepared for the program.",
        },
        {
          title: 'Placement',
          description: 'Get placed in a remote team of Chingus eager to learn.',
        },
        {
          title: 'Build, Build, Build',
          description:
            'Decide on a project and build it together. Practice critical team workflow.',
        },
        {
          title: 'Persevere',
          description:
            'Overcome obstacles real developers face. Level up as a human.',
        },
        { title: 'Keep Building', description: 'Continue building!' },
        {
          title: 'Succeed & Repeat',
          description: 'Get a job, join another Voyage - or do both.',
        },
      ],
    };
  },
});
</script>

<style lang="postcss">
.container > div {
  @apply my-16;
}
.container > div:first-child {
  @apply mt-0;
}
.container > div:last-child {
  @apply mb-0;
}
.first-connector {
  height: 50%;
  bottom: 0;
}
.last-connector {
  height: 50%;
  top: 0;
}
</style>
