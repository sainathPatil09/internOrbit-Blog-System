import { User } from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookies from "../jwt/AuthToken.js";


export const register=async (req, res)=>{
    // console.log("Registered info stored")
    try {
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({message: "User photo required"})
        }
        const {photo} = req.files;
        const allowedFormats = ["image/jpeg", "image/png", "image/webp"]
        if(!allowedFormats.includes(photo.mimetype)){
            return res.status(400).json({message:"Invalid photo format, only jpeg, png, webp are allowed"})
        }
        const {email, name, password,role,phone,education} = req.body;
        
        if(!email || !name || !password || !role || !phone || !education || !photo){
            return res.status(400).json({message: "Please fill required fileds"});
        }
    
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exist"});
        }
    
        const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
        )
        if(!cloudinaryResponse || cloudinaryResponse.error){
            console.log(cloudinaryResponse.error)
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({email, name, password:hashedPassword, role, phone, education, photo:{public_id:cloudinaryResponse.public_id, url:cloudinaryResponse.url}});
        await newUser.save();
    
        if(newUser){
            let token = await createTokenAndSaveCookies(newUser._id, res);
            console.log("Register:" , token);
            return res.status(201).json({message: "User register succesfully", newUser, token:token});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"});
    }

}