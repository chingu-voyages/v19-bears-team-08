<template>
  <div class="container">
    <div class="flex flex-col md:flex-row items-center">
      <div class="flex flex-col items-start w-3/5">
        <StyledHeader level="h1">
          Boost Your Career
        </StyledHeader>
        <p>
          All self-directed developers run into the same problems. No team
          experience, feeling lost working alone, endless tutorials, not enough
          finished projects. The good news? Chingu solves them.
        </p>
        <div class="flex mt-2">
          <nuxt-link to="/login">
            <StyledButton green normal>
              Create an Account
            </StyledButton>
          </nuxt-link>
          <nuxt-link to="/howitworks" class="ml-3">
            <StyledButton pink inverted>
              How It Works
            </StyledButton>
          </nuxt-link>
        </div>
      </div>
      <img
        src="/page/about/ToTheStars.svg"
        alt="team spirit"
        class="w-2/5 ml-2"
      />
    </div>

    <div class="flex justify-between">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="flex flex-col items-center text-center mx-3"
      >
        <h2>{{ stat.num }}</h2>
        <h5 class="text-gray-700 font-bold mb-2">{{ stat.title }}</h5>
        <p>{{ stat.body }}</p>
      </div>
    </div>

    <div class="text-center">
      <h2 class="mb-2">
        Past Voyager Experiences
      </h2>
      <p class="mb-2 text-gray-600 text-lg">
        Chingu has helped thousands of people accelerate their learning
      </p>
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.author"
        class="max-w-xl mx-auto mt-6"
      >
        <h6 class="mb-2">"{{ testimonial.text }}"</h6>
        <p class="text-gray-700 italic">{{ testimonial.author }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StyledHeader from '~/components/StyledHeader.vue';
import StyledButton from '~/components/StyledButton.vue';

export default Vue.extend({
  name: 'About',
  components: {
    StyledHeader,
    StyledButton,
  },
  data() {
    return {
      stats: [
        {
          num: '2,028',
          title: 'Developer Teams',
          body:
            'We launch remote developer teams from all skill levels, from all timezones, and from most web dev languages & frameworks.',
        },
        {
          num: '11,150+',
          title: 'Coders & Designers',
          body:
            'Chingu has helped thousands of people learning in-demand skills accelerate their learning through collaboration and project-building.',
        },
        {
          num: '3,200+',
          title: 'Pair-Programming Hours',
          body:
            'We love to optimally match learners from around the world. Whether in a team setting or for a one-time meeting to complete a challenge.',
        },
      ],
      testimonials: [
        {
          text:
            'I got my first developer job at the age of 35 largely due to the technical AND soft skills I gained through Chingu.',
          author: 'Eric Zumwalt, USA',
        },
        {
          text:
            'I realized pretty quickly that I was learning more from the Voyage project than from everything I did in the entire rest of the year put together.',
          author: 'Sarah Schneider, USA',
        },
        {
          text:
            'Chingu was a great place for me because while working on the projects there, I honed my skills and I learned how to collaborate with other developers. During my job interview process, I was able to speak on the projects I worked on at Chingu. It impressed my interviewers and consequently, I landed a job at a Fortune 500.',
          author: 'Owen Ekhator, USA',
        },
      ],
    };
  },
  head() {
    return {
      title: 'About | Chingu',
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
</style>
