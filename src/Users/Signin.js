import React, { useContext } from "react";
import { Container, Grid, Paper, Typography, TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import loginlogo from '../assets/loginlogo.jpg';
import axios from "axios";
const Signin = () => {
  const {  setUserAuth,singleUser,setSingleUser, userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userData)
      const res = await axios.post("http://192.168.1.18:8082/loginPage/login", userData);
      console.log(res.data)
      if (res.data === "Login successful!") {
        alert("Registration successful! Please log in.");
        setUserAuth(true);
        setUserData({ email: "", password: "" });
        setSingleUser(userData)
        const redirectTo = localStorage.getItem("redirectAfterLogin") || "/";
            localStorage.removeItem("redirectAfterLogin"); // Clear after use
            navigate(redirectTo);
      }
      else{
        alert("Invalid username or password!")
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
    
  };
    return (
    <Box sx={{ minHeight: "81vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4" }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, borderRadius: "15px" }}>
          <Grid container spacing={3} alignItems="center">
            
            {/* Left Side - Image */}
            <Grid item xs={12} md={6}>
              <Box component="img"
                src={loginlogo}
                alt="Sign In"
                sx={{ maxWidth: "100%", borderRadius: "15px" }}
              />
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
                Sign In
              </Typography>
              <form onSubmit={onSubmit}>
                <TextField 
                  fullWidth 
                  label="Email" 
                  name="email" 
                  variant="outlined" 
                  margin="normal" 
                  value={userData.email} 
                  onChange={handleChange} 
                />
                <TextField 
                  fullWidth 
                  label="Password" 
                  name="password" 
                  type="password" 
                  variant="outlined" 
                  margin="normal" 
                  value={userData.password} 
                  onChange={handleChange} 
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                  Sign In
                </Button>
              </form>
              <Typography variant="body2" textAlign="center" mt={2}>
                Don't have an account? <Link to="/signup">Register</Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signin;
