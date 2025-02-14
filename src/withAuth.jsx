import React, { useContext } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./Context/Context";

const withAuth = (Component) => {
  return function WithAuthWrapper(props) { // ✅ Use a valid component
    const { UserAuth } = useContext(UserContext); // ✅ useContext inside a component
    const location = useLocation(); // Get current page URL

    if (!UserAuth) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card shadow p-4 text-center" style={{ width: "350px" }}>
            <h2 className="mb-3">Hospital Management System</h2>
            <p className="text-muted">You must be logged in to access this page.</p>
            <Link to="/signin" className="btn btn-primary mt-3 w-100">
              Login
            </Link>
          </div>
        </div>
      );
    }

    return <Component {...props} />; // ✅ Pass props to wrapped component
  };
};

export default withAuth;
