const express = require("express");
const { validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/payments");
const router = express.Router();

router.post("/", ctrl.checkout);

module.exports = router;
