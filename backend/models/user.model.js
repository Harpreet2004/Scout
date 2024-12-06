import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        // trim:true
        // minLength: [3,"Name must Contain atleast 3 characters"],
        // maxLength: [25,"Name cannot exceed 30 characters"]
    },
    email:{
        type: String,
        required: true,
        // unique: true,
        validator: [validator.email,"Please provide valid email"]
    },
    password:{
        type: String,
        select: false,
        required: true,
        // minLength: [8,"Password must be longer that 8 characters"],
        // maxLength: [32,"Password cannot exceed more than 32 characters"]
    },
    resume:{
        public_id: String, //cloudinary id
        url: String //cloudinary url
    },
    coverLetter:{
        type: String
    },
    role:{
        type: String,
        trim:true,
        required: true,
        enum: ["Job Seeker", "Employer"]
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    niches:{
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String
    }   
},{timestamps:true});



userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) next(); 
    this.password = await bcrypt.hash(this.password,10);
    next();
})


userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE
    })
}   



export const User = mongoose.model("User",userSchema);