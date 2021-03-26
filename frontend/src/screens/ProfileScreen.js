import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import AuthModel from "../models/auth";
import OrderModel from "../models/orders";

import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const ProfileScreen = ({ match, location, history }) => {
  const [user] = useRecoilState(userState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    } else {
      OrderModel.getMyOrder().then((json) => {
        setOrders(json);
      });
    }
  }, [user, history, setOrders]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      AuthModel.editUser({ name, email }).then((json) => {
        if (json.status === 201) {
          // history.push("/login");
        } else {
          // history.push("/login");
        }
      });
    }
  };

  console.log(orders);
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder={user.name}
              // defaultValue={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={user.email}
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
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        <Table striped border hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orders) => (
              <tr key={orders._id}>
                <td>{orders._id}</td>
                <td>{orders.createdAt.substring(0, 10)}</td>
                <td>{orders.totalPrice}</td>
                <td>
                  {orders.isPaid ? (
                    orders.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {orders.isDelivered ? (
                    orders.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${orders._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
