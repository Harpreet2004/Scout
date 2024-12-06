import React, { useEffect,useState }from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {toast} from "react-toastify";
import { clearAllUpdateProfileErrors, updateProfile } from '../store/slices/updateProfile';
import { getUser } from '../store/slices/userSlice';
import {Link} from "react-router-dom"


const UpdateProfile = () => {
  const {isUpdated,loading,error} = useSelector(state => state.updateProfile)
  const dispatch = useDispatch();
  const { user }  = useSelector(state => state.user)
  const [userName,setuserName] = useState(user && user.userName);
  const [email,setEmail] = useState(user && user.email);
  const [phone,setPhone] = useState(user && user.phone);
  const [address,setAddress] = useState(user && user.address);
  const [coverLetter,setCoverLetter] = useState(user && user.coverLetter);
  const [resume,setResume] = useState(null);
  const [resumePreview,setresumePreview] = useState(user && user.resume?.url);
  const [firstNiche,setFirstNiche] = useState(user && user.niches?.firstNiche);
  const [secondNiche,setSecondNiche] = useState(user && user.niches?.secondNiche);
  const [thirdNiche,setThirdNiche] = useState(user && user.niches?.thirdNiche);

  // {console.log(user)}
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


  const handleUpdateProfile = () => {
    const formdata = new FormData();
    formdata.append("userName",userName);
    formdata.append("email",email);
    formdata.append("phone",phone);
    formdata.append("address",address);
    if(user.role && user.role === "Job Seeker"){
      formdata.append("firstNiche",firstNiche);
      formdata.append("secondNiche",secondNiche);
      formdata.append("thirdNiche",thirdNiche);
      formdata.append("coverLetter",coverLetter);
    }
    if(resume){
      formdata.append("resume",resume);
    }

    dispatch(updateProfile(formdata));
}


  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if(isUpdated){
      toast.success("Profile Updated");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileErrors());
    }
  },[dispatch,user,loading,isUpdated,error])


  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setresumePreview(reader.result);
      setResume(file);
    }
  }


  return (
    <div className="account_components">
      <h3>Update Profile</h3>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
      </div>
      <div>
        <label>Email Address</label>
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
            <label>My Preferred Job Niches</label>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <select
                value={firstNiche}
                onChange={(e) => setFirstNiche(e.target.value)}
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={secondNiche}
                onChange={(e) => setSecondNiche(e.target.value)}
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
              <select
                value={thirdNiche}
                onChange={(e) => setThirdNiche(e.target.value)}
              >
                {nichesArray.map((element, index) => {
                  return (
                    <option value={element} key={index}>
                      {element}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label>Coverletter</label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={5}
            />
          </div>
          <div>
            <label>Upload Resume</label>
            <input type="file" onChange={resumeHandler} />
            {user && user.resume && (
              <div>
                <p>Current Resume:</p>
                <Link
                  to={user.resume && user.resume.url}
                  target="_blank"
                  className="view-resume"
                >
                  View Resume
                </Link>
              </div>
            )}
          </div>
        </>
      )}
      <div className="save_change_btn_wrapper">
        <button
          className="btn"
          onClick={handleUpdateProfile}
          disabled={loading}
        >
          {" "}
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default UpdateProfile
