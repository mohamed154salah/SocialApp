import React, { useState ,useContext} from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Navigate } from "react-router-dom";
import "react-bootstrap/Alert";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import {AuthContext} from "../AuthContext"

import { signin,authenticate } from "../auth";
export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {login}=useContext(AuthContext);

  function clickSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const user = {
      email,
      password,
    };
    //console.log(user);
    signin(user).then((data) => {
      if (data.error) {
        setErr(data.error);
        setLoading(false);
      } else {
        authenticate(data, () => {
          setOpen(true);
         login()
        });
      }
    });
  }
  if (open) return <Navigate replace to="/" />;
  return (
    <div className="d-flex align-items-center">
      <form className="mb-4 w-50 h-50 mx-auto justify-content-center align-items-center">
        <MDBRow className="mb-4 w-50 justify-content-center align-items-center">
          <MDBCol className="align-items-center">
            <h2>Signin Form</h2>
          </MDBCol>
        </MDBRow>
        <div
          className="alert alert-danger"
          style={{ display: err ? "" : "none" }}
        >
          {err}
        </div>
<div>
  {loading?<div className="jumbotron text-center">
    <h2>loading.....</h2>
  </div>:""}
</div>
        <MDBRow className="mb-4 w-50  align-items-center">
          <MDBCol className="align-items-center"></MDBCol>
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
          Sign in
        </MDBBtn>
      </form>
    </div>
  );
}
