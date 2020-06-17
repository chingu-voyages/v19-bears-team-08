# Chingu Dashboard (frontend)

## Tech Choices

I've used React for over the past year and wanted to try out Vue because I've heard many good things about it and I'm interested in learning something new to expand my skillset.

I choose to build the dashboard with NuxtJS, mostly because it's the Vue equivilant to React's NextJS (which I absolutely love).

Styling will be done with TailwindCSS because I enjoyed my previous experience with it and I wanted more control over the styling.

I'm attempting to write most of the code in TypeScript, but my main goal is to learn Vue, so I may use `any` more than I have before if I hit some weird issues.

## Build Setup

```bash
# install dependencies
$ npm install

# create .env file (refer to the .env file below)

# install Vetur from the VSCode marketplace for development purposes

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```


## .env file
```
GITHUB_CLIENT_ID = string
GITHUB_CLIENT_SECRET = string
```

> For detailed explanation on how things work, check out the [Nuxt.js docs](https://nuxtjs.org).
