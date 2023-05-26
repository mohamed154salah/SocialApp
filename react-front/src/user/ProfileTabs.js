import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import dImage from "../images/user-icon.png";
import Image from "react-bootstrap/Image";

const ProfileTabs = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 style={{ color: "steelblue" }}>Followers </h2>
          <hr/>
          {
            <ListGroup as="ol">
              {props.userFollowers.map((user, i) => {
                return (
                  <ListGroup.Item as="li" variant="warning" key={user._id}>
                    <Nav.Link
                      as={Link}
                      to={`/user/${user._id}`}
                      style={{ color: "black" }}
                      eventKey="link-5"
                    >
                      {user.name}

                      <Image
                        style={{
                          height: "10%",
                          width: "10%",
                          objectFit: "cover",
                          float: "right",
                        }}
                        onError={(i) => (i.target.src = `${dImage}`)}
                        src={`http://localhost:8080/user/photo/${user._id}`}
                        alt={user.name}
                        roundedCircle="true"
                        fluid="true"
                      />
                    </Nav.Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          }
        </div>
        <div className="col">
          <h2 style={{ color: "steelblue" }}>Following </h2>
          <hr/>

          {
            <ListGroup as="ol">
              {props.userFollowing.map((user, i) => {
                return (
                  <ListGroup.Item as="li" variant="info" key={user._id}>
                    <Nav.Link
                      as={Link}
                      to={`/user/${user._id}`}
                      style={{ color: "black" }}
                      eventKey="link-5"
                    >
                      {user.name}

                      <Image
                        style={{
                          height: "10%",
                          width: "10%",
                          objectFit: "cover",
                          float: "right",
                        }}
                        onError={(i) => (i.target.src = `${dImage}`)}
                        src={`http://localhost:8080/user/photo/${user._id}`}
                        alt={user.name}
                        roundedCircle="true"
                        fluid="true"
                      />
                    </Nav.Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          }
        </div>
        <div className="col">
          <h2 style={{ color: "steelblue" }}>Posts </h2>
          <hr/>
          {
            <ListGroup as="ol">
              {props.posts.map((post, i) => {
                return (
                  <ListGroup.Item as="li" variant="dark" key={post._id}>
                    <Nav.Link
                      as={Link}
                      to={`/post/${post._id}`}
                      style={{ color: "black" }}
                      eventKey="link-5"
                    >
                     <h4> {post.title}</h4>
                    </Nav.Link>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          }
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
