import React from "react";
import { Link } from "react-router";
import { RiFacebookCircleFill } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa6";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaInstagramSquare } from "react-icons/fa";
import logo from "../assets/healthcare.png";

const Footer = () => {
  return (
    <>
      <div className=" footerfirst container-fluid">
        <div className="row footerfirst">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-flex">
              <Link className="navbar-brand" to="/">
                <img
                  src={logo}
                  alt="Brand Logo"
                  style={{ height: "40px", width: "60px" }}
                />
                <h1>HIMS</h1>
              </Link>
            </div>
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit,
              sapiente dolorum? Eligendi, numquam officiis, quo exercitationem
              sequi ad, excepturi dignissimos nihil delectus assumenda expedita
              atque cum enim ab illum tempora?
            </p>

            <div className="container mt-4 ">
              <ul className="list-inline ">
                <li className="list-inline-item ">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid">
                      <RiFacebookCircleFill />
                    </i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid">
                      <FaTwitter />
                    </i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid">
                      <FaInstagramSquare />
                    </i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid">
                      <FaYoutube />
                    </i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid">
                      <RiFacebookCircleFill />
                    </i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h3>Departments</h3>
            <div className="ms-5">
              <p>Medicine</p>
              <p>Neurology</p>
              <p>Eye Care</p>
              <p>Cardiology</p>
              <p>Dental Care</p>
              <p>Pulmonary</p>
            </div>
          </div>
          <div className="col-12  time col-md-6 col-lg-3">
            <h3>Opening Hours</h3>
            <div>
              <div className=" d-flex g-5">
                <h5 className="me-5">Mon-Tue:</h5>
                <h5>6:00AM-10:00PM</h5>
              </div>
              <hr
                style={{
                  width: "70%",
                  color: "#E22454",
                  height: "2px",
                  backgroundColor: "#E22454",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              />
            </div>
            <div>
              <div className="d-flex g-5">
                <h5 className="me-5">Wed-Thu:</h5>
                <h5>6:00AM-10:00PM</h5>
              </div>
              <hr
                style={{
                  width: "70%",
                  color: "#E22454",
                  height: "2px",
                  backgroundColor: "#E22454",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              />
            </div>
            <div>
              <div className="d-flex g-5">
                <h5 className="me-5">Fri:</h5>
                <h5>6:00AM-04:00PM</h5>
              </div>
              <hr
                style={{
                  width: "70%",
                  color: "#E22454",
                  height: "2px",
                  backgroundColor: "#E22454",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              />
            </div>
            <div>
              <div className="d-flex g-5">
                <h5 className="me-5">Sun:</h5>
                <h5>Closed</h5>
              </div>
              <hr
                style={{
                  width: "70%",
                  color: "#E22454",
                  height: "2px",
                  backgroundColor: "#E22454",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <h3>Get In Touch</h3>
            <div>
              <span>
                <FaPhoneSquareAlt
                  style={{ color: " #E22454", fontSize: "20px" }}
                />{" "}
                <b>Hotline: </b>
              </span>
              <p className="ms-4">+123-456-789</p>
              <span>
                <IoMdMail style={{ color: " #E22454", fontSize: "20px" }} />{" "}
                <b>Email:</b>
              </span>
              <p className="ms-4">hello@example.com</p>
              <span>
                <IoLocation style={{ color: " #E22454", fontSize: "25px" }} />{" "}
                <b>Address:</b>
              </span>
              <p className="ms-4">124, Western Road, Melbourne Australia</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" footersecond  p-3">
        <h6>
          Copyright @ 2024 Medic - HTML Website Template. All rights reserved.
        </h6>
      </div>
    </>
  );
};

export default Footer;
