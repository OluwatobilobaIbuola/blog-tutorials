import dotenv from "dotenv";
import logger from "./src/utils/logger";
import express from "express";
import cors from "cors";
dotenv.config();
import Stripe from "stripe";

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/billing-service/payments/make-payment", async (req, res) => {
  const data = req.body;
  console.log(data);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1400,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    data: { data: paymentIntent.client_secret },
  });
});

app.listen(process.env.PORT || 8080, () => {
  logger.info(`Server listening on port ${process.env.PORT || 8080}`);
});
