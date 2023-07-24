const Joi = require("joi");

const sendEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = sendEmailSchema;
