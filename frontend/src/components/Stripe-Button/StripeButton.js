// import React from "react";
// import StripeCheckout from "react-stripe-checkout";

// old================================================
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   Elements,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// const StripeButton = () => {
// old ===================
//   const stripe = useStripe();
//   const elements = useElements();
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//     });
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(
//   "pk_test_51IJMszCmSs4CvVTgKb2KzcljfJIo4btWJYTdpbY948XACawuYwi2QZHiNAB0UNmlhfXkAQ18hBFilKtX8ZwpuQPy00q20JzAEs",
// );

// export default StripeButton;
