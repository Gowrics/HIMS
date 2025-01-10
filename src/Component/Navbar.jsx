import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/healthcare.png";
import { UserContext } from "../FormContext";
const Navbar = () => {
  const { setSingleUser, setUserData, singleUser, setUserAuth, UserAuth } =
    useContext(UserContext);
  console.log("userauth", UserAuth);
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
            </li>{" "}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/docterview">
                Docters
              </Link>
            </li>{" "}
            {UserAuth ? (
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

                <ul
                  className="dropdown-menu"
                  aria-labelledby="servicesDropdown"
                >
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
            ) : (
              // If UserAuth is false, show the login state
              <div></div>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="ms-5">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
