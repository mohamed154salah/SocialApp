import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuth, follow } from "../auth/index";
import { Card, Row, Col } from "react-bootstrap";
import dImage from "../images/user-icon.png";
const FindPeople = () => {
  const [users, setUsers] = useState();
  const clickFollowButton = (user, i) => {
    follow(user._id, isAuth().token, isAuth().user._id).then((data) => {
      if (data.error) {
      } else {
        let toFollow = users;
        toFollow.splice(i, 1);
        setUsers(toFollow);
      }
    });
  };
  useEffect(() => {
    fetch(`http://localhost:8080/user/findpeople/${isAuth().user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${isAuth().token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setUsers(Object.entries(data)[0][1]);
        }
      });
  }, []);
  if (!users) {
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
      {console.log(users)}

      <Row>
        {users.map((obj, i) => {
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

                  <Link
                    className="btn btn-raised btn-primary mr-5"
                    style={{ backgroundColor: "#54BAB9", color: "#E9DAC1" }}
                    to={`/user/${obj._id}`}
                  >
                    View Profile
                  </Link>

                  <button
                    className="btn btn-raised btn-info mr-5"
                    onClick={() => clickFollowButton(obj, i)}
                  >
                    follow
                  </button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default FindPeople;
