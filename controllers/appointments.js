const { Appointment } = require("../models/appointment");
const { HttpError, ctrlWrapper } = require("../helpers");

const addAppointment = async (req, res) => {
  const newAppointment = await Appointment.create({ ...req.body });

  res.status(201).json(newAppointment);
};

const getAppointments = async (req, res) => {
  const { date, month } = req.query;
  let query = {};
  if (date) query.date = date;

  if (month) query.date = { $regex: `^${month}\\.` };

  const appointments = await Appointment.find(query);

  res.status(200).json(appointments);
};

const getSlots = async (req, res) => {
  const { date, duration } = req.query;
  if (!date || !duration) {
    throw HttpError(400, "Missing date or duration in the query");
  }
  const appointments = await Appointment.find({ date: date });
  const slots = [
    { time: "11:00am", available: true },
    { time: "11:30am", available: true },
    { time: "12:00pm", available: true },
    { time: "12:30pm", available: true },
    { time: "1:00pm", available: true },
    { time: "1:30pm", available: true },
    { time: "2:00pm", available: true },
    { time: "2:30pm", available: true },
    { time: "3:00pm", available: true },
    { time: "3:30pm", available: true },
    { time: "4:00pm", available: true },
    { time: "4:30pm", available: true },
    { time: "5:00pm", available: true },
    { time: "5:30pm", available: true },
    { time: "6:00pm", available: true },
    { time: "6:30pm", available: true },
    { time: "7:00pm", available: true },
    { time: "7:30pm", available: true },
  ];

  if (appointments.length) {
    appointments.forEach((appointment) => {
      const appointmentIndex = slots.findIndex(
        (slot) => slot.time === appointment.slot
      );
      if (appointmentIndex !== -1) {
        const totalSlotsNeeded = appointment.duration / 30;
        for (
          let i = appointmentIndex;
          i < appointmentIndex + totalSlotsNeeded;
          i++
        ) {
          if (i >= slots.length) {
            break;
          }
          slots[i].available = false;
        }
      }
    });
  }

  const procedureDurationInSlots = duration / 30;
  const availableSlots = [];

  for (let i = 0; i <= slots.length - procedureDurationInSlots; i++) {
    let isValidSlot = true;
    for (let j = 0; j < procedureDurationInSlots; j++) {
      if (!slots[i + j].available) {
        isValidSlot = false;
        break;
      }
    }
    if (isValidSlot) {
      availableSlots.push(slots[i].time);
    }
  }
  res.status(200).json(availableSlots);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw HttpError(404, "Bad request");
  }
  const updatedAppointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedAppointment);
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const result = await Appointment.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Bad request");
  }

  res.status(200).json({ message: "Appointment deleted" });
};

module.exports = {
  addAppointment: ctrlWrapper(addAppointment),
  getAppoinments: ctrlWrapper(getAppointments),
  getSlots: ctrlWrapper(getSlots),
  updateAppointment: ctrlWrapper(updateAppointment),
  deleteAppointment: ctrlWrapper(deleteAppointment),
};
