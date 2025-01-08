import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/healthcare.png";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top ">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Brand Logo"
            style={{ height: "40px", width: "60px" }}
          />
          <h1>HIMS</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/departmentview">
                Departments
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-white"
                to="#"
                id="servicesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/nationality">
                    Nationality
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/department">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/docters">
                    Docters
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-white" to="/docterview">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
