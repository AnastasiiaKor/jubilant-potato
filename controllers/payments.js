const { ctrlWrapper, HttpError } = require("../helpers");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const getKey = async (req, res) => {
  res
    .status(200)
    .json({ publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
};

const createIntent = async (req, res) => {
  const { serviceName } = req.params;
  const { email } = req.body;

  let serviceAmount;
  switch (serviceName) {
    case "permanent":
    case "small-tattoo":
      serviceAmount = 11300;
      break;
    case "large-tattoo":
      serviceAmount = 13560;
      break;
    case "touch-up":
      serviceAmount = 2260;
      break;
    default:
      throw HttpError(400, "Invalid service name");
  }
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "cad",
    amount: serviceAmount,
    automatic_payment_methods: {
      enabled: true,
    },
    description: "Thanks for your booking!",
    receipt_email: `${email}`,
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

module.exports = {
  getKey: ctrlWrapper(getKey),
  createIntent: ctrlWrapper(createIntent),
};
