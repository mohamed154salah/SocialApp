import React, { useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/Alert";
import { Navigate } from "react-router-dom";
import { isAuth } from "../auth/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import {createPost} from "./apiPost"
export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  let userPhoto;
  let post = new FormData();
  const handleChangeTitle = (e) => {
    e.preventDefault(); // prevent the default action
    setTitle(e.target.value); // set name to e.target.value (event)
  };

  const handleChangeImage = (e) => {
    e.preventDefault(); // prevent the default action
    setImage(e.target.files[0]); // set name to e.target.value (event)
  };
  const handleChangeBody = (e) => {
    e.preventDefault(); // prevent the default action
    setBody(e.target.value); // set name to e.target.value (event)
  };
  function clickSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const user = {
      title,
      body,
      photo: photo || undefined,
    };
    for (const name in user) {
      if (user[name] === undefined) {
        continue;
      } else {
        post.append(name, user[name]);
      }
    }

    createPost(isAuth().user._id,post)
      .then((res) => {
       
        setOpen(true);
        setRedirectToSignin(true);
        setErr("");
        setTitle("");
        setBody(""); 
        return res.json();
      })
      .catch((err) => {
        setErr(err);
        setLoading(false);
      });
  }
  const redirect = redirectToSignin;

  if (redirect) {
    return <Navigate replace to={`/`} />;
  }

  return (
    <div className="container">
      <div
        className="alert alert-danger"
        style={{ display: err ? "" : "none" }}
      >
        {err}
      </div>
      <div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>loading.....</h2>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="alert alert-info" style={{ display: open ? "" : "none" }}>
        you successfully post ,
      </div>
      <Image
        style={{ height: "15vw", width: "100%", objectFit: "cover" }}
        src={userPhoto}
        alt={title}
        onError={(i) => (i.target.src = `$(dImage)`)}
        thumbnail="true"
      />
      <Form>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={handleChangeImage}
            type="file"
            accept="image/*"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Title Post</Form.Label>
          <Form.Control
            onChange={handleChangeTitle}
            value={title}
            type="text"
            placeholder="Enter title post"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAbout">
          <Form.Label>Body Post</Form.Label>
          <Form.Control
            onChange={handleChangeBody}
            value={body}
            type="textarea"
            placeholder="Enter post body "
          />
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit} type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}
