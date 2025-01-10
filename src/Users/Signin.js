import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../FormContext";
const Signin = () => {
    const {
        handleLogin,
        errors,setUserAuth,
        isSubmitted,
        userData, setUserData
      } = useContext(UserContext);
      const navigate =useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    if (handleLogin()) {
      setUserAuth(true);
        setUserData({
            username: "",
            password: "",
          });
      navigate("/"); // Navigate to home page on successful login
    }
  };

 
  return (
    <div className="container page-content   mt-5">
      <h2 className="text-center">Login</h2>
      <form onSubmit={onSubmit} >
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
          {/* user Name Field */}
        <div className="form-group">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>


        {/* Submit Button */}
        <button type="submit" className="btn mt-4 btn-primary btn-block">
          Sign In
        </button>
      </form>
      {isSubmitted && <p className="text-success mt-3">Form submitted successfully!</p>}
      <p>Don't have account?</p>
      <Link to="/signup" className="btn btn-primary" > Register Now</Link>
    </div>
  );
};

export default Signin;
