<template>
  <div>
    <StyledHero
      splitBody
      header="We're Sorry"
      :subText="`
        We've experienced an error.
        ${'< ' + message + ' >'}
        If you continue to experience this issue, please inform us.
      `"
      imgSrc="/page/error/BlankCanvas.svg"
      imgAlt="blank canvas"
    >
      <StyledButtonGroup>
        <nuxt-link to="/">
          <StyledButton green normal>Go Home</StyledButton>
        </nuxt-link>

        <StyledButton pink inverted :onClick="goBack">
          Go Back
        </StyledButton>
      </StyledButtonGroup>
    </StyledHero>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

type ErrorType = {
  message: string;
  statusCode: number;
};

@Component({
  head() {
    return {
      title: 'Error | Chingu',
    };
  },
})
export default class ErrorPage extends Vue {
  @Prop({ type: Object }) error!: ErrorType;

  get message(): string {
    return this.error.message;
  }

  goBack(): void {
    this.$router.back();
  }
}
</script>
