import axios from "axios";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { useRecoilState } from "recoil";
import { productsListState } from "../recoil/atoms";

const HomeScreen = () => {
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useRecoilState(productsListState);

  //

  const fetchedProducts = async () => {
    const { data } = await axios.get("/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchedProducts();
  }, []);

  return (
    <>
      <ProductCarousel />
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
