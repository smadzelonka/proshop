import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
// import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
// import Loader from "../components/Loader";
import AuthModel from "../models/auth";
// import OrderModel from "../models/orders";
import { userState /* cartOrderState  */ } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
// import { useRecoilState } from "recoil";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [cartOrder, setCartOrder] = useRecoilState(cartOrderState);
  const setUser = useSetRecoilState(userState);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // useEffect(() => {
  //   if()
  // })

  const submitHandler = (e) => {
    e.preventDefault();
    AuthModel.login({ email, password }).then((json) => {
      if (json.status === 200) {
        localStorage.setItem("uid", json.token);
        // AuthModel.verify().then((data) => {
        setUser(json);
        // OrderModel.getMyOrder().then((json) => {
        //   setCartOrder(json);
        history.push("/");
        // });
      } else {
        history.push("/register");
      }
    });
    // });
  };

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          new Customer?
          {/* isnt taking to shipping */}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
