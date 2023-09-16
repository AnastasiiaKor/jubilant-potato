const Joi = require("joi");

const createIntentSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = createIntentSchema;
