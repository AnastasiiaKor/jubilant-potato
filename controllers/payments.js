const { ctrlWrapper } = require("../helpers");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

// const checkout = async (req, res) => {
//   let DOMAIN;
//   process.env.NODE_ENV = "development"
//     ? (DOMAIN = "http://localhost:3000")
//     : (DOMAIN = "https://jubilant-potato.onrender.com");

//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: process.env.REACT_APP_STRIPE_PRICE_ID,
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: `${DOMAIN}?success=true`,
//     cancel_url: `${DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
//   //   res.status(200).json(session.url);
// };

const getKey = async (req, res) => {
  res
    .status(200)
    .json({ publishableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY });
};

const createIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: 100,
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
