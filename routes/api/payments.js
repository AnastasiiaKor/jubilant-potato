const express = require("express");
const ctrl = require("../../controllers/payments");
const createIntentSchema = require("../../schemas/createIntentSchema");
const paymentSchema = require("../../schemas/paymentSchema");
const { validateBody } = require("../../middlewares");
const router = express.Router();

router.get("/config", ctrl.getKey);
router.post(
  "/create-payment-intent/:serviceName",
  validateBody(createIntentSchema),
  ctrl.createIntent
);
router.post(
  "/create-payment-intent",
  validateBody(paymentSchema),
  ctrl.createPayment
);

module.exports = router;
