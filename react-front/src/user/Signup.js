import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import { signup } from "../auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);

  function clickSubmit(event) {
    event.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    signup(user).then((data) => {
      if (data.error) setErr(data.error);
      else {
        setEmail("");
        setErr("");
        setName("");
        setPassword("");
        setOpen(true);
      }
    });
  }
  return (
    <div className="d-flex align-items-center">
      <form className="mb-4 w-50 h-50 mx-auto justify-content-center align-items-center">
        <MDBRow className="mb-4 w-50 justify-content-center align-items-center">
          <MDBCol className="align-items-center">
            <h2>Signup Form</h2>
          </MDBCol>
        </MDBRow>
        <div
          className="alert alert-danger"
          style={{ display: err ? "" : "none" }}
        >
          {err}
        </div>

        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          you successfully Sign Up ,please <Link to="/signin">Sign In</Link>
        </div>
        <MDBRow className="mb-4 w-50  align-items-center">
          <MDBCol className="align-items-center">
            <MDBInput
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErr("");
              }}
              id="form3Example1"
              label="name"
            />
          </MDBCol>
        </MDBRow>
        <MDBInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErr("");
          }}
          className="mb-4"
          type="email"
          id="form3Example3"
          label="Email address"
        />
        <MDBInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErr("");
          }}
          className="mb-4"
          type="password"
          id="form3Example4"
          label="Password"
        />

        <MDBBtn onClick={clickSubmit} type="submit" className="mb-4" block>
          Sign up
        </MDBBtn>
      </form>
    </div>
  );
}
