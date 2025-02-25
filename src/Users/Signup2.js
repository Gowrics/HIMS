import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";
import api from "./api";


const Signup = () => {
    const {
        formData,
        setFormData,
        errors,
        isSubmitted,
        setIsSubmitted,
        validateForm,
      } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
      console.log("Form Data:", formData);
      api.post("/users", formData)
      .then((res) => {
        console.log("Form submitted", res.data);
        setFormData(res.data);
      })
      .catch((error) => {
        console.error("Signup error", error);
      });
    
      alert("Registration successful!");
      setFormData({
        name: "",
        
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="container page-content  mt-5">
      <h2 className="text-center">Registration Form</h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={` form-control ${errors.email ? "is-invalid" : ""}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn mt-4 btn-primary btn-block">
          Register
        </button>
      </form>

      {isSubmitted && <p className="text-success mt-3">Form submitted successfully!</p>}
      <p>Already have an account?</p>
      <Link to="/signin" className="btn btn-primary" > Sign In</Link>
    </div>
  );
};

export default Signup;

