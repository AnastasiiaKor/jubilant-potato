const express = require("express");

const ctrl = require("../../contollers/mails");
const router = express.Router();

router.post("/", ctrl.sendMail);

module.exports = router;
