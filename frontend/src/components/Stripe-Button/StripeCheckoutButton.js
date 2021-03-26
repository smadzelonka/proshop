import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IJMszCmSs4CvVTgKb2KzcljfJIo4btWJYTdpbY948XACawuYwi2QZHiNAB0UNmlhfXkAQ18hBFilKtX8ZwpuQPy00q20JzAEs";
  const onToken = (token) => {
    axios
      .get("/api/payment", {
        // url: "payment",
        method: "POST",
        data: {
          amount: priceForStripe,
          token,
        },
      })
      .then((response) => {
        alert("Payment successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="SeanShop"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
