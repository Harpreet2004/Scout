import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import {Link} from "react-router-dom"

const Jobs = () => {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedniche, setSelectedniche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs,loading,error} = useSelector((state) => state.jobs);

  const handleLocationChange = (location) => {
    setLocation(location);
    setSelectedLocation(location);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedniche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(location, niche, searchKeyword));
  }, [dispatch, error, location, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(location, niche, searchKeyword));
  };

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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <div className="search-tab-wrapper">
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
            <FaSearch />
          </div>
          <div className="wrapper">
            <div className="filter-bar">
              <div className="cities">
                <h2>Filter Job By City</h2>
                {cities.map((city, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="location"
                      id={city}
                      checked = {city === selectedLocation}
                      onChange={() => handleLocationChange(city)}
                      value={city}
                    />
                    <label htmlFor={city}>{city}</label>
                  </div>
                ))}
              </div>
              <div className="cities">
                <h2>Filter Job By Niche</h2>
                {nichesArray.map((niche, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      name="niches"
                      id={niche}
                      checked = {niche === selectedniche}
                      onChange={() => handleNicheChange(niche)}
                      value={niche}
                    />
                    <label htmlFor={niche}>{niche}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="container">
              <div className="mobile-filter">
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="">Filter By City</option>
                  {
                    cities.map((city,idx) => (
                      <option value={city} key={idx}>
                        {city}
                      </option>
                    ))
                  }
                </select>
                <select value={niche} onChange={(e) => setNiche(e.target.value)}>
                  <option value="">Filter By Niche</option>
                  {
                    nichesArray.map((niche,idx) => (
                      <option value={niche} key={idx}>
                        {niche}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="jobs_container">
                  
                {
                  jobs && jobs.map(job => (
                    <div className="card" key={job._id}>
                      {
                        job.hiringMultipleCandidates === "Yes" ? (
                          <p className="hiring-multiple">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="hiring">Hiring</p>
                        )
                      }
                      <p className="title">{job.title}</p>
                      <p className="company">{job.companyName}</p>
                      <p className="location">{job.location}</p>
                      <p className="salary"><span>Salary:</span> Rs.{job.salary}</p>
                      <p className="posted">
                        <span>Posted On</span>
                        {job.createdAt.substring(0,10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link className="btn" to={`/post/application/${job._id}`}>
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  ))  
                }
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
