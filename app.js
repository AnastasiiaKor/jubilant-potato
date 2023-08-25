const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mailRouter = require("./routes/api/mail");
const appointmentRouter = require("./routes/api/appointments");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

require("dotenv").config();

const YOUR_DOMAIN = "http://localhost:3000";
const app = express();
app.use(express.static("public"));
const upload = multer();
app.use(cors());
app.use(express.json());
app.use(upload.any());

app.use("/send", mailRouter);
app.use("/appointments", appointmentRouter);

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NehttD1QNt2vG2tYYOfQPUV",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  console.log("Session created:", session);
  res.redirect(303, session.url);
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
