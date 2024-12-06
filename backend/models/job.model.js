import mongoose,{Schema} from "mongoose";


const jobSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    jobType: {
        type: String,
        required:true,
        enum:["Full-Time","Part-Time"]
    },
    location:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    jobDescription:{
        type: String,
        required: true 
    },
    responsibilities:{
        type: String,
        required: true
    },
    qualification:{
        type: String,
        required: true
    },
    perks:{
        type: String
    },
    salary:{
        type: String,
        required: true
    },
    hiringMultipleCandidates:{
        type: String,
        default: "No",
        enum: ["Yes","No"]
    },
    companyWebsite:{
        title: String,
        url: String
    },
    jobNiche:{
        type: String,
        required: true
    },
    newsLetterSent:{
        type: Boolean,
        default: false
    },
    postedBy:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps:true})


export const Job = mongoose.model("Job",jobSchema);