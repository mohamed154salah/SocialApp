import React, { useState, useEffect } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "react-bootstrap/Alert";
import { useParams, Navigate } from "react-router-dom";
import { isAuth } from "../auth/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import dImage from "../images/user-icon.png";
import Image from "react-bootstrap/Image";
export default function EditProfile() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [photo, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  let userPhoto ;
  let userData = new FormData();
  const handleChangeName = (e) => {
    e.preventDefault(); // prevent the default action
    setName(e.target.value); // set name to e.target.value (event)
  };
  const handleChangeEmail = (e) => {
    e.preventDefault(); // prevent the default action
    setEmail(e.target.value); // set name to e.target.value (event)
  };
  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };
  const handleChangeImage = (e) => {
    e.preventDefault(); // prevent the default action
    setImage(e.target.files[0]); // set name to e.target.value (event)
  };
  const handleChangeAbout = (e) => {
    e.preventDefault(); // prevent the default action
    setAbout(e.target.value); // set name to e.target.value (event)
  };
  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`, {
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
          setRedirectToSignin(true);
        } else {
          setEmail(data.email);
          setName(data.name);
          if(data.about){
            setAbout(data.about);

          }
          if(data.photo){
          userPhoto=data.photo;
        }else{
          userPhoto=dImage;

        }
        }
      });
  },[]);
  function clickSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const user = {
      name,
      email,
      password: password || undefined,
      photo: photo || undefined,
      about: about || undefined,
    };
    for (const name in user) {
      if (user[name] === undefined) {
        continue;
      } else {
        userData.append(name, user[name]);
      }
    }

    fetch(`http://localhost:8080/user/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${isAuth().token}`,
      },
      body: userData,
    })
      .then((res) => {
        let x = JSON.parse(localStorage.getItem("jwt"));
        x.user.name = user.name;
        x.user.email = user.email;
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt", JSON.stringify(x));
        setOpen(true);
        setRedirectToSignin(true);
        setEmail("");
        setErr("");
        setName("");
        setPassword("");
        setAbout("");
        return res.json();
      })
      .catch((err) => {
        console.log(err);
        setErr(err);
        setLoading(false);
      });
  }

 
  const redirect = redirectToSignin;

  if (redirect) {
    return <Navigate replace to={`/user/${id}`} />;
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
        you successfully Update your account ,
      </div>
      <Image
        style={{ height: "15vw", width: "100%", objectFit: "cover" }}
        src={userPhoto}
        alt={name}
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            onChange={handleChangeName}
            value={name}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAbout">
          <Form.Label>About</Form.Label>
          <Form.Control
            onChange={handleChangeAbout}
            value={about}
            type="textarea"
            placeholder="Enter about You"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChangeEmail}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChangePassword}
            value={password}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit} type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}
