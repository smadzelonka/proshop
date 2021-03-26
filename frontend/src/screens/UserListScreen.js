import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const UserListScreen = ({ history }) => {
  const [user] = useRecoilState(userState);
  const [allUser, setAllUser] = useState("");

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
        const { data } = await axios.get(`/api/users`, config);
        setAllUser(data);
      } else {
        history.push("/login");
      }
    };
    fetchedOrder();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      await axios.delete(`/api/users/${id}`, config);
    }
  };

  return (
    <>
      {allUser ? (
        <>
          <h1>Users</h1>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUser.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
