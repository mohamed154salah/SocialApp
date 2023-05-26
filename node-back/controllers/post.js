const Post = require("../models/post");
const fs = require("fs");
const formidable = require("formidable");
const _ = require("lodash");

exports.postById = (req, res, next, id) => {
  Post.findById(id)
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, post) => {
      if (err) {
        return res.status(404).json({ error: err });
      }
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      req.post = post;
      next();
    });
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("postedBy", "_id name")
      .select("_id title body created photo likes comments")
      .sort({ created: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.profile._id }).populate(
      "postedBy",
      "_id name"
    );
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

/* exports.createPost = (req, res) => {
  setTimeout(() => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files);
      if (err) {
        return res.status(400).json({ error: "Image could not be uploaded" });
      }
      console.log(req.profile);
      let post = new Post(fields);
      post.postedBy = req.profile;
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.filepath);
        post.photo.contentType = files.photo.mimetype;
      }
      post.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        res.json(result);
      });
    });
  }, 200);
}; */
exports.createPost = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      console.log(fields);
      console.log(files);
      if (err) {
        return res.status(400).json({ error: "Image could not be uploaded" });
      }
          let post = new Post(fields);
          post.postedBy = req.profile;
          if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.filepath);
            post.photo.contentType = files.photo.mimetype;
          }

     const result = await post.save();
     res.json(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ err: "photo couldn't uploaded" });
      }
      let post = req.post;
      post = _.extend(post, fields);
      post.updated = Date.now();
      if (files.photo) {
        post.photo.data = fs.readFileSync(files.photo.filepath);
        post.photo.contentType = files.photo.mimetype;
      }
      const result = await post.save();
      res.json(result);
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.isPoster = async (req, res, next) => {
  try {
    let isPoster =
      req.auth && req.post && req.post.postedBy._id.toString() === req.auth._id;
    if (!isPoster) {
      return res.status(403).json({
        error: "User is not authorized",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postPhoto = async (req, res, next) => {
  try {
    if (req.post.photo && req.post.photo.data) {
      res.set("Content-Type", req.post.photo.contentType);
      return res.send(req.post.photo.data);
    } else {
      res.status(204).json({ error: "error: photo doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.singlePost = (req, res) => {
  let post = req.post;
  return res.status(200).json(post);
};
exports.deletePost = async (req, res) => {
  try {
    let post = req.post;
    await Post.deleteOne(post);
    res.json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.comment = async (req, res, next) => {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      {
        $push: {
          comments: {
            text: req.body.text,
            postedBy: req.body.userId,
            created: Date.now(),
          },
        },
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    const post = await Post.findById(req.body.postId)
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    req.post = post;
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.uncomment = async (req, res, next) => {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $pull: { comments: { _id: req.body.commentId } } },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }
    const post = await Post.findById(req.body.postId)
      .populate("postedBy", "_id name")
      .populate("comments.postedBy", "_id name");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    req.post = post;
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


exports.like = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { likes: req.body.userId } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
exports.unlike = async (req, res, next) => {
  try {
    const result = await Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
