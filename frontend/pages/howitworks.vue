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
      <StyledList :list="processes" isCentered bubbleText />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StyledButton from '~/components/StyledButton.vue';
import StyledList from '~/components/StyledList.vue';

export default Vue.extend({
  name: 'HowItWorks',
  components: {
    StyledButton,
    StyledList,
  },
  data() {
    return {
      processes: [
        {
          title: 'Apply',
          information: [
            'Your learning adventure starts the moment you decide to join Chingu.',
          ],
        },
        {
          title: 'Prepare',
          information: [
            "Finish or submit a project to make sure you're prepared for the program.",
          ],
        },
        {
          title: 'Placement',
          information: [
            'Get placed in a remote team of Chingus eager to learn.',
          ],
        },
        {
          title: 'Build, Build, Build',
          information: [
            'Decide on a project and build it together. Practice critical team workflow.',
          ],
        },
        {
          title: 'Persevere',
          information: [
            'Overcome obstacles real developers face. Level up as a human.',
          ],
        },
        {
          title: 'Keep Building',
          information: ['Continue building!'],
        },
        {
          title: 'Succeed & Repeat',
          information: ['Get a job, join another Voyage - or do both.'],
        },
      ],
    };
  },
});
</script>

<style lang="postcss" scoped>
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
