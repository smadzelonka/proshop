import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import OrderModel from "../models/orders";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  shippingAddressState,
  cartListState,
  paymentMethodState,
  cartOrderState,
} from "../recoil/atoms";
import { useRecoilState } from "recoil";

const PlaceOrderScreen = ({ history, match }) => {
  const [setCartOrder] = useRecoilState(cartOrderState);
  const [cart] = useRecoilState(cartListState);
  const [shippingAddress] = useRecoilState(shippingAddressState);
  const [paymentMethod] = useRecoilState(paymentMethodState);
  // ==========
  // Math and stuff
  const cartPrice = cart
    .reduce((acc, item) => acc + item.qty * item.product.price, 0)
    .toFixed(2);
  const cartShipping = Number(cartPrice > 100 ? 10 : 20);
  const cartTax = Number((0.15 * cartPrice).toFixed(2));
  const cartTotal = (
    Number(cartPrice) +
    Number(cartShipping) +
    Number(cartTax)
  ).toFixed(2);

  const items = cart.map((item) => {
    return {
      name: item.product.name,
      qty: item.qty,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id,
    };
  });

  // useEffect(() => {
  //   if (order) {
  //     const fetchedOrder = async () => {
  //       const { data } = await axios.get(`/api/orders/${match.params.id}`);
  //       setCartOrder(data);
  //     };
  //     fetchedOrder();
  //   }
  // }, [setCartOrder, match, history]);

  const placeOrderHandler = () => {
    OrderModel.placeOrder({
      orderItems: items,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      itemsPrice: cartPrice,
      taxPrice: cartTax,
      shippingPrice: cartShipping,
      totalPrice: cartTotal,
    }).then((json) => {
      setCartOrder(json);
      if (json.status === 201) {
        // history.push(`/orders/${order._id}`);
      } else {
        // should push to created order
        // history.push(`/orders/`);
        history.push(`/orders/${json._id}`);
      }
    });
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <strong>Method:</strong>
            {paymentMethod}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {cart.length === 0 ? (
              <Message>Your Cart Is Empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.map((item, index) => {
                  const { image, price, _id, name } = item.product;
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
                  <Col>${cartPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping Cost</Col>
                  <Col>${cartShipping}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${cartTax}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total Price</Col>
                  <Col>${cartTotal}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
