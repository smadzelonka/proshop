import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Table, Button, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import { userState, productsListState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const ProductListScreen = ({ history }) => {
  const [user] = useRecoilState(userState);
  const [allProducts, setAllProducts] = useState("");
  const [products, setProducts] = useRecoilState(productsListState);

  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.uid}`,
    },
  };
  useEffect(() => {
    const fetchedOrder = async () => {
      if (user && user.isAdmin) {
        const { data } = await axios.get(`/api/products`, config);
        setAllProducts(data);
      } else {
        history.push("/admin/products");
      }
    };
    fetchedOrder();
  }, [allProducts, products]);

  const createProductHandler = async () => {
    try {
      const { data } = await axios.post(`/api/products`, {}, config);
      setProducts(...data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete(`/api/products/${id}`, config);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button>
        </Col>
      </Row>
      {allProducts ? (
        <>
          <h1>Users</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default ProductListScreen;
