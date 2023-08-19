const express = require("express");
const { validateBody } = require("../../middlewares");
const sendMailSchema = require("../../schemas/sendMailSchema");
const ctrl = require("../../controllers/mails");
const router = express.Router();

router.post("/", validateBody(sendMailSchema), ctrl.sendMail);

module.exports = router;
