<template>
  <div>
    <div
      class="my-6 md:my-8 flex flex-col-reverse md:flex-row md:flex-row items-center"
    >
      <div
        class="flex flex-col items-center md:items-start self-start w-full md:w-3/5 px-2 md:px-0"
      >
        <StyledHeader level="h1">
          Boost Your Career
        </StyledHeader>
        <p class="mb-6 text-center md:text-left">
          All self-directed developers run into the same problems. No team
          experience, feeling lost working alone, endless tutorials, not enough
          finished projects. The good news? Chingu solves them.
        </p>
        <div class="flex">
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
        class="w-8/12 sm:w-1/2 md:w-2/5 ml-0 md:ml-2"
      />
    </div>

    <div class="my-6 md:my-8 flex flex-col items-center md:items-start">
      <StyledHeader level="h2">Accomplishments</StyledHeader>
      <div class="flex flex-wrap justify-center md:justify-start">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="stat-container flex flex-col items-center w-10/12 md:w-1/3 text-center p-3"
        >
          <h2 class="mb-2">{{ stat.num }}</h2>
          <h5 class="font-bold">{{ stat.title }}</h5>
          <p>{{ stat.body }}</p>
        </div>
      </div>
    </div>

    <div class="my-6 md:my-8 flex flex-col items-center md:items-start">
      <StyledHeader level="h2">Past Voyager Experiences</StyledHeader>
      <p class="mb-2 text-lg text-center md:text-left">
        Chingu has helped thousands of people accelerate their learning
      </p>
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.author"
        class="max-w-xl w-10/12 md:w-full mx-auto mt-6"
      >
        <h6 class="mb-2">"{{ testimonial.text }}"</h6>
        <p class="text-gray-700 italic text-right">{{ testimonial.author }}</p>
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
img {
  margin-bottom: 1.5rem !important;
}
@screen md {
  img {
    margin-bottom: 0 !important;
  }
}
.stat-container {
  min-width: 300px;
}
@screen md {
  .stat-container {
    min-width: 250px;
  }
}
</style>
