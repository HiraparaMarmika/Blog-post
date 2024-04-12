import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import { FaBloggerB } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../login/Login";

export default function Navbar() {
  const [islogin, setislogin] = useState(false);
  const Navigatelogout = useNavigate();
  const logout = () => {
    localStorage.removeItem("login");
    setislogin(true);
    Navigatelogout("/login");
  };

  const [isadmin, setisadmin] = useState(false);
  const login = JSON.parse(localStorage.getItem("login"));

  useEffect(() => {
    if (login.role == "admin") {
      setisadmin(true);
    }
  }, [login]);

  return (
    <>
      <div className="container">
        <div className="nav-link">
          <div className="nav-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
          <div className="nav-login">
            <NavLink to="/login" className="link-login" onClick={logout}>
              {islogin ? "Login" : "Logout"}
            </NavLink>
          </div>
        </div>
      </div>
      <div className="blognav-container">
        <div className="blog-main">
          <div className="blog-title">
            <h1>
              <FaBloggerB />
              MY BLOGS
            </h1>
          </div>
          <div className="blog-links">
            <NavLink to="/" className="links">
              Home
            </NavLink>
            {isadmin && (
              <NavLink to="/blog" className="links">
                Blog
              </NavLink>
            )}

            <NavLink to="/postapi" className="links">
              Post
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
