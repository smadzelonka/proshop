import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import StripButton from "./components/Stripe-Button/StripeButton";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// To use the Elements provider, call loadStripe from @stripe/stripe-js with your publishable key. The loadStripe function will asynchronously load the Stripe.js script and initialize a Stripe object. Pass the returned Promise to Elements.
// const stripePromise = loadStripe(
//   "pk_test_51IJMszCmSs4CvVTgKb2KzcljfJIo4btWJYTdpbY948XACawuYwi2QZHiNAB0UNmlhfXkAQ18hBFilKtX8ZwpuQPy00q20JzAEs",
// );

function App() {
  return (
    <Router>
      <>
        <Header />
        {/* <Elements stripe={stripePromise}>
          <StripButton />
        </Elements> */}
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/" component={HomeScreen} exact />
          </Container>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
