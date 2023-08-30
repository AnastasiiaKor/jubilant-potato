const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/appointment");
const ctrl = require("../../controllers/appointments");
const router = express.Router();

router.post(
  "/",
  validateBody(schemas.addAppointmentSchema),
  ctrl.addAppointment
);

router.get("/", authenticate, ctrl.getAppoinments);

router.get("/slots", ctrl.getSlots);

module.exports = router;
