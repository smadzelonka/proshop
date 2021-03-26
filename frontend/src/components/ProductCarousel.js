import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import axios from "axios";

const ProductCarousel = () => {
  const [products, setProducts] = useState("");
  useEffect(() => {
    const fetchedTop = async () => {
      const { data } = await axios.get(`/api/products/top`);
      setProducts(data);
    };
    fetchedTop();
  }, []);
  return (
    <>
      {products ? (
        <>
          <Carousel pause="hover" className="bg-dark">
            {products.map((product) => (
              <Carousel.Item key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption">
                    <h2>
                      {product.name} ({product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default ProductCarousel;
