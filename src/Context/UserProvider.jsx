import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./Context";
import { useFetchData } from "../utils/Actions";
export const UserProvider = ({ children }) => {
  const [userCredential, setUsercredential] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [UserAuth, setUserAuth] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userData, setUserData] = useState({
    // username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    // if (!formData.username.trim()) {
    //   newErrors.username = "User Name is required.";
    // }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  useFetchData(
   "http://localhost:8005/adminData",
   setUsercredential
  );

  
    console.log(userCredential);
  
  const handleLogin = () => {
    if (validateUser()) {
      const user = userCredential.find(
        (user) =>
          user.email === userData.email && user.password === userData.password
      );

      if (user) {
        setSingleUser(user); // Set user data on successful login
       // setUserAuth(true); // Set authentication status
        console.log("Login successful:", user);
        setUserData({
          email: "",
          password: "",
        });
        return true; // Indicate successful login
      } else {
        alert("Invalid username or password.");
        return false; // Indicate login failure
      }
    }
    return false; // Indicate validation failure
  };

  const validateUser = () => {
    const newErrors = {};
    if (!userData.email.trim()) newErrors.email = "User Name is required.";
    if (!userData.password) {
      newErrors.password = "Password is required.";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <UserContext.Provider
      value={{
        formData,   setFormData,
        validateUser,singleUser,
        errors,    setErrors,
        UserAuth,    setUserAuth,
        setSingleUser,
        isSubmitted, setIsSubmitted,
        validateForm,
        userData, setUserData,
        handleLogin

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
