import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Job } from "../models/job.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Application } from "../models/application.model.js";

export const postApplication = asyncHandler(async (req, res) => {
  const { jobid } = req.params; //jodid

  const { userName, email, phone, address, coverLetter } = req.body;

  if (!(userName || email || phone || address || coverLetter)) {
    throw new ApiError(400, "All fields are required!");
  }

  if (!jobid) {
    throw new ApiError(400, "Please provide job id.");
  }

  const jobSeekerInfo = {
    id: req.user._id,
    userName,
    email,
    phone,
    address,
    coverLetter,
    role: "Job Seeker",
  };

  const jobDetails = await Job.findById(jobid);

  if (!jobDetails) {
    throw new ApiError(404, "Job not found");
  }

  const isAlreadyApplied = await Application.findOne({
    "jobInfo.jobId": jobid,
    "jobSeekerInfo.id": req.user?._id,
  });

  if (isAlreadyApplied) {
    throw new ApiError(400, "You have already applied to this job");
  }

  if (req.files?.resume) {
    const { resume } = req.files;

    try {
      const cloudinaryResumeResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          folder: "JOB_SEEKER'S_RESUMES",
        }
      );

      if (!cloudinaryResumeResponse || cloudinaryResumeResponse.error) {
        throw new ApiError(500, "Failed to upload resume");
      }

      jobSeekerInfo.resume = {
        public_id: cloudinaryResumeResponse.public_id,
        url: cloudinaryResumeResponse.secure_url,
      };
    } catch (error) {
      throw new ApiError(500, "Failed to upload resume");
    }
  } else {
    if (!req.user?.resume.url) {
      throw new ApiError(400, "Please upload your resume");
    }   

    jobSeekerInfo.resume = {
      public_id: req.user?.resume.public_id,
      url: req.user?.resume.url,
    };

    // console.log(jobSeekerInfo)
  }

  const employerInfo = {
    id: jobDetails.postedBy,
    role: "Employer",
  };

  const jobInfo = {
    jobId: jobid,
    jobTitle: jobDetails.title,
  };

  const postApplication = await Application.create({
      jobSeekerInfo,
      employerInfo,
      jobInfo,
    });
    
    // console.log(employerInfo,jobInfo,postApplication)
  if (!postApplication) {
    throw new ApiError(
      500,
      "Something went wrong while posting the application, please try again."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        postApplication,
        "Application submitted Successfully"
      )
    );
});

export const getAllApplicationByEmployer = asyncHandler(async (req, res) => {
    const employerId = req.user._id;

    if(!employerId){
        throw new ApiError(400,"User does not exist");
    }

    const findAllApplications = await Application.find({
        "employerInfo.id": employerId,
        "deletedBy.employer": false
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            findAllApplications,
            "All Applications fetched Successfully"
        )
    )
});

export const getAllApplicationByJobSeeker = asyncHandler(async (req, res) => {
    const jobSeekerId = req.user._id;

    if(!jobSeekerId){
        throw new ApiError(400,"User does not exist");
    }

    const findAllApplications = await Application.find({
        "jobSeekerInfo.id": jobSeekerId,
        "deletedBy.jobSeeker": false
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            findAllApplications,
            "All Applications fetched Successfully"
        )
    )
}
);

export const deleteApplication = asyncHandler(async (req, res) => {
    // const {applicationId} = req.params;
    // // console.log(applicationId)
    
    // const findApplication = await Application.findById(applicationId);
    
    // // console.log(findApplicatio.)
    
    // if(!findApplication) {
    //   throw new ApiError(404,"Application not found");
    // }
    
    // const {role}  = req.user;

    // switch (role) {
    //     case "Job Seeker":
    //       findApplication.deletedBy.jobSeeker = true;
    //         await Application.save();
    //         break;
    
        
    //     case "Employer":
    //       findApplication.deletedBy.employer = true;
    //         await Application.save();
    //         break;

    //     default:
    //         throw new ApiError(400,"You are not allowed to delete the application.")
    // }

    // if(findApplication.deletedBy.employer === true && findApplication.deletedBy.jobSeeker === true) {
    //     await Application.deleteOne();
    // }

    const { id } = req.params;
  const application = await Application.findById(id);
  if (!application) {
    throw new ApiError(404,"Application not found");
  }
  const { role } = req.user;
  switch (role) {
    case "Job Seeker":
      application.deletedBy.jobSeeker = true;
      await application.save();
      break;
    case "Employer":
      application.deletedBy.employer = true;
      await application.save();
      break;

    default:
      console.log("Default case for application delete function.");
      break;
  }

  if (
    application.deletedBy.employer === true &&
    application.deletedBy.jobSeeker === true
  ) {
    await application.deleteOne();
  }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Application deleted Successfully"
        )
    )

});
