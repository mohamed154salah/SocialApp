const User = require("../models/user");
const mongoose = require("mongoose");
const _ = require("lodash");
const fs = require("fs");
const formidable = require("formidable");

exports.userById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("following", "_id name")
      .populate("followers", "_id name");
    if (!user) {
      return res.status(400).json({
        error: "user not found here",
      });
    }
    req.profile = user;
    console.log("heeel" + req.profile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.hasAuthorization = (req, res) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: "user is not authorized to perform this action",
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "name email updated created photo about"
    );
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.findUser = async (req, res) => {
  try {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.status(200).json(req.profile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    res.set("Content-Length", req.profile.photo.data.length);
    res.write(req.profile.photo.data);
    return res.end();
  } else {
    res.status(404).json({ error: "error: photo don't exists" });
  }
  next();
};
exports.updateUser = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "photo couldn't uploaded" });
      }
      let user = req.profile;
      user = _.extend(user, fields);
      user.updated = Date.now();
      if (files.photo) {
        user.photo.data = fs.readFileSync(files.photo.filepath);
        user.photo.contentType = files.photo.mimetype;
      }
      const result = await user.save();
      return res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    console.log("User deleted", req.profile._id);
    const result = await User.findOneAndDelete({ _id: req.profile._id });
    if (!result) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    console.log(result);
    return res.json({ success: true, msg: "User deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
//follow
exports.addFollowing = async (req, res, next) => {
  try {
    if (req.body.userId === req.body.followId) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }
    const { _id, following } = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { following: req.body.followId } },
      { new: true }
    );
    if (!following.includes(req.body.followId)) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.addFollower = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.body.followId },
      { $push: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    if (!result) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    result.hashed_password = undefined;
    result.salt = undefined;
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

//unfollow
exports.removeFollowing = async (req, res, next) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { following: req.body.unfollowId } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.removeFollower = async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.body.unfollowId },
      { $pull: { followers: req.body.userId } },
      { new: true }
    )
      .populate("following", "_id name")
      .populate("followers", "_id name")
      .exec();
    if (!result) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.findPeople = async (req, res) => {
  try {
    let following = req.profile.following;
    following.push(req.profile._id);
    const users = await User.find({ _id: { $nin: following } }).select(
      "name photo"
    );
    if (!users) {
      return res.status(404).json({ success: false, msg: "No users found" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
