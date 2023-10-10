const express = require('express')
const app = express();
// const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const cookieParser = require('cookie-parser');
const morgan = require("morgan");
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const uploadRoutes = require('./routes/upload.routes');


const PORT = process.env.PORT
connectDb();
app.use(express.json());
// app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan("tiny"));
const allowedOrigins = [
  "localhost",
  "http://localhost:3000",
  "http://localhost:3000/",
  "http://localhost:3001",
  "http://localhost:3001/",
  "http://192.168.213.118:3000",
  "http://192.168.213.118:3000/"
];
var corsOptions = {
  origin: function (origin, callback) {
      callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(process.env.IMAGE_ASSETS_PATH, express.static("uploads"));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/uploads', uploadRoutes);


app.get("/", (req, res) => {
    res.json(
      "Hi there from Amaan Haider,  This is a BACKEND SERVER OF KONVOO APP 🦄✨💬"
    );
  });


app.listen(PORT,()=>{
    console.log(`runnig on ${PORT}`);
})
