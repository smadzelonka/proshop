import express from "express";
const router = express.Router();
import Stripe from "stripe";
const stripe = new Stripe(process.env.REACT_APP_STRIPE_CLIENT_ID);
import dotenv from "dotenv";
dotenv.config();
import { protect, admin } from "../middleware/authMiddleware.js";

// router.post("/", (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: "usd",
//   };
//   stripe.charges.create(body, (stripeError, stripeRes) => {
//     if (stripeError) {
//       res.status(500).send({ error: stripeError });
//     } else {
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });
const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: "usd",
  // Verify your integration in this guide by including this parameter
  metadata: { integration_check: "accept_a_payment" },
});

router.get("/secret", async (req, res) => {
  const intent = res.json({ client_secret: intent.client_secret }); // ... Fetch or create the PaymentIntent
});

export default router;
