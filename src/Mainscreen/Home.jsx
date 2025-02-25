import React from "react";
import banner from "../assets/banner-img.png";
import { Link } from "react-router-dom"; // Updated to react-router-dom
import About from "./About";
import Authendicate from "../Authendicate";
import AddUser from "../Adduser";


const Home = () => {
  return (
    <>
      <section className="container-fluid home page-content ">
        <div className="row firsthead ">
          <div className="col-md-6 slide-up">
            <h6>Welcome to BashilHut.</h6>
            <h1>Exceptional Medical Specialty Healthcare</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo
              alias earum recusandae ipsa cum? Inventore totam eius expedita
              sint asperiores eos, corrupti, distinctio fuga reiciendis
              possimus, dolore labore. Rerum, esse?
            </p>
            <div>
              <Link className="btn btn-lg me-4" to="/departmentview">
                View Departments
              </Link>
              <Link className="btn btn-lg me-4" to="/about">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="col-md-6 slide-up">
            <img src={banner} className="banner img-fluid" alt="Banner" />
          </div>
        </div>
      </section>
      <About />
<Authendicate/><AddUser/>

    
    </>
  );
};

export default Home;
