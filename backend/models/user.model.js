import mongoose, { Schema } from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phone:{
        type:Number,
        require:true,
    },
    photo:{
        public_id:{
            type:String,
            require:true,
        },
        url:{
            type:String,
            require:true,
        },
    },
    education:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        require:true,
        enum:["user","admin"],
    },
    password:{
        type:String,
        require:true,
        select:false,
        minlength:8
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    token:{
        type:String,
    }


})



export const User=mongoose.model("User",userSchema);