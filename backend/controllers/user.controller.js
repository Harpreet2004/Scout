import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendJwtToken } from "../utils/jwtToken.js";

// CHECK WIHTOUT UPLOADING RESUME****************

export const registerUser = asyncHandler(async (req, res) => {
  //get the details

  const {
    email,
    userName,
    phone,
    address,
    password,
    role,
    firstNiche,
    secondNiche,
    thirdNiche,
    coverLetter,
  } = req.body;
  // console.log(userName ,email ,phone ,address ,password ,role,firstNiche,secondNiche,thirdNiche," Register")
  //validate the user
  if (!userName || !email || !phone || !address || !password || !role) {
    throw new ApiError(400, "All fields are required!");
  }

  //check the role of the user if  === job seeker then get its niches
  if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
    throw new ApiError(
      400,
      "Please provide your preferred niches to begin Scouting."
    );
  }

  //check if user already exists
  const findUser = await User.findOne({ email });
  if (findUser) {
    throw new ApiError(401, "User already exists!");
  }

  //now get the resume if user wants to send
  const userData = {
    email,
    userName,
    phone,
    address,
    password,
    role,
    niches: {
      firstNiche,
      secondNiche,
      thirdNiche,
    },
    coverLetter,
  };

  if (req.files && req.files.resume) {
    const { resume } = req?.files;
    if (!resume) {
      throw new ApiError(500, "Cannot get the resume.");
    }

    try {
      const uploadResume = await cloudinary.uploader.upload(
        resume.tempFilePath,
        { folder: "JOB_SEEKER'S_RESUMES" }
      );

      if (!uploadResume || uploadResume.error) {
        throw new ApiError(500, "Failed to upload resume to cloudinary");
      }

      userData.resume = {
        public_id: uploadResume.public_id,
        url: uploadResume.secure_url,
      };
    } catch (error) {
      throw new ApiError(500, "Failed to upload resume, please try again!");
    }
  }

  const userCreated = await User.create(userData);

  if (!userCreated) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  sendJwtToken(userCreated, 201, res, "User Registered Successfully");
});

export const login = asyncHandler(async (req, res) => {
  //find if email exists
  //if not create a new account msg
  //check if email & password matches

  const { email, role, password } = req.body;
  if (!(email || role || password)) {
    throw new ApiError(400, "User credentials are required!");
  }
  
  const user = await User.findOne({ email }).select("+password");
  // console.log(user)

  if (!user) {
    throw new ApiError(400, "Invalid email & password");
  }

  const checkPassword = await user.isPasswordCorrect(password);

  if (!checkPassword) {
    throw new ApiError(400, "Password is not correct");
  }

  if (user.role !== role) {
    throw new ApiError(400, "Please select correct role");
  }

  sendJwtToken(user, 200, res, "User logged in Successfully");
});

export const logout = asyncHandler(async (req, res) => {
  res
  .status(200)
  .clearCookie("token")
  .json(
    new ApiResponse("200",{},"User logged out Successfully!")
  )
});


export const getUser = asyncHandler(async(req,res) => {
  const getUser = req.user;

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      {getUser},
      "Successfully Fetched the current user."
    )
  )
})


export const updateUser = asyncHandler(async(req,res) => {
  const userDetails = {
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    coverLetter: req.body.coverLetter,
    phone : req.body.phone,
    address : req.body.address,
    niches :{
      firstNiche : req.body.firstNiche,
      secondNiche : req.body.secondNiche,
      thirdNiche : req.body.thirdNiche,
    } 
  }

  const {firstNiche,secondNiche,thirdNiche} = userDetails.niches;

  if(req.user.role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)){
    throw new ApiError(400,"Please select the preferred niches");
  }

  if(req.files) {
    const {resume} = req.files;

    if(resume){
      const currentResume = req.user.resume.public_id;
      if(currentResume){
        await cloudinary.uploader.destroy(currentResume);
      }

      const uploadResume = await cloudinary.uploader.upload(resume.tempFilePath,{
        folder: "JOB_SEEKER'S_RESUMES"
      });

      if(!uploadResume){
        throw new ApiError(500,"Something went wrong while uploading the resume");
      }

      userDetails.resume = {
        public_id: uploadResume.public_id,
        url: uploadResume.secure_url
      }

    }
  }

  const userupdate = await User.findByIdAndUpdate(
    req.user._id,
    userDetails,
    {
      new:true,
    }
  );

  if(!userupdate){
    throw new ApiError(500,"Internal server error while updating the user");
  }

  return res
  .status(200)
  .json(
    new ApiResponse(
      200,
      userDetails,
      "User updated Successfully"
    )
  )
});


export const updatePassword = asyncHandler(async(req,res) => {
  //get pass
  const {oldPassword,newPassword,confirmPassword} = req.body;

  if(!newPassword || !oldPassword || !confirmPassword) {
    throw new ApiError(400,"Please provide your password");
  }

  const user = await User.findById(req.user?.id).select("+password");

  // compare if pass correct
  const checkPassword = await user.isPasswordCorrect(oldPassword);

  if(!checkPassword){
    throw new ApiError(400,"Old password is not correct.")
  }
  
  if(newPassword !== confirmPassword){
    throw new ApiError(400,"Confirm Password and new Password does not match");
  }

  //if correct let him change the password
  user.password = newPassword;
  
  
  //once changed save the user details with new password
  await user.save({validateBeforeSave:false});
  sendJwtToken(user,200,res,"Password updated Successfully")

});