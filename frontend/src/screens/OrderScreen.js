import React, { useState, useEffect } from "react";
import { Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
// import StripeButton from "../components/Stripe-Button/StripeButton";
import StripeCheckoutButton from "../components/Stripe-Button/StripeCheckoutButton";
import axios from "axios";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const OrderScreen = ({ match }) => {
  const [orders, setOrder] = useState([]);
  const [user] = useRecoilState(userState);

  // const orderPrice = order
  //   .reduce((acc, item) => acc + item.orderItems.qty * item.orderItems.price, 0)
  //   .toFixed(2);
  // would have liked to create params and pass to route and use them here but i dont knwo if my brain is brokend

  useEffect(() => {
    if (!orders || orders._id !== match.params.id) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.uid}`,
        },
      };

      const fetchedOrder = async () => {
        const { data } = await axios.get(
          `/api/orders/${match.params.id}`,
          config,
        );
        setOrder(data);
        console.log(data);
      };
      fetchedOrder();
    }
  }, []);

  // const orderScreenHandler = () => {
  //   console.log("hello");
  // };

  return (
    <>
      {orders._id !== match.params.id ? (
        <Loader></Loader>
      ) : (
        <>
          <h1>Order {match.params.id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  {/* need to populate the backend but for now lazy mode  */}
                  {/* <strong>Name: {order.user.name}</strong> */}
                  <p>
                    <strong>Name: </strong>
                    {user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {orders.shippingAddress.address},{" "}
                    {orders.shippingAddress.city},
                    {orders.shippingAddress.postalCode},
                    {orders.shippingAddress.country}
                  </p>
                  {orders.isDelivered ? (
                    <Message variant="success">
                      Delivered on {orders.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">
                      Not Delivered yet Hang on youll get it
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method:</strong>
                  {orders.paymentMethod}
                </p>
                {orders.isPaid ? (
                  <Message variant="success">Paid on {orders.paidAt}</Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {orders.length === 0 ? (
                  <Message>You Have no orders</Message>
                ) : (
                  <ListGroup variant="flush">
                    {orders.orderItems.map((item, index) => {
                      const { image, price, _id, name } = item;
                      return (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image src={image} alt={name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${_id}`}>{name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${price} ={item.qty * price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Item</Col>
                      <Col>${/* {orderPrice} */}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping Cost</Col>
                      <Col>${orders.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax Price</Col>
                      <Col>${orders.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total Price</Col>
                      <Col>${orders.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {/* <Button
                      type="button"
                      className="btn-block"
                      disabled={orders.length === 0}
                      onClick={orderScreenHandler}
                    >
                      Pay Here
                    </Button> */}
                    <StripeCheckoutButton price={orders.totalPrice} />
                    {/* <StripeButton /> */}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default OrderScreen;
