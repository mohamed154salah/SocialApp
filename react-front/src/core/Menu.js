/* eslint-disable no-self-compare */
import React, {useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "../index.css";
import {AuthContext} from "../AuthContext"
import { isAuth,Logout } from "../auth";

const Menu = () => {
const {auth}= useContext(AuthContext);
 const remove = () => {
  window.localStorage.clear();
  Logout();
 }
  return (
    <div>
      {console.log(localStorage.getItem("auth"),localStorage.getItem("jwt"))}
      <Nav
        fill
        variant="tabs"
        defaultActiveKey="/"
        as="ul"
        style={{ backgroundColor:"#FBF8F1"}}
      >
        <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to="/"
            style={{ color: "rgb(68, 55, 0)" }}
            eventKey="link-1"
          >
            Home
          </Nav.Link>
        </Nav.Item>
        {auth=== true ?(
      <>

      <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to="/users"
            style={{ color: "rgb(68, 55, 0)" }}
            
            eventKey="link-6"
          >
            Users
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to={`/user/FindPeople/${isAuth().user._id}`}
            style={{ color: "rgb(68, 55, 0)" }}
            
            eventKey="link-7"
          >
            FindPeople
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to={`/post/new/${isAuth().user._id}`}
            style={{ color: "rgb(68, 55, 0)" }}
            
            eventKey="link-8"
          >
            Create Post
          </Nav.Link>
        </Nav.Item>

        <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to="/"
            style={{ color: "tomato" }}
            onClick={() => {remove();}}
            eventKey="link-4"
          >
            Sign Out
          </Nav.Link>
        </Nav.Item>


        <Nav.Item as="li">
          <Nav.Link
            as={Link}
            to={`/user/${isAuth().user._id}`}
            style={{ color: "steelblue" }}
            eventKey="link-5"
          >
            {`${isAuth().user.name}'s profile`}
          </Nav.Link>
        </Nav.Item>
      </> ) : null
       } 
     {auth === false ? (
      <>
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/signin" eventKey="link-2">
            Sign IN
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/signup" eventKey="link-3">
            Sign Up
          </Nav.Link>
        </Nav.Item>
      </>):null
    }
      </Nav>
    </div>
  );
};
export default Menu;
