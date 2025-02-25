import React from "react";
import { Link, Outlet } from "react-router";

const services = [
  { id: 1, title: "patientmaintype Management", description: "Efficient patientmaintype records management." ,link:"patientmaintype"},
  { id: 2, title: "patientsubtype Management", description: "Efficient  patientsubtype records management.",link:"patientsubtype"},
  { id: 3, title: "thirdpartyhead Management", description: "Efficient  thirdpartyhead  records management.",link:"thirdpartyhead" },
  { id: 1, title: "policiessubpatient Management", description: "Efficient thirdpartyhead records management." ,link:"thirdpartyhead"},
  { id: 2, title: "subpoliciespatient Management", description: "Efficient  subpoliciespatient records management.",link:"subpoliciespatient"},
  { id: 3, title: "copaycoverage Management", description: "Efficient  copaycoverage  records management.",link:"copaycoverage" },
  { id: 1, title: "pricelist Management", description: "Efficient pricelist records management." ,link:"pricelist"},
  { id: 2, title: "pricelistdetails Management", description: "Efficient  pricelistdetails records management.",link:"pricelistdetails"},
  { id: 3, title: "pricelistdeprule Management", description: "Efficient  pricelistdeprule  records management.",link:"pricelistdeprule" },
  { id: 3, title: "copaycoverage Management", description: "Efficient  copaycoverage  records management.",link:"copaycoverage" },
  { id: 1, title: "pricelist Management", description: "Efficient pricelist records management." ,link:"pricelist"},
  { id: 2, title: "pricelistdetails Management", description: "Efficient  pricelistdetails records management.",link:"pricelistdetails"},
  { id: 3, title: "pricelistdeprule Management", description: "Efficient  pricelistdeprule  records management.",link:"pricelistdeprule" },
  { id: 3, title: "pricedetailsdeprule Management", description: "Efficient  pricedetailsdeprule  records management.",link:"pricedetailsdeprule" },
  { id: 1, title: "servicecategory Management", description: "Efficient servicecategory records management." ,link:"servicecategory"},
  { id: 2, title: "cptcodes Management", description: "Efficient  cptcodes records management.",link:"cptcodes"},
  { id: 3, title: "loinccodes Management", description: "Efficient  loinccodes  records management.",link:"loinccodes" },
  { id: 3, title: "servicemaster Management", description: "Efficient  servicemaster  records management.",link:"servicemaster" },

];

const PatientServicePage = () => {
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

export default PatientServicePage;
