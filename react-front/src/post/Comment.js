import React, { useState } from "react";
import { isAuth } from "../auth/index";
import Button from "react-bootstrap/Button";
const Comment = (props) => {
  const postId = props.postId;
  const [body, setBody] = useState("");
  const handleChangeBody = (e) => {
    e.preventDefault(); // prevent the default action
    setBody(e.target.value); // set name to e.target.value (event)
  };
  const comment = (postId, userId) => {
    let text=body
    return  fetch("http://localhost:8080/post/comment", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${isAuth().token}`,
      },
      body: JSON.stringify({ userId, postId, text }),
    }).then((res) =>  res.json())
  };
  const clickCo=()=>{
    setBody("");
    props.clickComment(comment);

  }
  return (
    <div>
      <h3>Add Comment</h3>
      <input
        onChange={handleChangeBody}
        value={body}
        type="textarea"
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          border: "3px solid  #A10035",
          backgroundColor: "#E97777",
          color: "white",
        }}
        placeholder="Enter comment  "
      />
      <Button
        variant="success"
        onClick={clickCo}
      >
        Post Comment
      </Button>
     
    </div>
  );
};

export default Comment;
