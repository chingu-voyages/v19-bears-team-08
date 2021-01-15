<template>
  <div>
    <StyledHero
      header="Developer Voyages"
      subText="
        A Chingu Voyage is a remote 6-week program for web developers.
        You will build a project in a remote team and level-up with the technical and soft skills required in a professional software job."
      imgSrc="/page/howitworks/TeamSpirit.svg"
      imgAlt="team spirit"
    >
      <StyledButtonGroup>
        <StyledButton green normal to="/login" text="Create an Account" />
        <StyledButton pink inverted to="/about" text="About Us" />
      </StyledButtonGroup>
    </StyledHero>

    <div
      class="my-6 md:my-8 flex flex-col items-center md:items-start lg:items-center"
    >
      <StyledHeader level="h2" text="Our Process" />
      <StyledList :list="processes" isCentered isNumbered />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HowItWorks',
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
};
</script>
