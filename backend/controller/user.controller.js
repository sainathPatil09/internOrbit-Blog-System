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

export const login = async(req, res)=>{
    const {email, password, role} = req.body;
    
    try {
        if(!email || !password || !role){
            return res.status(400).json({Message: "Please fill required field"})
        }
        const user = await User.findOne({email}).select("+password");
        console.log(user);

        if(!user.password){
            return res.status(400).json({message:"User password is missing"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid email or password"})
        }

        if(user.role !== role){
            return res.status(400).json({message: `Given role ${role} not found`})
        }

        let token = await createTokenAndSaveCookies(user._id, res);
        console.log("Loggin: ", token);
        return res.status(200).json({message:"User loggedin Succesfully",
             user:{
                _id:user._id,
                name:user.name,
                password:user.password,
                role:user.role,
            },
            token:token,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error : "Internal server error"});
    }

}

export const logout = async(req, res)=>{
    try {
        res.clearCookie("jwt", {httpOnly: true})
        res.status(200).json({message: "User logged out Succesfully"})    
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }   
}


export const getMyProfile = async(req, res)=>{
    const user = await req.user;
    if(!user){
        res.status(400).json({message: "User not found"})
    }
    res.status(200).json(user);
}