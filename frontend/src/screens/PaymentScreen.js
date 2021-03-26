import React, { useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { paymentMethodState, shippingAddressState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const PaymentScreen = ({ history }) => {
  const [shippingAddress] = useRecoilState(shippingAddressState);
  const [setPaymentMethod] = useRecoilState(paymentMethodState);

  useEffect(() => {
    setPaymentMethod("stripe");
  }, []);

  // need to add field required to the shipping address to get this to work
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // setPaymentMethod({});
    // ================= Not using the e.target.value, Should be [strip] getting [] ==============
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="stripe or credit card"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
