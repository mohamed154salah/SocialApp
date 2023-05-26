import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { isAuth } from "../auth/index";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import dImage from "../images/user-icon.png";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comment from "./Comment";
export default function Post(props) {
  const { id } = useParams();
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [post, setPost] = useState();
  const [updatee, setUpdatee] = useState(false);
  const [uplike, setUplike] = useState(false);
  const [NumLikes, setNumLikes] = useState(0);

  const update = () => {
    setUpdatee(true);
  };
  const checkLike = (post) => {
    const jwt = isAuth();
    const match = post.likes.find((follower) => {
      return follower === jwt.user._id;
    });
    if (match) {
      setUplike(true);
    } else {
      setUplike(false);
    }
    return match;
  };

  const clickComment = (apiCall) => {
    apiCall(post._id,isAuth().user._id)
    .then((data) => {
     if (data.error) {
       console.log(data.error);
     } else {
      setPost(data);
      setNumLikes(data.likes.length);
      checkLike(data);     }
   }); 
 }; 

  const like = (postId, userId) => {
    fetch("http://localhost:8080/post/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${isAuth().token}`,
      },
      body: JSON.stringify({ userId, postId }),
    }).then((res) => {
      setUplike(!uplike);
      setNumLikes(NumLikes + 1);
      console.log(uplike);
      res.json();
    });
  };
  const unlike = (postId, userId) => {
    fetch("http://localhost:8080/post/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${isAuth().token}`,
      },
      body: JSON.stringify({ userId, postId }),
    }).then((res) => {
      setUplike(!uplike);
      setNumLikes(NumLikes - 1);
      console.log(uplike);
      res.json();
    });
  };
  const uncomment = (commentId,postId) => {
    fetch("http://localhost:8080/post/uncomment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${isAuth().token}`,
      },
      body: JSON.stringify({commentId,postId}),
    }).then((res) => {
      return res.json();
    })
    .then((data) => {
      setPost(data);
      setNumLikes(data.likes.length);
      checkLike(data);
    })
  };
  const deletePost = () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this Post?"
    );
    if (confirm) {
      fetch(`http://localhost:8080/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${isAuth().token}`,
        },
      })
        .then((res) => {
          setRedirectToSignin(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetch(`http://localhost:8080/singlePost/${id}`, {
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
        setPost(data);
        setNumLikes(data.likes.length);
        checkLike(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!post) {
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
  const up = updatee;
  if (up) {
    return <Navigate replace to={`/post/update/${post._id}`} />;
  }

  const redirect = redirectToSignin;
  if (redirect) {
    return <Navigate replace to="/" />;
  }
  const posterID = post.postedBy._id;
  const posterName = post.postedBy.name;
  return (
    <div className="container">
      {
        <Card
          key={post._id}
          style={{
            width: "100%",
            backgroundColor: "#F7ECDE",
            margin: "1rem",
          }}
        >
          <Card.Title style={{ margin: "2rem", fontSize: "50px" }}>
            {post.title}
          </Card.Title>

          {post.photo ? (
            <Card.Img
              variant="card-img-top"
              style={{
                height: "15vw",
                width: "100%",
                objectFit: "cover",
              }}
              alt="avatar_img"
              src={
                post.photo
                  ? `http://localhost:8080/post/photo/${post._id}`
                  : dImage
              }
            />
          ) : null}
          <Card.Body>
            <Card.Text
              style={{
                fontSize: "30px",
                margin: "1rem",
              }}
            >
              {post.body}
            </Card.Text>
            <Card.Text
              style={{
                backgroundColor: "#F7ECDE",
                margin: "1rem",
              }}
            >
              created: {new Date(post.created).toDateString()}
            </Card.Text>
            <Card.Text
              style={{
                width: "20rem",
                backgroundColor: "#F7ECDE",
                margin: "1rem",
              }}
            >
              {" "}
              Posted BY:
              <Link to={`/user/${posterID}`}>{posterName}</Link>
            </Card.Text>
            <h3> {NumLikes} : likes </h3>
          </Card.Body>
        </Card>
      }
      {uplike ? (
        <Button
          variant="light"
          onClick={() => {
            unlike(post._id, isAuth().user._id);
          }}
        >
          <ThumbUpIcon style={{ color: "#A10035" }} />
        </Button>
      ) : (
        <Button
          variant="light"
          onClick={() => {
            like(post._id, isAuth().user._id);
          }}
        >
          <ThumbUpIcon style={{ color: "#E97777" }} />
        </Button>
      )}
     
      <Comment postId={post._id} clickComment={clickComment} />
      <hr />

      {post.comments.length>0?
      <Card className="text-center">
        <Card.Header>Comments</Card.Header>
        {post.comments.map((comment) => {
          return (
            <>
              <Card.Body>
                <Card.Title>Name : {comment.postedBy.name}</Card.Title>
                <Card.Text>{comment.text}</Card.Text>
                {comment.postedBy._id===isAuth().user._id ?
                <Button variant="danger" onClick={() => {
          uncomment(comment._id,post._id);
        }}>Delete Comment</Button>:null}
              </Card.Body>
              <Card.Footer className="text-muted">
                created:{new Date(comment.created).toDateString()}
              </Card.Footer>
            </>
          );
        })}
      </Card>
      :null}
      <hr />
      <Link
        className="btn btn-raised btn-info btn-lg"
        style={{
          width: "15rem",
          backgroundColor: "#F7ECDE",
          margin: "1rem",
        }}
        to={`/`}
      >
        Back To Posts
      </Link>
      {isAuth().user && isAuth().user._id === post.postedBy._id && (
        <>
          {" "}
          <Button
            variant="dark"
            onClick={() => {
              update(post._id);
            }}
          >
            Update
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete
          </Button>
        </>
      )}
    </div>
  );
}
