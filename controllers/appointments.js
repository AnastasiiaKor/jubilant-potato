const { Appointment } = require("../models/appointment");
const { HttpError, ctrlWrapper } = require("../helpers");

const addAppointment = async (req, res) => {
  const newAppointment = await Appointment.create({ ...req.body });

  res.status(201).json(newAppointment);
};

const getAppointments = async (req, res) => {
  const { date } = req.query;
  let query = {};
  if (date) query.date = date;

  const appointments = await Appointment.find(query);

  res.status(200).json(appointments);
};

module.exports = {
  addAppointment: ctrlWrapper(addAppointment),
  getAppoinments: ctrlWrapper(getAppointments),
};
