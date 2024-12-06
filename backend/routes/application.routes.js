import express from "express"
import { isAuhtorized,isAuthenticated } from "../middlewares/auth.middleware.js";
import { deleteApplication, getAllApplicationByEmployer, getAllApplicationByJobSeeker, postApplication } from "../controllers/application.controller.js";

const router = express.Router();


router.post("/post/:jobid",isAuthenticated,isAuhtorized("Job Seeker"),postApplication);

router.get("/employer/getall",isAuthenticated,isAuhtorized("Employer"),getAllApplicationByEmployer);

router.get("/jobseeker/getall",isAuthenticated,isAuhtorized("Job Seeker"),getAllApplicationByJobSeeker);

router.delete("/delete/:id",isAuthenticated,deleteApplication);


export default router;