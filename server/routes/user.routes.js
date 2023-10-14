const express= require('express');
const userController = require('../controllers/user.controllers');
const validateUser = require('../middlewares/validateUser');
const router = express.Router();
const upload = require("../middlewares/upload");

// auth routes
router.post("/signup",userController.signup);
router.post("/login",userController.login);
router.post("/logout",userController.logout);


router.get("/profile", validateUser, userController.getProfile);
router.get("/profile/:username", validateUser, userController.getUserProfile);
router.get("/byId/:id", validateUser, userController.getUserProfileById);
router.post("/follow/:id",validateUser,userController.followUnfollowUser);
router.post("/update/user/:id", validateUser, userController.updateUser);
router.post("/update/password/:id", validateUser, userController.updateUserPassword);
router.post(
  "/update/profilePic/:id",
  validateUser,
  upload.single("img"),
  userController.updateUserProfilePic
);

// router.post("/unfollow",userController.logout);




module.exports = router
