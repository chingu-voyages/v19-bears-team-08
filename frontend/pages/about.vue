<template>
  <div>
    <StyledHero
      header="Boost Your Career"
      subText="
        All self-directed developers run into the same problems. 
        No team experience, feeling lost working alone, endless tutorials, not enough finished projects. 
        The good news? Chingu solves them."
      imgSrc="/page/about/ToTheStars.svg"
      imgAlt="rocket launching"
    >
      <StyledButtonGroup>
        <StyledButton green normal to="/login">Create an Account</StyledButton>
        <StyledButton pink inverted to="/howitworks">How It Works</StyledButton>
      </StyledButtonGroup>
    </StyledHero>

    <div
      class="my-6 md:my-8 flex flex-col items-center md:items-start lg:items-center"
    >
      <StyledHeader level="h2" text="Accomplishments" />
      <div class="flex flex-wrap justify-center md:justify-start">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="stat-container flex flex-col items-center w-10/12 md:w-1/3 text-center p-3"
        >
          <h2 class="mb-2">
            {{ stat.num }}
          </h2>
          <h5 class="font-bold">
            {{ stat.title }}
          </h5>
          <p>
            {{ stat.body }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="my-6 md:my-8 flex flex-col items-center md:items-start lg:items-center"
    >
      <StyledHeader level="h2" text="Past Voyager Experiences" />
      <p class="mb-2 text-lg text-center md:text-left">
        Chingu has helped thousands of people accelerate their learning
      </p>
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.text"
        class="max-w-xl w-10/12 md:w-full mx-auto mt-6"
      >
        <h6 class="mb-2">
          {{ testimonial.text }}
        </h6>
        <p class="text-gray-700 italic text-right">
          {{ testimonial.author }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
type DataTypes = {
  stats: {
    num: string;
    title: string;
    body: string;
  }[];
  testimonials: {
    text: string;
    author: string;
  }[];
};

export default {
  name: 'About',
  data(): DataTypes {
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
};
</script>

<style lang="postcss" scoped>
.stat-container {
  min-width: 300px;
}
@screen md {
  .stat-container {
    min-width: 250px;
  }
}
</style>
