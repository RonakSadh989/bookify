import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      // navigate to home
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signing up a user...");
    await firebase.signUp(email, password);
  };
  const signGoogle = (e) => {
    e.preventDefault();
    firebase.signUpGoogle();
  };

  return (
    <div className="container mt-5">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Create Account
        </Button>
      </Form>

      <h1 className="mt-4 mb-4">OR</h1>
      <Button variant="danger" onClick={signGoogle}>
        Sign up with Google
      </Button>
    </div>
  );
}
