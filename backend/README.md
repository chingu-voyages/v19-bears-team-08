# Chingu Dashboard (backend)

## Tech Choices

It's your basic Express, Mongoose and MongoDB setup.

We use [Nodemailer](https://nodemailer.com/) to send emails to users, [MailTrap](https://mailtrap.io/) to test these emails in development and [PUG](https://pugjs.org/) to style them.

Code is formatted with [Prettier](https://prettier.io/).

[Postman](https://www.postman.com/) is mainly used for testing routes.

## How To Get Started

There's a couple things you need in order to get up and running smoothly across. Please follow the steps to get started and if you run into any issues, please [open an issue](https://github.com/chingu-voyages/v19-bears-team-08/issues/new).

- Clone the Repo (_if you haven't already_)

  ```bash
  git clone https://github.com/chingu-voyages/v19-bears-team-08.git
  ```

- Navigate to the backend folder

- Install dependencies

  ```bash
  npm install
  ```

- Create a `.env` file in backend root

  ```bash
  # MongoDB Atlas Connection String
  # https://www.mongodb.com/cloud/atlas
  DB_CONNECT="______"

  # Secret String for JWT
  TOKEN_SECRET="______"

  # Email - Production Only
  # account where emails are sent from in production
  MAILER_EMAIL="______@gmail.com"
  MAILER_PASSWORD="______"

  # Email - Development Only
  # https://mailtrap.io/ - SMTP
  DEV_MAILER_HOST=smtp.mailtrap.io
  DEV_MAILER_PORT="______"
  DEV_MAILER_USER="______"
  DEV_MAILER_PASS="______"

  # you can remove the quotation marks and underlines
  ```

- Start a self reloading server

  ```bash
  npm run dev

  # TWO messages will pop up, if you're successful:
  # `DB established`
  # `Server listening on port: ${PORT}`
  ```

- The backend server is now ready. Happy coding.
