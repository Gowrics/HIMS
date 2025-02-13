import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/healthcare.png";
import { UserContext } from "../Context/Context";


const Navbar = () => {
  const { setSingleUser, setUserData, singleUser, setUserAuth, UserAuth } =
    useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true); // Manage collapse state
  const navigate = useNavigate();

  const handleLogout = () => {
    setSingleUser({});
    setUserAuth(false);
    navigate("/");
    setUserData({
      username: "",
      password: "",
    });
    console.log("logout", singleUser);
  };

  const handleMenuCollapse = () => {
    setIsCollapsed(true); // Collapse menu after click
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light fixed-top ">
      <div className="container-fluid ms-5">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Brand Logo"
            style={{ height: "40px", width: "60px" }}
          />
          <h1 style={{ marginLeft: "10px" }}>HIMS</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isCollapsed ? "false" : "true"} // Toggle the expanded state
          aria-label="Toggle navigation"
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse on button click
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-center ${
            isCollapsed ? "" : "show"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav  ">
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={handleMenuCollapse}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/departmentview"
                onClick={handleMenuCollapse}
              >
                Departments
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/docterview"
                onClick={handleMenuCollapse}
              >
                Doctors
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link "
                to="/about"
                onClick={handleMenuCollapse}
              >
                About
              </Link>
            </li>

            <li className="ms-5">
              {singleUser && Object.keys(singleUser).length > 0 ? (
                <button
                  className="btn btn-primary ms-1 btn-block"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  className="btn text-light"
                  style={{ backgroundColor: "#122738 " }}
                  to="/signin"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Outlet></Outlet>
    </nav>

  );
};

export default Navbar;
