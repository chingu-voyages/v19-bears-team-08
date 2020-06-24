const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

mailer.use("compile", pugEngine({ templateDir: "./views" }));

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
