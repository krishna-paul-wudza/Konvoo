const mongoose = require("mongoose");
require("dotenv").config();
const Grid = require("gridfs-stream");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
let gfs;
mongoose.connection.on("connected", () => {
  gfs = Grid(mongoose.connections[0].db, mongoose.mongo);
  gfs.collection("uploads");
})
let bucket;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: process.env.IMG_BUCKET,
  });
  console.log(bucket);
});

module.exports = connectDB;
