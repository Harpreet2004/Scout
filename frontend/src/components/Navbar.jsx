import React,{useState} from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";


const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [isClicked,setClicked] = useState(false)

  const handlefunction = () => {
    setShow(!show);
    setClicked(!isClicked);
  }
  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div className={` ${isClicked ? "removehidden" : "links"}`}>
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => handlefunction()} />
      </nav>
    </>
  );
};

export default Navbar;
