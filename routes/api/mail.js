const express = require("express");
const { validateBody } = require("../../middlewares");
const sendMailSchema = require("../../schemas/sendMailSchema");
const sendPaymentConfirmationSchema = require("../../schemas/paymentConfirmationSchema");
const ctrl = require("../../controllers/mails");
const router = express.Router();

router.post("/", validateBody(sendMailSchema), ctrl.sendMail);
router.post(
  "/payment-confirmation",
  validateBody(sendPaymentConfirmationSchema),
  ctrl.sendConfirmation
);

module.exports = router;
