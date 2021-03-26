import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import axios from "axios";
import { userState } from "../recoil/atoms";
import { useRecoilState } from "recoil";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [user] = useRecoilState(userState);
  const [name, setName] = useState("");
  const [quedUser, setquedUser] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.uid}`,
    },
  };

  useEffect(() => {
    if (!quedUser || quedUser._id !== userId) {
      const fetchedQuedUser = async () => {
        const { data } = await axios.get(`/api/users/${userId}`, config);
        setquedUser(data);
      };
      fetchedQuedUser();
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/users/${userId}`,
      { name, email, isAdmin },
      config,
    );
    history.push("/admin/userlist");
    console.log(data);
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        {userId ? (
          <>
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={quedUser.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={quedUser.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                ></Form.Check>
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

export default UserEditScreen;
