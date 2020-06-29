const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

// set the correct variables for the correct environments
// I used MailTrap for development - https://mailtrap.io/
const mailerSettings =
  process.env.NODE_ENV === "production"
    ? {
        service: "Gmail",
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD,
        },
      }
    : {
        host: process.env.DEV_MAILER_HOST,
        port: process.env.DEV_MAILER_PORT,
        auth: {
          user: process.env.DEV_MAILER_USER,
          pass: process.env.DEV_MAILER_PASS,
        },
      };

const mailer = nodemailer.createTransport(mailerSettings);

mailer.use("compile", pugEngine({ templateDir: "./views/templates" }));

// pass ANY nodemailer options // 'from' is already set and can't be overidden currently
// template = which template should we use
// ctx = contains the variables that will be passed to the template
//       refer to the files in views/templates to see the necessary variables
const sendMail = (
  options = {
    template: "",
    to: "",
    subject: "RE: Your Chingu account",
    ctx: {},
  }
) => mailer.sendMail({ ...options, from: process.env.MAILER_EMAIL });

module.exports = sendMail;
