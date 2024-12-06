import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Job } from "../models/job.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const postJob = asyncHandler(async (req, res) => {
  const {
    title,
    jobType,
    location,
    companyName,
    jobDescription,
    responsibilities,
    qualification,
    perks,
    salary,
    hiringMultipleCandidates,
    companyWebsiteTitle,
    companyWebsiteUrl,
    jobNiche,
  } = req.body;

  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !jobDescription ||
    !responsibilities ||
    !qualification ||
    !salary ||
    !jobNiche
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const postedBy = req.user?._id;
  const jobCreated = await Job.create({
    title,
    jobType,
    location,
    companyName,
    jobDescription,
    responsibilities,
    qualification,
    perks,
    salary,
    hiringMultipleCandidates,
    companyWebsite: {
      title: companyWebsiteTitle,
      url: companyWebsiteUrl,
    },
    jobNiche,
    postedBy,
  });

  if (!jobCreated) {
    throw new ApiError(500, "Something went wrong while ");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, jobCreated, "Job Posted Successfully"));
});

export const getallJobs = asyncHandler(async (req, res) => {
  const { location, searchKeyword, niche } = req.query;
  const query = {};


  if (location) {
    query.location = location;
  }

  if (niche) {
    query.jobNiche = niche;
  }

  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { jobDescription: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  const getJob = await Job.find(query);
  // console.log(getJob)

  if (!getJob) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the jobs, please try after some time."
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { getJob, count: getJob.length },
        "Successfully fetched all the jobs."
      )
    );
});

export const getMyJobs = asyncHandler(async (req, res) => {
  const getMyJobs = await Job.find({ postedBy: req.user._id });

  if (!getMyJobs) {
    throw new ApiError("400", "Please post a job.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, getMyJobs, "Successfully fetched all your jobs!")
    );
});

export const deleteJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new ApiError(404, "Oops! Job not found.");
  }
  await job.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Job deleted successfully"));
});

export const getSingleJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(404, "Oops! Job not found.");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            job,
            "Job fetched Successfuly"
        )
    )

});
