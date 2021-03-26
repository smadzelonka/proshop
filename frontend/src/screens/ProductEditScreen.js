import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import axios from "axios";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [user] = useRecoilState(userState);
  const [name, setName] = useState("");
  const [quedProduct, setquedProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.uid}`,
    },
  };

  useEffect(() => {
    if (!quedProduct || quedProduct._id !== productId) {
      const fetchedQuedProduct = async () => {
        const { data } = await axios.get(`/api/products/${productId}`, config);
        setquedProduct(data);
      };
      fetchedQuedProduct();
    } else {
      setName(quedProduct.name);
      setPrice(quedProduct.price);
      setImage(quedProduct.image);
      setBrand(quedProduct.brand);
      setCategory(quedProduct.category);
      setCountInStock(quedProduct.countInStock);
      setDescription(quedProduct.description);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/products/${productId}`,
        { name, price, description, image, brand, category, countInStock },
        config,
      );
      history.push("/admin/productlist");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    const configUpload = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.post("/api/upload", formData, configUpload);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit product</h1>
        {productId ? (
          <>
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={quedProduct.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={quedProduct.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={quedProduct.image}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>
                <Form.File
                  id="image-file"
                  label="Choose a file"
                  custom
                  onChange={uploadHandler}
                ></Form.File>
                {uploading && <Loader></Loader>}
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={quedProduct.brand}
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countinstock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={quedProduct.countInStock}
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={quedProduct.category}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={quedProduct.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </>
        ) : (
          <Loader></Loader>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
