import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async(req,_,next) => {
    const { token } = req.cookies;
    if(!token){
        throw new ApiError(400,"User is not Authenticated");
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decode.id)

    next();
});


export const isAuhtorized = (...roles) => {
    return (req,_,next) => {
        if(!roles.includes(req.user.role)){
            throw new ApiError(400,`${req.user.role} is not authorized to access this resource`);
        }
        next();
    }
}