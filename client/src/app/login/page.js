"use client";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "@/css/login.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
function Login() {
  // let account, password;
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="login-container col-4">
      <div className="title">Login</div>
      <Form>
        <Form.Group className="mb-3 account" controlId="formGroupEmail">
          <Form.Label>Email or User name</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={account}
            onChange={(event) => {
              setAccount(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 pass" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <button
        className={account && password ? "active" : ""}
        onClick={() => {
          router.push("/employees");
        }}
      >
        Dang nhap
      </button>
      <button
        onClick={() => {
          router.push("/");
        }}
      >
        Back
      </button>
    </div>
  );
}

export default Login;