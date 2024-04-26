const Joi = require("joi");

const paymentSchema = Joi.object({
  email: Joi.string().email().required(),
  amount: Joi.number().required(),
});

module.exports = paymentSchema;
