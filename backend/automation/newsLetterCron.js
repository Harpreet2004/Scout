import cron from "node-cron";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { sendMail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
    cron.schedule("*/1 * * * *", async() => {
        const jobs = await Job.find({newsLetterSent:false});
        
        for(const job of jobs) {
            try {
                const filteredUsers = await User.find({
                    $or: [
                        {"niches.firstNiche": job.jobNiche},
                        {"niches.secondNiche": job.jobNiche},
                        {"niches.thirdNiche": job.jobNiche}
                    ]
                });

                for(const user of filteredUsers) {
                    const subject = `Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
                    const message = `Hi ${user.userName},\n\nGreat news! A new job that fits your niche has just been posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! \n\n Best of luck!\n\nBest Regards,\nScout Team`;
                    sendMail({
                        email: user.email,
                        subject,
                        message
                    })
                }

                job.newsLetterSent = true,
                await job.save();

            } catch (error) {
                throw new ApiError(500,"Error in node cron ")
            }
        }
    });
}
