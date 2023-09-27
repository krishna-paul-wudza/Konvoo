const express = require('express')
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./config/db");
const cookieParser =require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const uploadRoutes = require('./routes/upload.routes');


const PORT = process.env.PORT
connectDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const allowedOrigins = [
  "localhost",
  "http://localhost:3000",
  "http://localhost:3000/",
  "http://localhost:3001",
  "http://localhost:3001/",
];
var corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
      console.log("------");
      console.log("origin", origin);
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

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
