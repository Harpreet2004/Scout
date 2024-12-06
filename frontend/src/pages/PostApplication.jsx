import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { useParams,Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearAllApplicationErrors, postApplication, resetApplicationSlice } from '../store/slices/applicationSlice';
import { fetchSingleJob } from '../store/slices/jobSlice';
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const PostApplication = () => {
  const {isAuthenticated, user} = useSelector(state => state.user)
  const {singleJob} = useSelector(state => state.jobs)
  const {error,message,loading} = useSelector(state => state.application)
  
  const {jobId} = useParams();
  
  const [userName,setuserName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [address,setAddress] = useState("");
  const [coverLetter,setCoverLetter] = useState("");
  const [resume,setResume] = useState("");

  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userName",userName)
    formdata.append("email",email)
    formdata.append("phone",phone)
    formdata.append("address",address)
    formdata.append("coverLetter",coverLetter)

    if(resume) {
      formdata.append("resume",resume);
    }

    dispatch(postApplication(formdata,jobId));

  }


  useEffect(() => {
    if(user) {
      setuserName(user.userName || "")
      setAddress(user.address || "")
      setEmail(user.email || "")
      setPhone(user.phone || "")
      setCoverLetter(user.coverLetter || "")
      setResume((user.resume && user.resume.url) || "")
    }
    if(error) {
      toast.error(error)
      dispatch(clearAllApplicationErrors());
    }
    if(message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchSingleJob(jobId))
  },[dispatch, error, message, jobId, user])


  let qualification = [];
  let responsibilities = [];
  let perks = [];
  if (singleJob.qualification) {
    qualification = singleJob.qualification.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.perks) {
    perks = singleJob.perks.split(". ");
  }
  
  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  // console.log(singleJob)
  return (
    <>
      <article className="application_page">
        <form>
          <h3>Application Form</h3>
          <div>
            <label>Job Title</label>
            <input type="text" placeholder={singleJob.title} disabled />
          </div>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div>
            <label>Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {user && user.role === "Job Seeker" && (
            <>
              <div>
                <label>Coverletter</label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={10}
                />
              </div>
              <div>
                <label>Resume</label>
                <input type="file" onChange={resumeHandler} />
              </div>
            </>
          )}

          {isAuthenticated && user.role === "Job Seeker" && (
            <div style={{ alignItems: "flex-end" }}>
              <button
                className="btn"
                onClick={handlePostApplication}
                disabled={loading}
              >
                Apply
              </button>
            </div>
          )}
        </form>

        <div className="job-details">
          <header>
            <h3>{singleJob.title}</h3>
            {singleJob.companyWebsite && (
              <Link target="_blank" to={singleJob.companyWebsite.url}>
                {singleJob.companyWebsite.title}
              </Link>
            )}
            <p>{singleJob.location}</p>
            <p>Rs. {singleJob.salary} P.A</p>
          </header>
          <hr />
          <section>
            <div className="wrapper">
              <h3>Job details</h3>
              <div>
                <IoMdCash />
                <div>
                  <span>Pay</span>
                  <span>{singleJob.salary} a month</span>
                </div>
              </div>
              <div>
                <FaToolbox />
                <div>
                  <span>Job type</span>
                  <span>{singleJob.jobType}</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Location </h3>
              <div className="location-wrapper">
                <FaLocationDot />
                <span>{singleJob.location}</span>
              </div>
            </div>
            <hr />
            <div className="wrapper">
              <h3>Full Job Description</h3>
              <p>{singleJob.jobDescription}</p>
              {singleJob.qualification && (
                <div>
                  <h4>Qualification</h4>
                  <ul>
                    {qualification.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.responsibilities && (
                <div>
                  <h4>Responsibilities</h4>
                  <ul>
                    {responsibilities.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {singleJob.perks && (
                <div>
                  <h4>Perks/Benefits</h4>
                  <ul>
                    {perks.map((element) => {
                      return (
                        <li key={element} style={{ listStyle: "inside" }}>
                          {element}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr />
          <footer>
            <h3>Job Niche</h3>
            <p>{singleJob.jobNiche}</p>
          </footer>
        </div>
      </article>
    </>
  )
}

export default PostApplication
