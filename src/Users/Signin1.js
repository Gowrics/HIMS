import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate,useLocation  } from "react-router-dom";
import { UserContext } from "../Context/Context";

const Signin = () => {
    const {
        handleLogin,
        errors,setUserAuth,
        isSubmitted,
        userData, setUserData
      } = useContext(UserContext);

      const navigate = useNavigate();
      const location = useLocation();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8084/login", userData);
      const { token } = response.data;
  
      if (token) {
        localStorage.setItem("authToken", token); // Store token in localStorage
        setUserAuth(true);
        setUserData({ email: "", password: "" });
  
        // Redirect after login
        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/home";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectTo);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };
  

 
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "300px" }}>
        <h4 className="text-center mb-3">Login</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="email"
            className="form-control mb-2"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
        <div className="text-center mt-2">
          <small>Don't have an account? <Link to="/signup">Register</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Signin;
