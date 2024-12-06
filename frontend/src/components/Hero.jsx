import React from 'react'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"

const Hero = () => {
  const {isAuthenticated} = useSelector(state => state.user);

  return (
    <section className="hero ">
      <div className="hero-text ">
        <h1 className='!leading-[1.3]'><span>Scout</span> Your <span>Dream Job </span> Today!🚀</h1>
        <h4 className='!text-[20px]'>
        Start scouting your dream job today and take the first step toward a brighter future!
        </h4>
      {!isAuthenticated ? <Link to={"/login"} className='btn flex items-center justify-center'>Scout Now🎯</Link>: <Link to={"/dashboard"} className='btn flex items-center justify-center'>Go to Dashboard</Link>}
      </div>
      <div className='h-[500px] hero-img-container'>
        <img  className='h-[500px] hero-img' src="/assets/business-deal-animate.svg" alt="hero-svg" />
      </div>
    </section>
  );
};

export default Hero
