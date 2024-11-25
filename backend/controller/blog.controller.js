
import { mongoose } from "mongoose"; 
import { Blog } from "../models/blog.model.js";
import { v2 as cloudinary } from 'cloudinary';

export const createBlog = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Blog Image is required" });
    }
    const { blogImage } = req.files;
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedFormats.includes(blogImage.mimetype)) {
      return res
        .status(400)
        .json({
          message: "Invalid photo format, only jpeg, png, webp are allowed",
        });
    }
    const { title, category, about } = req.body;

    if (!title || !category || !about) {
      return res
        .status(400)
        .json({ message: "title, category and about are required field " });
    }

    const adminName = req?.user?.name;
    const adminPhoto = req?.user?.photo?.url;
    const createdBy = req?.user?._id;

    const cloudinaryResponse = await cloudinary.uploader.upload(
      blogImage.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.log(cloudinaryResponse.error);
    }

    const blogData = {
      title,
      about,
      category,
      adminName,
      adminPhoto,
      createdBy,
      blogImage: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
    const blog = await Blog.create(blogData);

    return res.status(201).json({ message: "Blog created succesfully", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteBlog=async(req, res)=>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        return res.status(404).json({Message: "Blog not found"});
    }

    await blog.deleteOne();
    return res.status(200).json({message: "Blog deleted succescully"});
}


export const getAllBlogs=async(req, res)=>{
    const allBlogs = await Blog.find();
    console.log(allBlogs)
    res.status(200).json(allBlogs)
}

export const getSingleBlog=async(req, res)=>{
    const{id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message: "Invalid Blog id"})
    }

    const blog = await Blog.findById(id);

    if(!blog){
        return res.status(404).json({message: "Blog not found"});
    }

    res.status(200).json(blog)
}


export const getMyBlogs=async(req, res)=>{
    const createdBy = req.user._id;
    const myBlogs = await Blog.find({createdBy});
    res.status(200).json(myBlogs)
}

export const updateBlog=async(req, res)=>{
  const{id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({message: "Invalid Blog id"})
  }

  const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new:true});

  if(!updateBlog){
      return res.status(404).json({message: "Blog not found"});
  }

  res.status(200).json(updateBlog)
 
}
