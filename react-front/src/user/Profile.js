import React, { useEffect, useState } from "react";
import { isAuth } from "../auth/index";
import { Navigate, Link, useParams } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import dImage from "../images/user-icon.png";
import Image from "react-bootstrap/Image";
import ProfileTabs from "./ProfileTabs";
import FollowProfileButton from "./FollowProfileButton";
const Profile = () => {
  const [user, setUser] = useState({following:[],followers:[]});
  const [following, setFollowing] = useState(false);
  const [posts, setPosts] = useState([]);

  const [redirectToSignin, setRedirectToSignin] = useState(false);
  let { id } = useParams();
  //check follow
  const checkFollow = (user) => {
    const jwt = isAuth();
    const match = user.followers.find((follower) => {
      return follower._id === jwt.user._id;
    });
    return match;
  };
  const clickFollowButton = (apiCall) => {
     apiCall(id, isAuth().token, isAuth().user._id)
     .then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data);
        setFollowing(!following);
      }
    }); 
  }; 

  const clickunfollowButton = (apiCall) => {
    apiCall(id, isAuth().token, isAuth().user._id)
    .then((data) => {
     if (data.error) {
      console.log(data.error);
     } else {
       setUser(data);
       setFollowing(!following);
     }
   }); 
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
          setFollowing(checkFollow(data));
          setUser(data);
        }
      });
      fetch(`http://localhost:8080/post/by/${id}`, {
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
            console.log()
            setPosts(data);
          }
        });
  }, [id]);
console.log(posts)
  const userPhoto = id ? `http://localhost:8080/user/photo/${id}` : dImage;

  const redirect = redirectToSignin;
  if (redirect) {
    return <Navigate replace to="/signin" />;
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mt-5 mb-5"> Profile</h2>
          {user.photo ? (
            <Image
              style={{ height: "15vw", width: "100%", objectFit: "cover" }}
              src={userPhoto}
              alt={user.name}
              thumbnail="true"
            />
          ) : (
            <Image
              style={{ height: "15vw", width: "100%", objectFit: "cover" }}
              src={dImage}
              alt={user.name}
              thumbnail="true"
            />
          )}
          <p>hello, {user.name}</p>
          <p>Email: {user.email}</p>
          {user.about ? <p>About: {user.about}</p> : null}
          <p>joined: {new Date(user.created).toDateString()}</p>
          {user.updated ? (
            <p>updated: {new Date(user.updated).toDateString()}</p>
          ) : null}
        </div>
        <div className="md-6">
          {user && user._id === isAuth().user._id ? (
            <div className=" col d-inline-block mt-5">
            <Link
                className=" row btn btn-raised btn-secondary mr-5 "
                to={`../post/new/${user._id}`}
              >
                Create Post
              </Link>
              <Link
                className=" row btn btn-raised btn-success mr-5"
                to={`../user/edit/${user._id}`}
              >
                Edit Profile
              </Link>
              <DeleteUser />
            </div>
          ) : (
            <FollowProfileButton
              id={id}
              userId={isAuth().user._id}
              following={following}
              onButtonClick={clickFollowButton}
              clickunfollowButton={clickunfollowButton}
            />
          )}
        </div>
        <hr/>
        <ProfileTabs userFollowers={user.followers} userFollowing={user.following} posts={posts}/>
      </div>
    </div>
  );
};

export default Profile;
