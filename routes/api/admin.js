const express = require("express");
const { validateBody, authenticate } = require("../../middlewares");
const { commonAdminSchema } = require("../../models/admin");
const ctrl = require("../../controllers/admin");
const router = express.Router();

router.post("/register", validateBody(commonAdminSchema), ctrl.register);
router.post("/login", validateBody(commonAdminSchema), ctrl.login);
router.post("/logout", authenticate, ctrl.logout);
router.get("/check", authenticate, ctrl.checkAdmin);

module.exports = router;
