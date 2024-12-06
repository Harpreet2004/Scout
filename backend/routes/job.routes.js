import express from "express"
import { isAuthenticated,isAuhtorized } from "../middlewares/auth.middleware.js";
import { postJob,getallJobs,getMyJobs,deleteJob,getSingleJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/post",isAuthenticated,isAuhtorized("Employer"),postJob)
router.get("/getall",getallJobs)
router.get("/myjobs",isAuthenticated,isAuhtorized("Employer"),getMyJobs)
router.delete("/delete/:id",isAuthenticated,isAuhtorized("Employer"),deleteJob);
router.get("/get/:id",isAuthenticated,getSingleJob);

export default router;