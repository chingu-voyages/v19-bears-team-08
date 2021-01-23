# Chingu Dashboard (frontend)

## Tech Choices

I've used React for over the past year and wanted to try out Vue because I've heard many good things about it and I'm interested in learning something new to expand my skillset.

I choose to build the dashboard with [Nuxt](https://nuxtjs.org), mostly because it's the Vue equivilant to React's Next (which I absolutely love).

Styling will be done with [TailwindCSS](https://tailwindcss.com/) because I enjoyed my previous experience with it and I wanted more control over the styling.

You may notice an inconsistency between component setups. Some use class components, while others use the more traditional Vue way. Since this started as a learning project, the inconsistency was a trade off of learning different approaches.

## How to Get Started

Follow the steps below to get started locally and if you run into any issues, please [open an issue](https://github.com/chingu-voyages/v19-bears-team-08/issues/new).

- Clone the Repo (*if you haven't already*)

  ```bash
  git clone https://github.com/chingu-voyages/v19-bears-team-08.git
  ```

- Navigate to the frontend folder

- Install dependencies

  ```bash
  npm install
  ```

- Create a `.env` file in backend root

  ```bash
  # Github OAuth Credentials
  # https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app
  GITHUB_CLIENT_ID="______"
  GITHUB_CLIENT_SECRET="______"

  # Backend API URL - Development Only
  API_URL=http://localhost:4000/api
  ```


- Start a Nuxt server

  ```bash
  npm run dev

  # You'll see many console messages, but the last two should be:
  # `Listening on: http://localhost:3000/`
  # `No issues found.`
  ```

- The frontend server is now ready. Happy coding.

- While the server is running, you can visualize the Tailwind configurations [here](http://localhost:3000/_tailwind).

## VS Code Extensions

It's not necessary to use VS Code with this project, but to get up and running quickly, I'd suggest using it. If you use another IDE and get it all sorted, please create a PR with that info below this VS Code section for others to use.

The following are extensions that I'd suggest installing/enabling while working.

> *Note:* you should open and work from within the `frontend` folder, so these extensions work correctly. 

- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Sass](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## ESLint / Prettier / Typescript Info
I've done quite a bit of work to ensure those mentioned above are set up correctly moving forward. There's a couple things to take note of, before you begin your coding.
- The pre-commit hook has two commands that run for staged files:
  - One will only check staged `.ts` files for TypeScript errors
  - The others checks all `.{ts,js,vue}` files for Prettier/ESLint errors
    - ESLint warnings won't cause a commit to fail, only errors.
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur) will check your files while you're coding
  - You should have auto-completion within your Vue `template` and `script` tags
  - You should also see ESLint errrors/warning
  - **Remember:** the pre-commit hook won't catch type errors in `.vue` files, so if you notice an error, please fix it prior to committing that file