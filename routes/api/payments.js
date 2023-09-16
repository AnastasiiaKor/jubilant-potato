const express = require("express");
const ctrl = require("../../controllers/payments");
const createIntentSchema = require("../../schemas/createIntentSchema");
const { validateBody } = require("../../middlewares");
const router = express.Router();

router.get("/config", ctrl.getKey);
router.post(
  "/create-payment-intent/:serviceName",
  validateBody(createIntentSchema),
  ctrl.createIntent
);

module.exports = router;
