import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartListState } from "../recoil/atoms";
import Message from "../components/Message";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const CartScreen = ({ history }) => {
  const [cart, updateCart] = useRecoilState(cartListState);

  // const productId = match.params.id;
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  // need help with
  useEffect(() => {
    // removeCartHandler();
  }, []);

  const removeCartHandler = (id) => {
    let newCart = cart.filter((item) => item.product._id !== id);
    return updateCart(newCart);
  };

  const checkoutHandler = () => {
    // history.push("/login?redirect=shipping");
    // setCartOrder([ ...cart,
    //     {
    //     product: cart.product._id,
    //     name: cart.product.name,
    //     image: cart.product.image,
    //     price: cart.product.price,
    //     qty: cart.qty
    //     }
    // ])
    history.push("/shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cart.map((item, i) => (
              <ListGroup.Item key={item.product._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>
                      {item.product.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.product.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        updateCart(
                          cart.map((drop) => {
                            if (drop.product._id === item.product._id) {
                              return { ...drop, qty: e.target.value };
                            }
                            return drop;
                          }),
                        );
                      }}
                    >
                      {[...Array(item.product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeCartHandler(item.product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cart.reduce((acc, item) => Number(acc) + Number(item.qty), 0)})
                items
              </h2>
              $
              {cart
                .reduce((acc, item) => acc + item.qty * item.product.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
