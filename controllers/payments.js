const { ctrlWrapper, HttpError } = require("../helpers");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const getKey = async (req, res) => {
  res
    .status(200)
    .json({ publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
};

const createIntent = async (req, res) => {
  const { serviceName } = req.params;

  let serviceAmount;
  switch (serviceName) {
    case "permanent":
    case "small-tattoo":
      serviceAmount = 100;
      break;
    case "large-tattoo":
      serviceAmount = 120;
      break;
    case "consultation":
      serviceAmount = 1;
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
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};

module.exports = {
  getKey: ctrlWrapper(getKey),
  createIntent: ctrlWrapper(createIntent),
};
