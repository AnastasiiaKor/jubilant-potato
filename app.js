const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mailRouter = require("./routes/api/mail");

require("dotenv").config();

const app = express();
const upload = multer();
app.use(cors());
app.use(express.json());
app.use(upload.any());

app.use("/send", mailRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status, message } = err;
  res.status(status).json({ message });
});

module.exports = app;
