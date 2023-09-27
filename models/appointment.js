const { Schema, model } = require("mongoose");
const { HandleMongooseError } = require("../helpers");
const Joi = require("joi");

const appointmentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    service: {
      type: String,
      enum: ["small-tattoo", "large-tattoo", "permanent", "consultation"],
      required: [true, "Service is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    slot: {
      type: String,
      required: [true, "Slot is required"],
    },
    duration: {
      type: Number,
      enum: [30, 60, 120],
      required: [true, "Duration is reequired"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    description: {
      type: String,
      default: "none",
    },
  },
  { versionKey: false, timestamps: false }
);

const addAppointmentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  service: Joi.string()
    .valid("small-tattoo", "large-tattoo", "permanent", "consultation")
    .required(),
  date: Joi.string().required(),
  slot: Joi.string().required(),
  duration: Joi.number().valid(30, 60, 120).required(),
  address: Joi.string().required(),
  description: Joi.string(),
});

const updateAppointmentSchema = Joi.object({
  date: Joi.string(),
  slot: Joi.string(),
});

const schemas = {
  addAppointmentSchema,
  updateAppointmentSchema,
};

appointmentSchema.post("save", HandleMongooseError);

const Appointment = model("appointment", appointmentSchema);

module.exports = { Appointment, schemas };
