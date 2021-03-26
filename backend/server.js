import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.REACT_APP_STRIPE_CLIENT_ID);

const YOUR_DOMAIN = "http://localhost:5000";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

// cors config
app.use(cors());

// ==========  strip =============
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    res.json({ id: session.id });
  } catch (err) {
    console.log(err);
    new Error(err);
  }
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", stripeRoutes);

// import module doesn't work with __dir
const __dirname = path.resolve();
// makes the uploads folder accessible
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  //www.freecodecamp.org/news/deploy-a-react-node-app-to/
  https: app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("api is running");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running on port ${PORT}`));
