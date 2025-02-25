import React from "react";
import { Link, Outlet } from "react-router";

const services = [
  { id: 1, title: "Nationality Management", description: "Efficient Nationality records management." ,link:"nationality"},
  { id: 2, title: "Department Management", description: "Efficient  Departments records management.",link:"department"},
  { id: 3, title: "Doctor Management", description: "Efficient  Docters  records management.",link:"docters" },
//   { id: 4, title: "Pharmacy Management", description: "Stock tracking, prescription management, and alerts for low inventory." },
//   { id: 5, title: "Laboratory Reports", description: "Manage lab tests, reports, and patient history efficiently." },
];

const ServicePage = () => {
  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="text-center py-5  text-dark">
        <h1>Hospital Management Services</h1>
        <p>Providing efficient and automated healthcare solutions</p>
      </div>

      {/* Services Section */}
      <div className="row mt-4">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body text-center">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
                <Link to={service.link} className="btn btn-primary">
                  Go to
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="text-center mt-5 p-4 bg-light">
        <h4>Contact Us</h4>
        <p>Email: contact@hospitalservices.com | Phone: +123 456 7890</p>
      </div>
      <Outlet/>
    </div>
  );
};

export default ServicePage;
