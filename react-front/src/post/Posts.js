import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import dImage from "../images/user-icon.png";
export default function Posts() {
  const [posts, setPosts] = useState();
  useEffect(() => {
    fetch(`http://localhost:8080/post`, {
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
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(posts);
  if (!posts) {
    return (
      <div
        className="text-center"
        style={{
          color: "#0008C1",
          margin: "10rem",
        }}
      >
        Loading.....
      </div>
    );
  }
  return (
    <div className="container">
      <Row>
        {posts.map((obj) => {
          const posterID = obj.postedBy._id;
          const posterName = obj.postedBy.name;

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
                {obj.photo ? (
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
                        ? `http://localhost:8080/post/photo/${obj._id}`
                        : dImage
                    }
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>{obj.body}</Card.Text>
                  <Card.Text
                    style={{
                      backgroundColor: "#F7ECDE",
                    }}
                  >
                    created: {new Date(obj.created).toDateString()}
                  </Card.Text>
                  <Card.Text
                    style={{
                      width: "20rem",
                      backgroundColor: "#F7ECDE",
                    }}
                  >
                    {" "}
                    Posted BY:
                    <Link to={`/user/${posterID}`}>{posterName}</Link>
                  </Card.Text>
                  <Link
                    className="btn btn-raised btn-green btn-sm"
                    style={{
                      width: "10rem",
                      backgroundColor: "#F7ECDE",
                      margin: "1rem",
                    }}
                    to={`/post/${obj._id}`}
                  >
                    View Post
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
