import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from './routes/user.route.js'
import blogRoute from './routes/blog.route.js'
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'; 

const app = express();
dotenv.config()

const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;

//Middleware
app.use(express.json());
app.use(cookieParser());  
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods:['GET', 'POST', 'PUT', 'DELETE' ],
}));

app.use(fileUpload({
  useTempFiles:true,
  tempFiledir:'/tmp/'
}))


try {
  mongoose.connect(MONGO_URL);
  console.log("connected to MONGODB");
} catch {
  console.log(error);
}

app.get('/',(req, res)=>{
  res.send("Hello");
})

app.use("/api/users",userRoute)
app.use("/api/blogs",blogRoute)


//cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY, 
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
