import React from "react";

import { quality } from "../assets/ArrayData";
import { Link } from "react-router";
import PageHead from "../Component/PageHead";
import BreadCrumbs from "../Component/BreadCrumbs";
import Breadcrumbs from "../Component/BreadCrumbs";
const About = () => {
  return (
    <div>
      <section className="page-content quality slide-up">
        <div className="row firsthead">
          <div className="container col-md-5 mt-5 mb-5 ">
            <PageHead
              heading="About Us"
              title="Tackle The Challenge Of Delivering Health Care"
              text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
              alias earum recusandae ipsa cum? Inventore totam eius expedita
              
              sint asperiores eos, corrupti, distinctio fuga reiciendis
              possimus, dolore labore. Rerum, esse?"
            />
            <div className="text-center">
              <Link className="btn btn-lg me-4" to="/departmentview">
                View Departments
              </Link>
              <Link className="btn btn-lg me-4" to="/about">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="container cards col-md-6">
            <div className="row">
              {quality.map((card, index) => (
                <div className="col-md-6 mb-4" key={card.id}>
                  <div className="card">
                    <img
                      src={card.img}
                      className="card-img-top"
                      alt={`Card ${index + 1}`}
                    />
                    <div className="card-body">
                      <h6 style={{ color: "#E22454" }} className="card-title">
                        {card.title}
                      </h6>
                      <p className="card-text">{card.text}</p>
                      <a href="#" style={{ textDecoration: "none" }}>
                        <h6 style={{ color: "#E22454" }}>Read more</h6>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
