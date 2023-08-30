const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mailRouter = require("./routes/api/mail");
const appointmentRouter = require("./routes/api/appointments");
const paymentRouter = require("./routes/api/payments");
const adminRouter = require("./routes/api/admin");

const upload = multer();

require("dotenv").config();

const app = express();
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
app.use(upload.any());

app.use("/send", mailRouter);
app.use("/appointments", appointmentRouter);
app.use("/admin", adminRouter);

app.use("/stripe", paymentRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
