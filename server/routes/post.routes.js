const express= require('express');
const postController = require('../controllers/post.controllers');
const validateUser = require('../middlewares/validateUser');
const upload = require('../middlewares/upload');
const router = express.Router();



router.get("/get/:id",postController.getPost)
router.get("/myPosts", validateUser, postController.getUserPosts);
router.get("/feed", validateUser, postController.getFeedPosts);
router.post("/create", validateUser, upload.single('img'), postController.createPost);
router.post("/like/:id", validateUser, postController.likeUnlikePost);
router.post("/reply/:id", validateUser, postController.replyToPost);
router.delete("/:id", validateUser, postController.deletePost);



module.exports = router
