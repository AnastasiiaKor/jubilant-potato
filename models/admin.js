const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const adminSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: false }
);

const commonAdminSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

adminSchema.post("save", HandleMongooseError);

const Admin = model("admin", adminSchema);

module.exports = { Admin, commonAdminSchema };
