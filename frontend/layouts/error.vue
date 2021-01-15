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
        <StyledButton green normal to="/" text="Go Home" />
        <StyledButton pink inverted :onClick="goBack" text="Go Back" />
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
