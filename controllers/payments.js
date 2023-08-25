const { ctrlWrapper } = require("../helpers");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  let DOMAIN;
  process.env.NODE_ENV = "development"
    ? (DOMAIN = "http://localhost:3000")
    : (DOMAIN = "https://jubilant-potato.onrender.com");

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.REACT_APP_STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}?success=true`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};

module.exports = {
  checkout: ctrlWrapper(checkout),
};
