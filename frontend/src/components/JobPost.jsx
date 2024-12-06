import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllJobErrors, postNewJob } from '../store/slices/jobSlice'
import { toast } from 'react-toastify'
import { CiCircleInfo } from "react-icons/ci";


const JobPost = () => {
  const [jobType, setJobType] = useState("")
  const [title, setTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [location, setLocation] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [responsibilities, setResponsibilities] = useState("")
  const [qualifications, setQualifications] = useState("")
  const [perks, setPerks] = useState("")
  const [salary, setSalary] = useState("")
  const [hiringMultipleCandidates, setHiringMultipleCandidates] = useState("")
  const [jobNiche, setJobNiche] = useState("")
  const [companyWebsiteTitle, setCompanyWebsiteTitle] = useState("")
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState("")

  const cities = [
    "Mumbai",
    "Delhi",
    "Bengaluru",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Kanpur",
    "Lucknow",
    "Nagpur",
    "Visakhapatnam",
    "Bhopal",
    "Patna",
    "Vadodara",
    "Cochin (Kochi)",
    "Agra",
    "Nashik",
  ];

  const nichesArray = [
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
  ];

  const {isAuthenticated, user} = useSelector(state => state.user);
  const {loading, error, message} = useSelector(state => state.jobs)

  const dispatch = useDispatch();

  const handleJobPosting = (e) => {
    const formData = new FormData();
    formData.append("jobType",jobType);
    formData.append("title",title);
    formData.append("jobDescription",jobDescription);
    formData.append("location",location);
    formData.append("responsibilities",responsibilities);
    formData.append("qualification",qualifications);
    formData.append("companyName",companyName);
    formData.append("jobNiche",jobNiche);
    formData.append("salary",salary);
    perks && formData.append("perks",perks);
    hiringMultipleCandidates && formData.append("hiringMultipleCandidates",hiringMultipleCandidates);
    companyWebsiteTitle && formData.append("companyWebsiteTitle",companyWebsiteTitle);
    companyWebsiteUrl && formData.append("companyWebsiteUrl",companyWebsiteUrl);
  
    dispatch(postNewJob(formData));
  }


  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearAllJobErrors())
    }
    if(message){
      toast.success(message)
    }
  },[dispatch,error,message, loading])


  return (
    <div className="account_components">
      <h3>Post A Job</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
        />
      </div>
      <div>
        <label>Job Type</label>
        <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
        </select>
      </div>
      <div>
        <label>Location (City)</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Select Job Type</option>
          {cities.map(element => <option key={element} value={element}>{element}</option>
          )}
        </select>
      </div>
      <div>
        <label>Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
      </div>
      <div>
        <label>Job Description</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Company / Job Introduction"
          rows={7}
        />
      </div>
      <div>
        <label>Responsibilities</label>
        <textarea
          value={responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          placeholder="Job Responsibilities"
          rows={7}
        />
      </div>
      <div>
        <label>Qualifications</label>
        <textarea
          value={qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          placeholder="Required Qualifications For Job"
          rows={7}
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Our Perks</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <textarea
          value={perks}
          onChange={(e) => setPerks(e.target.value)}
          placeholder="Write about the perks you are offering."
          rows={7}
        />
      </div>
      <div>
        <label>Job Niche</label>
        <select value={jobNiche} onChange={(e) => setJobNiche(e.target.value)}>
          <option value="">Select Job Niche</option>
          {nichesArray.map((element) => {
            return <option key={element} value={element}>{element}</option>;
          })}
        </select>
      </div>
      <div>
        <label>Salary</label>
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          placeholder="50000 - 800000"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Hiring Multiple Candidates?</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <select
          value={hiringMultipleCandidates}
          onChange={(e) => setHiringMultipleCandidates(e.target.value)}
        >
          <option value="">Hiring Multiple Candidates?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Name</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={companyWebsiteTitle}
          onChange={(e) => setCompanyWebsiteTitle(e.target.value)}
          placeholder="Peronsal Website Name/Title"
        />
      </div>
      <div>
        <div className="label-infoTag-wrapper">
          <label>Personal Website Link (URL)</label>
          <span>
            <CiCircleInfo /> Optional
          </span>
        </div>
        <input
          type="text"
          value={companyWebsiteUrl}
          onChange={(e) => setCompanyWebsiteUrl(e.target.value)}
          placeholder="Peronsal Website Link (URL)"
        />
      </div>
      <div>
        <button
          style={{ margin: "0 auto" }}
          className="btn"
          onClick={handleJobPosting}
          disabled={loading}
        >
          Post Job
        </button>
      </div>
    </div>
  );
}

export default JobPost
