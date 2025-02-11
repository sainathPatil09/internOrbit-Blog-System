import mongoose from "mongoose";
import express from 'express'

const likeSchema = new mongoose.Schema({
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
})

export const Like = new mongoose.model("Like", likeSchema);
