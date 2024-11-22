import mongoose from "mongoose";

export const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    blogImage:{
        public_id:{
            type:String,
            require:true,
        },
        url:{
            type:String,
            require:true,
        },
    },
    category:{
        type:String,
        require:true,
    },
    about:{
        type:String,
        require:true,
        minlength:[200, "should contain at least 200 character!"]
    },
    adminName:{
        type:String,
    },
    adminPhoto:{
        type:String,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    }
})

export const Blog=mongoose.model("Blog",blogSchema);