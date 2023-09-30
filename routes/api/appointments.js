const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/appointment");
const ctrl = require("../../controllers/appointments");
const { validate } = require("../../schemas/sendMailSchema");
const router = express.Router();

router.post(
  "/",
  validateBody(schemas.addAppointmentSchema),
  ctrl.addAppointment
);

router.get("/", ctrl.getAppoinments);

router.get("/slots", ctrl.getSlots);

router.put(
  "/:id",
  authenticate,
  validateBody(schemas.updateAppointmentSchema),
  ctrl.updateAppointment
);

router.delete("/:id", authenticate, ctrl.deleteAppointment);

module.exports = router;
