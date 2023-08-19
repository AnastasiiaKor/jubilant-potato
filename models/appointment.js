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
      enum: [
        "Small Tattoo",
        "Large Tattoo",
        "Permanent Makeup",
        "Consultation/ Touch-up",
      ],
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
      enum: [1, 2, 4],
      required: [true, "Duration is reequired"],
    },
  },
  { versionKey: false, timestamps: false }
);

const addAppointmentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  service: Joi.string()
    .valid(
      "Small Tattoo",
      "Large Tattoo",
      "Permanent Makeup",
      "Consultation/ Touch-up"
    )
    .required(),
  date: Joi.string().required(),
  slot: Joi.string().required(),
  duration: Joi.number().valid(1, 2, 4).required(),
});

const schemas = {
  addAppointmentSchema,
};

appointmentSchema.post("save", HandleMongooseError);

const Appointment = model("appointment", appointmentSchema);

module.exports = { Appointment, schemas };
