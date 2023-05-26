import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import dImage from "../images/user-icon.png";
export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      redirectToSignin: false,
    };
  }
  componentDidMount() {
    fetch(`http://localhost:8080/allusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          this.setState({ redirectToSignin: true });
        } else {
          this.setState({ user: Object.entries(data)[0][1] });
        }
      });
  }
  render() {
    const redirect = this.state.redirectToSignin;
    console.log(redirect);
    if (redirect) {
      return <Navigate replace to="/signin" />;
    }
    const user = this.state.user;

    return (
      <div className="container">
        <Row>
          {user.map((obj) => {
            return (
              <Col key={obj._id} sm={6}>
                <Card
                  key={obj._id}
                  style={{
                    width: "30rem",
                    backgroundColor: "#F7ECDE",
                    margin: "1rem",
                  }}
                >
                  <Card.Img
                    variant="card-img-top"
                    style={{
                      height: "15vw",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt="avatar_img"
                    src={
                      obj.photo
                        ? `http://localhost:8080/user/photo/${obj._id}`
                        : dImage
                    }
                  />
                  <Card.Body>
                    <Card.Title>{obj.name}</Card.Title>
                    <Card.Text>{obj.email}</Card.Text>
                    {obj.about?<Card.Text>About: {obj.about}</Card.Text>:null}

                    <Card.Text>
                      created: {new Date(obj.created).toDateString()}
                    </Card.Text>
                    <Link
                      className="btn btn-raised btn-primary mr-5"
                      style={{ backgroundColor: "#54BAB9", color: "#E9DAC1" }}
                      to={`/user/${obj._id}`}
                    >
                      View Profile
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}
