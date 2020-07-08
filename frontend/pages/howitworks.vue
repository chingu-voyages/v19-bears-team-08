<template>
  <div>
    <StyledHero
      :header="hero.header"
      :subText="hero.subText"
      :imgSrc="hero.imgSrc"
      :imgAlt="hero.imgAlt"
    >
      <StyledButtonGroup>
        <nuxt-link to="/login">
          <StyledButton green normal>
            Create an Account
          </StyledButton>
        </nuxt-link>
        <nuxt-link to="/about">
          <StyledButton pink inverted>
            About Us
          </StyledButton>
        </nuxt-link>
      </StyledButtonGroup>
    </StyledHero>

    <div class="my-6 md:my-8 flex flex-col">
      <StyledHeader level="h2" text="Our Process" />
      <StyledList :list="processes" isCentered bubbleText />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowItWorks',
  data() {
    return {
      hero: {
        header: 'Developer Voyages',
        subText: `
          A Chingu Voyage is a remote 6-week program for web developers.
          You will build a project in a remote team and level-up with the technical and soft skills required in a professional software job.
        `,
        imgSrc: '/page/howitworks/TeamSpirit.svg',
        imgAlt: 'team spirit',
      },
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
};
</script>
