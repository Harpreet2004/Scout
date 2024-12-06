import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import { clearAllUserErrors, register } from '../store/slices/userSlice'
import { toast } from "react-toastify"
import { FaAddressBook, FaPencilAlt, FaRegUser } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";


const Register = () => {
  const [role,setRole] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [password,setPassword] = useState("")
  const [firstNiche,setFirstNiche] = useState("")
  const [secondNiche,setSecondNiche] = useState("")
  const [thirdNiche,setThirdNiche] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [resume,setResume] = useState("")


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


  const handleResume = (e) => {
    const userResume = e.target.files[0];
    setResume(userResume)
  }

  const {isAuthenticated, loading, error, message} = useSelector(state => state.user)


  const dispatch = useDispatch();
  const navigatoTo = useNavigate();

  const handleRegistration = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("role", role);
    formData.append("userName", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    if(role === "Job Seeker"){
      formData.append("firstNiche", firstNiche);
      formData.append("secondNiche", secondNiche);
      formData.append("thirdNiche", thirdNiche);
      formData.append("coverLetter", coverLetter);
      formData.append("resume", resume);
    }

    dispatch(register(formData))
  }

  useEffect(() => {
    if(error) {
      toast.error("All fields are required");
      dispatch(clearAllUserErrors())
    }

    if(isAuthenticated) {
      navigatoTo("/")
    }

  },[dispatch, isAuthenticated, error, message, loading])


  return (
    <>
      <section className='authPage'>
          <div className='container'>
              <div className="header">
                <h3>Create a new account 😎</h3>
              </div>
              <form onSubmit={handleRegistration}>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Register as</label>
                      <div>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                          <option> Select Role</option>
                          <option value="Employer">Register as Employer</option>
                          <option value="Job Seeker">Register as Job Seeker</option>
                        </select>
                        <FaRegUser/>
                      </div>
                    </div>
                    <div className="inputTag">
                      <label>Name</label>
                      <div>
                      <input type="text" placeholder='Your Name' value={name} onChange={(e) => setName(e.target.value)}/>
                        <FaPencilAlt />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
                    <div className="inputTag">
                      <label>Email</label>
                      <div>
                        <input type="email" 
                          placeholder='youremail@gmail.com'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <MdOutlineMailOutline />
                      </div>
                    </div>
                    <div className="inputTag">
                      <label>Phone Number</label>
                      <div>
                        <input
                          type="number"
                          placeholder="999-777-666"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <FaPhoneFlip />
                      </div>
                    </div>
                  </div>
                  <div className="wrapper">
              <div className="inputTag">
                <label>Address</label>
                <div>
                  <input
                    type="text"
                    placeholder="Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <FaAddressBook />
                </div>
              </div>
              <div className="inputTag">
                <label>Password</label>
                <div>
                  <input
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <RiLock2Fill />
                </div>
              </div>
            </div>
                {role === "Job Seeker" && (
              <>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Your First Niche</label>
                    <div>
                      <select
                        value={firstNiche}
                        onChange={(e) => setFirstNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Second Niche</label>
                    <div>
                      <select
                        value={secondNiche}
                        onChange={(e) => setSecondNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                  <div className="inputTag">
                    <label>Your Third Niche</label>
                    <div>
                      <select
                        value={thirdNiche}
                        onChange={(e) => setThirdNiche(e.target.value)}
                      >
                        <option value="">Your Niche</option>
                        {nichesArray.map((niche, index) => {
                          return (
                            <option key={index} value={niche}>
                              {niche}
                            </option>
                          );
                        })}
                      </select>
                      <MdCategory />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Coverletter</label>
                    <div>
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        rows={10}
                      />
                    </div>
                  </div>
                </div>
                <div className="wrapper">
                  <div className="inputTag">
                    <label>Resume</label>
                    <div>
                      <input
                        type="file"
                        onChange={handleResume}
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <button type="submit" disabled={loading}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
              </form>
          </div>
      </section>
    </>
  )
}

export default Register
