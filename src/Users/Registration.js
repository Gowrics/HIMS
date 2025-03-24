import React, { useContext } from "react";
import { TextField, Button, Container, Typography, Box, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/Context";

const Registration = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Check if user already exists
      const checkUser = await axios.get(`http://localhost:8006/users?email=${formData.email}`);
      if (checkUser.data.length > 0) {
        alert("User already exists. Please log in.");
        return;
      }

      // Generate a token (replace this with JWT in a real app)
      const token = Math.random().toString(36).substring(2);

      // Register user
      console.log(formData)
      await axios.post("http://localhost:8006/users", { ...formData, token });

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
                label="Name"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
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
