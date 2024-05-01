const Joi = require("joi");

const sendPaymentConfirmationSchema = Joi.object({
  amount: Joi.number().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  taxes: Joi.number().required(),
  tip: Joi.number().required(),
  total: Joi.number().required(),
});

module.exports = sendPaymentConfirmationSchema;
