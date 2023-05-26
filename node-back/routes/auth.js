const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

const { userByID } = require("../controllers/user");
router.post("/signup", authController.signup);
router.post("/signin", authController.signIn);
router.get("/signout", authController.signOut);

router.param("userId", function (req, res, id) {
  userByID(req, res, id);
});
module.exports = router;
