import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, Navigate } from "react-router-dom";
import { Signout, DelUser } from "../auth/index.js";
import { AuthContext } from "../AuthContext";

const DeleteUser = () => {
  let { id } = useParams();
  const { logout } = useContext(AuthContext);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  const remove = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (confirm) {
      DelUser(id);
      window.localStorage.clear();
      logout();
      Signout();
      setRedirectToSignin(true);
    }
  };
  const redirect = redirectToSignin;
  if (redirect) {
    return <Navigate replace to="/signup" />;
  }
  return (
    <Button
      className="btn btn-raised btn-danger"
      onClick={() => {
        remove();
      }}
    >
      Delete Profile
    </Button>
  );
};

export default DeleteUser;
