<template>
  <div>
    <div
      class="my-6 md:my-8 flex flex-col-reverse md:flex-row md:flex-row items-center"
    >
      <div
        class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
      >
        <StyledHeader level="h1">Developer Voyages</StyledHeader>
        <p class="mb-6 text-center md:text-left">
          A Chingu Voyage is a remote 6-week program for web developers. You
          will build a project in a remote team and level-up with the technical
          and soft skills required in a professional software job.
        </p>
        <div class="flex">
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
        class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-2"
      />
    </div>

    <div class="my-6 md:my-8 flex flex-col ">
      <StyledHeader level="h2">Our Process</StyledHeader>
      <StyledList :list="processes" isCentered bubbleText />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledButton from '~/components/StyledButton.vue';
import StyledList from '~/components/StyledList.vue';

export default Vue.extend({
  name: 'HowItWorks',
  components: {
    StyledHeader,
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
  head() {
    return {
      title: 'How It Works | Chingu',
    };
  },
});
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
