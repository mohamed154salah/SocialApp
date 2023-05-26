import React, { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/Alert";
import { Navigate, useParams } from "react-router-dom";
import { isAuth } from "../auth/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
export default function UpdatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setImage] = useState("");
  
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  let userPhoto;
  let post = new FormData();
  let { id } = useParams();

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
        if (data.error) {
          setRedirectToSignin(true);
        } else {
          setTitle(data.title);
          setBody(data.body);

          if (data.photo) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            userPhoto = data.photo;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
    //setLoading(true);
    const user = {
      title,
      body,
      photo: photo || undefined,
    };
    for (const name in user) {
      if (user[name] === undefined) {
        continue;
      } else {
        console.log(user[name]);
        post.append(name, user[name]);
      }
    }

    fetch(`http://localhost:8080/post/update/${id}`, {
        method: "PUT",
        headers: {
         
          Authorization: `Bearer ${isAuth().token}`,
  
        },
        body: post,
      })
      .then((res) => {
        setRedirectToSignin(true);
        setTitle("");
        setBody("");
        return res.json();
      })
      .catch((err) => {
        console.log(err)
      
      });
  }
  const redirect = redirectToSignin;

  if (redirect) {
    return <Navigate replace to={`/`} />;
  }

  return (
    <div className="container">
    
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

        <Button
          variant="primary"
          onClick={
            clickSubmit
          }
          type="submit"
        >
          update
        </Button>
      </Form>
    </div>
  );
}
