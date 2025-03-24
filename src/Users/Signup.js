import React, { useContext } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";

const Registration = () => {
    const {formData,  setFormData,  errors,   isSubmitted,  setIsSubmitted,  validateForm,  } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log(formData);
        // Register user with correct data format
      await axios.post("http://192.168.1.18:8082/loginPage/register", formData);
  setIsSubmitted(true
    
  )
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registration Form
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            {/* Name Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>

            {/* Email Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            {/* Password Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>

        {isSubmitted && <Typography color="success.main" mt={2}>Form submitted successfully!</Typography>}

        <Typography mt={2}>Already have an account?</Typography>
        <Button component={Link} to="/signin" variant="outlined" color="primary">
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Registration;
