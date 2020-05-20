const Joi = require("@hapi/joi");

// defined here so we only need to change them in ...
// ... one file instead of changing in Models too
const validationLengths = {
  name: {
    min: 6,
    max: 100,
  },
  email: {
    min: 6,
    max: 320,
  },
  password: {
    min: 6,
    max: 30,
  },
};

const registerValidation = data => {
  const schema = {
    name: Joi.string()
      .min(validationLengths.name.min)
      .max(validationLengths.name.max)
      .required(),
    email: Joi.string()
      .min(validationLengths.email.min)
      .max(validationLengths.email.max)
      .email()
      .required(),
    password: JOI.string()
      .min(validationLengths.password.min)
      .max(validationLengths.password.max)
      .required(),
  };
  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    email: Joi.string()
      .min(validationLengths.email.min)
      .max(validationLengths.email.max)
      .email()
      .required(),
    password: JOI.string()
      .min(validationLengths.password.min)
      .max(validationLengths.password.max)
      .required(),
  };
  return Joi.validate(data, schema);
};

module.exports = {
  validationLengths,
  registerValidation,
  loginValidation,
};
