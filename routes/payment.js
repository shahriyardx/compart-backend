const stripe = require("stripe")(process.env.STRIPE_SK);
const router = require("express").Router();
const Order = require("../database/schema/Order");

router.post("/", async (req, res) => {
  const orderInfo = req.body;
  const price = orderInfo.due * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

module.exports = router;
