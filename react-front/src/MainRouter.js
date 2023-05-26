import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import FindPeople from "./user/FindPeople";
import Menu from "./core/Menu";
import Signin from "./user/Signin";
import Signup from "./user/Signup"
import Profile from "./user/Profile"
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import NewPost from "./post/NewPost";
import Post from "./post/Post";
import UpdatePost from "./post/UpdatePost"
const MainRouter = () => {
  return (
    <div>
    <Menu/>
    <Routes>
      <Route exact path="/post/:id" element={<Post/>} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/signup" element={<Signup />}/>
      <Route exact path="/signin" element={<Signin />}/>
      <Route exact path="/user/:id" element={<Profile/>}/>
      <Route exact path="/user/edit/:id" element={<EditProfile/>}/>
      <Route exact path="/users" element={<Users/>}/>
      <Route exact path="/user/FindPeople/:id" element={<FindPeople/>}/>
      <Route exact path="/post/new/:Id" element={<NewPost/>}/>
      <Route exact path="/post/update/:id" element={<UpdatePost/>}/>

    </Routes>
    </div>
    
  );
};
export default MainRouter;
