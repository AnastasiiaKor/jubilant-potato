const express = require("express");
const ctrl = require("../../controllers/payments");
const router = express.Router();

router.get("/config", ctrl.getKey);
router.post("/create-payment-intent", ctrl.createIntent);

module.exports = router;
