import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const OrderListScreen = ({ history }) => {
  const [user] = useRecoilState(userState);
  const [orders, setOrder] = useState([]);

  console.log(user);
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.uid}`,
    },
  };
  useEffect(() => {
    const fetchedOrder = async () => {
      if (user && user.isAdmin) {
        const { data } = await axios.get(`/api/orders`, config);
        setOrder(data);
      } else {
        history.push("/login");
      }
    };
    fetchedOrder();
  }, []);

  return (
    <>
      {orders ? (
        <>
          <h1>Orders</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
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

export default OrderListScreen;
