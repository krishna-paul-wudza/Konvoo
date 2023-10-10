const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

// var storage = new GridFsStorage({
//   url: process.env.MONGODB_GRIDFS_URL,
  // options: { useNewUrlParser: true, useUnifiedTopology: true },
  // file: (req, file) => {
  //   const match = ["image/png", "image/jpeg"];
  //   console.log(file)
  //   if (match.indexOf(file.mimetype) === -1) {
  //     const filename = `${Date.now()}-${file.originalname}`;
  //     return filename;
  //   }

  //   return {
  //     bucketName: process.env.IMG_BUCKET,
  //     filename: `${Date.now()}-${file.originalname}`,
  //   };
  // },
  // file: (req, file) => {
  //   return new Promise((resolve, reject) => {
  //     const filename = file.originalname;
  //     const fileInfo = {
  //       filename: filename,
  //       bucketName: "uploads",
  //     };
  //     const match = ["image/png", "image/jpeg"];
  //     console.log(file, match.indexOf(file.mimetype));
  //     if (match.indexOf(file.mimetype) === -1) {
  //       const filename = `${Date.now()}-${file.originalname}`;
  //       reject("mimetype does not match");
  //     }
  //     resolve(fileInfo);
  //   });
  // },
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + String(file.originalname).replace(/ /g, "_")
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

// var upload = multer({ storage });
// var uploadFiles = multer({ storage: storage }).single("file");
// var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = upload;
