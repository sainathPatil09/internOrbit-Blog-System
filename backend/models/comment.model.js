import express from "express";
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    require: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  content: { type: String, required: true },
  name:{
    type: String,
    require:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = new mongoose.model("Comment", commentSchema);
