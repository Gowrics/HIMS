import React, { useState } from "react";
import axios from "axios";

import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import { Link } from "react-router";

const Signin1 = ({ setAuthUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:8006/users?email=${formData.email}`);
      console.log("Response:", res);

      if (res.data.length > 0) {
        const user = res.data.find((u) => u.password === formData.password);
        console.log("User:", user);

        if (user) {
          const token = Math.random().toString(36).substring(2);

          // Store token in db.json
          await axios.patch(`http://localhost:8006/users/${user.id}`, { token });

          // Store user in state
          setAuthUser({ ...user, token });

          alert("Login successful!");
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <Button component={Link} to="/signup" variant="outlined" color="primary">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Signin1;
