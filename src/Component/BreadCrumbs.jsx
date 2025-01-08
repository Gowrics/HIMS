import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Define your route-to-title mapping
  const routeTitles = {
    "": "Home",
    nationality: "Nationality",
    department: "Departments",
    docters: "Doctors",
    about: "About",
    departmentview: "Department View",
    docterview: "Doctor View",
  };

  return (
    <div className="breadcrumbsdiv">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return isLast ? (
              <li
                className="breadcrumb-item active"
                key={to}
                aria-current="page"
              >
                {routeTitles[value] || value}
              </li>
            ) : (
              <li className="breadcrumb-item" key={to}>
                <Link to={to}>{routeTitles[value] || value}</Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
