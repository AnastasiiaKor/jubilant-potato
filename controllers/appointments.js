const { Appointment } = require("../models/appointment");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const addAppointment = async (req, res) => {
  const newAppointment = await Appointment.create({ ...req.body });
  const { slot, date, service, name, email, address, duration } = req.body;
  const mail = {
    to: `${email}`,
    subject: "Tattoo Appointment Confirmation",
    html: `
    <p><b>Dear ${name}</b></p>
    <p>I'm excited to confirm your upcoming tattoo appointment and look forward to creating a unique and beautiful piece of art for you. Here are the details of your appointment:</p>
    <p>Appointment Date: <b>${date}</b></p>
    <p>Appointment Time: <b>${slot}</b></p>
    <p>Duration: <b>${duration} min</b></p>
    <p>Procedure: <b>${service}</b></p>
    <p>Address: <b>${address}</b></p>
    <p><b>Please remember the following important information for your appointment:</b></p>
    <p>1. Arrival Time: Please arrive at the studio at least 15 minutes before your scheduled appointment time. This allows us to ensure a smooth and timely start.</p>
    <p>2. Design Ideas: If you have any specific design ideas or references, please bring them with you. We will work with you to finalize the design during your appointment.</p>
    <p>3. Consultation: There will be a brief consultation before the tattooing begins to discuss design details, placement, and any questions you may have.</p>
    <p>4. ID and Age Requirement: Please bring a valid government-issued photo ID, as this is required for age verification for all clients. You must be 18 years or older to get a tattoo.</p>
    <p>5. Cancellation Policy: Our cancellation policy emphasizes that the tattoo deposit is non-refundable. If you wish to reschedule your appointment, we kindly request at least 1 week's notice. Failing to provide adequate notice will require purchasing a new deposit for the rescheduled appointment.</p>
    <p>If you have any questions or need further assistance, feel free to reply to this email.</p>
    <p>Thank you for choosing and trusting me with world of art. I can't wait to create a beautiful piece of art for you. See you on <b>${date}</b>!</p>
    <p>Sincerely yours,</p>
    <p>I.A.</p>
    <p>Feel free to reach out if you have any questions or special requests by <a href="mailto:inkedbyAlina@gmail.com">inkedbyAlina@gmail.com</a></p>
    <p><a href="https://alinaivenko.com">Visit my website for more information</a></p>

  `,
  };
  await sendEmail(mail);

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
