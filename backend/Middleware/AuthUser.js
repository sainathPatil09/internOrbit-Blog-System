import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';


//Authentication
export const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        console.log("Middleware: " , token);
        if(!token){
            return res.status(401).json({Message:"User not Authenticated "});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded: ", decoded)
        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(404).json({Message: "User not found"})
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error occured in Authentication " + error)
        return res.status(401).json({error: "User not Authenticated"});
    }
}

export const isAdmin = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message: `User with given role ${req.user.role} not allowed`})
        }

        next()
    }
}
