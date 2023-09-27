const express = require("express");
const uploadController = require("../controllers/upload.controllers");
const validateUser = require("../middlewares/validateUser");
const router = express.Router();

router.post("/upload", uploadController.uploadFiles);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

module.exports = router;
