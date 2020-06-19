const nodemailer = require("nodemailer");
const { pugEngine } = require("nodemailer-pug-engine");

const defaultMailOptions = {
  from: process.env.MAILER_EMAIL,
};

const mailer = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

mailer.use(
  "compile",
  pugEngine({
    templateDir: "./views",
    pretty: true,
  })
);

// pass ANY nodemailer options // 'from' is already set and can't be overidden courrently
// template = which template should we use
// ctx = contains the variables that will be passed to the template
const sendMail = (
  mailOptions = {
    template: "",
    ctx: {},
  }
) => mailer.sendMail({ ...mailOptions, ...defaultMailOptions });

module.exports = sendMail;
