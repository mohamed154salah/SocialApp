const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

router.get("/allusers", userController.allUsers);
router.get("/user/:userId", requireSignin, userController.findUser);
router.put("/user/:userId", requireSignin, userController.updateUser);
router.put(
  "/follow",
  requireSignin,
  userController.addFollowing,
  userController.addFollower
);
router.put(
  "/unfollow",
  requireSignin,
  userController.removeFollowing,
  userController.removeFollower
);
router.get("/user/findpeople/:userId",requireSignin,userController.findPeople)
router.delete("/user/:userId", requireSignin, userController.deleteUser);
router.get("/user/photo/:userId", userController.userPhoto);


router.param("userId", userController.userById);


module.exports = router;
