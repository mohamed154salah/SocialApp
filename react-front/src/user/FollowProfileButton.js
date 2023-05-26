import React from "react";
import { isAuth,follow } from "../auth/index";

const unfollow = (unfollowId, token, userId) => {
  return fetch("http://localhost:8080/unfollow", {
     method: "PUT",
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
       Authorization: `Bearer ${isAuth().token}`,
     },
     body: JSON.stringify({userId,unfollowId}),
   }).then((res) =>  res.json())
 };
const FollowProfileButton = (props) => {
  const unfollowClick = () => {
    console.log(props.id + "++" + isAuth().token + "++" + props.userId);
  props.clickunfollowButton(unfollow);
   
  };

  const followClick = () => {
    console.log(props.id + "++" + isAuth().token + "++" + props.userId);
  props.onButtonClick(follow);
   
  };
  return (
    <div className="d-inline-block mt-5">
      {!props.following ? (
        <button
          onClick={followClick}
          className="btn btn-success btn-raised mt-5"
        >
          follow
        </button>
      ) : (
        <button onClick={unfollowClick} className="btn btn-danger btn-raised mt-5">unfollow</button>
      )}
    </div>
  );
};

export default FollowProfileButton;
