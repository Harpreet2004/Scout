import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <footer>
        <div>
          <img src="/assets/logo.png" alt="logo" />
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>Gurugram, India.</li>
            <li>info@scout.com</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h4>Follow Us</h4>
          <ul>
            <li>
              <Link to={"https://github.com/Harpreet2004"} target="_blank">
                <span>
                  <FaGithub />
                </span>
                <span>Github</span>
              </Link>
            </li>
            <li>
              <Link to={"https://www.linkedin.com/in/harpreet-singh04/"} target="_blank">
                <span>
                  <FaLinkedin />
                </span>
                <span>LinkedIn</span>
              </Link>
            </li>
          </ul>
        </div>
      </footer>
      <div className="copyright !text-[#7b2cbf]">&copy; Made with ❤️ by Harpreet</div>
    </>
  );
};

export default Footer;
