const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/post", postController.getPosts);
router.get("/post/by/:userId", postController.getPostsByUser);
router.post("/post/new/:userId", requireSignin, postController.createPost);
router.put("/post/update/:postId",requireSignin,postController.updatePost);
router.delete(
  "/post/:postId",
  requireSignin,
  postController.isPoster,
  postController.deletePost
);
router.put("/post/like", postController.like);
router.put("/post/unlike", postController.unlike);

router.put("/post/comment", postController.comment);
router.put("/post/uncomment", postController.uncomment);

router.get("/post/photo/:postId", postController.postPhoto);
router.get("/singlePost/:postId", postController.singlePost);

router.param("userId", userById);
router.param("postId", postController.postById);
module.exports = router;

