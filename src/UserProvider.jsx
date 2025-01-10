import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "./FormContext";

export const UserProvider = ({ children }) => {
  const [userCredential, setUsercredential] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [UserAuth, setUserAuth] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.username.trim()) {
      newErrors.username = "User Name is required.";
    }

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

  useEffect(() => {
    axios
      .get("http://localhost:8004/userData")
      .then((res) => {
        setUsercredential(res.data); // Update the userCredential state with the fetched data
        console.log("Fetched user data:", res.data); // Log the fetched data directly
      })
      .catch((err) => console.error("Error fetching user data:", err));
    console.log(userCredential);
  }, []);

  const handleLogin = () => {
    if (validateUser()) {
      const user = userCredential.find(
        (user) =>
          user.username === userData.username &&
          user.password === userData.password
      );

      if (user) {
        setSingleUser(user); // Set user data on successful login
        setUserAuth(true); // Set authentication status
        console.log("Login successful:", user);
        setUserData({
          username: "",
          password: "",
        });
      } else {
        alert("Invalid username or password.");
      }
    }
  };

  const validateUser = () => {
    const newErrors = {};
    if (!userData.username.trim())
      newErrors.username = "User Name is required.";
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
        formData,
        setFormData,
        validateUser,
        singleUser,
        errors,
        setErrors,
        UserAuth, // Pass the authentication status
        setUserAuth,
        setSingleUser,
        isSubmitted,
        setIsSubmitted,
        validateForm,
        userData,
        handleLogin,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
