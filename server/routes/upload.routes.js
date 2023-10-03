const express = require("express");
const uploadController = require("../controllers/upload.controllers");
const validateUser = require("../middlewares/validateUser");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/upload", upload.single('file'), uploadController.singleFileUpload);
router.get("/files", uploadController.getListFiles);
router.get("/files/:name", uploadController.download);

module.exports = router;
