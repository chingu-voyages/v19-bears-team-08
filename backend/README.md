# Chingu Dashboard (backend)

## Tech Choices

I have chosen to use Node.js and mongoDB for the api as I have used them in the past, it is my first time making an API with authenticaion for the login as my pervious projects did not require it.

## Build Setup

```bash
# install dependencies
$ npm install

# production
$ npm run start

# development
$ npm run dev

```

## **.env** file

```
DB_CONNECT = DB_URL_HERE

TOKEN_SECRET = TOKEN_STRING_HERE

MAILER_EMAIL = PROD_EMAIL_ADDRESS_STRING_HERE
MAILER_PASSWORD = PROD_EMAIL_PASSWORD_STRING_HERE

DEV_MAILER_HOST = DEV_EMAIL_HOST_STRING_HERE
DEV_MAILER_PORT = DEV_EMAIL_PORT_STRING_HERE
DEV_MAILER_USER = DEV_EMAIL_USER_STRING_HERE
DEV_MAILER_PASS = DEV_EMAIL_PASS_STRING_HERE
```

> I used [Postman](https://www.postman.com/) for testing the server
