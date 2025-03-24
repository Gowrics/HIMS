import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaHospital,
  FaInfoCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdMedicalServices, MdHealthAndSafety } from "react-icons/md";
import { UserContext } from "../Context/Context";



const Leftsidebar = () => {
  const { setSingleUser, setUserData, singleUser, setUserAuth, UserAuth } =
    useContext(UserContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    setSingleUser({});
    setUserAuth(false);
    navigate("/home");
    setUserData({
      username: "",
      password: "",
    });
    console.log("logout", singleUser);
  };

  const handleMenuCollapse = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-dark vh-70 d-flex flex-column align-items-start">
      <div className="container-fluid d-flex flex-column">
          {/* <ul className="navbar-nav  ">
                    <li className="nav-item">
                      <Link className="nav-link" to="/himsservice" onClick={handleMenuCollapse}>
                        HIMS Services
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/patientservice" onClick={handleMenuCollapse}>
                        Patient Services
                      </Link>
                    </li>
                    </ul> */}
        <ul className="nav flex-column w-100">
                {UserAuth && ( 
            <li className="nav-item dropdown mb-3">
              <Link className="nav-link dropdown-toggle d-flex align-items-center" to="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"   >
                <MdMedicalServices className="me-2" />  <span className="d-none d-lg-inline">HIMS Services</span>
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/nationality" onClick={handleMenuCollapse}   >
                    Nationality
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/department" onClick={handleMenuCollapse}  >
                    Departments
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/docters" onClick={handleMenuCollapse} >
                    Doctors
                  </Link>
                </li>
              </ul>
            </li>
         )}
           {UserAuth && ( 
          <li className="nav-item dropdown mb-3">
            <Link className="nav-link dropdown-toggle d-flex align-items-center" to="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
              <MdHealthAndSafety className="me-2" />
              <span className="d-none d-lg-inline">Patient Services</span>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
              <li>
                <Link className="dropdown-item" to="/patientmaintype" onClick={handleMenuCollapse}  >
                  Patient Main Type
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/patientsubtype" onClick={handleMenuCollapse}    >
                  Patient Sub Type
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/thirdpartyhead" onClick={handleMenuCollapse}    >
                  ThirdParty Head
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/policiessubpatient" onClick={handleMenuCollapse}   >
                  Policies Sub type patient{" "}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/subpoliciespatient" onClick={handleMenuCollapse} >
                  Sub Policies type patient{" "}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/copaycoverage" onClick={handleMenuCollapse}  >
                  Co Payment & Coverage
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/pricelist" onClick={handleMenuCollapse}    >
                  Price List
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/pricelistdetails" onClick={handleMenuCollapse} >
                  Price List Details
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/pricelistdeprule" onClick={handleMenuCollapse}   >
                  Price List Dep Rule
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/pricedetailsdeprule" onClick={handleMenuCollapse}   >
                  Price details Dep Rule
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/servicecategory" onClick={handleMenuCollapse}    >
                  servicecategory
                </Link>
              </li>

              <li>
                <Link className="dropdown-item" to="/cptcodes" onClick={handleMenuCollapse}  >
                  cptcodes
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/loinccodes" onClick={handleMenuCollapse} >
                  loinccodes
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/servicemaster" onClick={handleMenuCollapse}    >
                  service master
                </Link>
              </li>
            </ul>
          </li>
           )}
             {UserAuth && ( 
          <li className="nav-item dropdown mb-3">
            <Link className="nav-link dropdown-toggle d-flex align-items-center" to="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"   >
              <MdMedicalServices className="me-2" />  <span className="d-none d-lg-inline">Patient Info</span>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
              <li>
                <Link className="dropdown-item" to="/doctypemaster" onClick={handleMenuCollapse}   >
                  Document type
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/patientdatadaster" onClick={handleMenuCollapse}  >
                  Patient Info data
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/patientregdocs" onClick={handleMenuCollapse} >
                  Patient Registration Document
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/patientchgdep" onClick={handleMenuCollapse} >
                  Patient Charge grp Dep
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/patientsystemnotes" onClick={handleMenuCollapse} >
                  Patient system Notes
                </Link>
              </li>
            </ul>
          </li>
             )}
               {UserAuth && ( 
            <li className="nav-item dropdown mb-3">
              <Link className="nav-link dropdown-toggle d-flex align-items-center" to="#" id="servicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"   >
                <MdMedicalServices className="me-2" />  <span className="d-none d-lg-inline">Invoice service</span>
              </Link>
              <ul className="dropdown-menu" aria-labelledby="servicesDropdown">
                <li>
                  <Link className="dropdown-item" to="/patientbill" onClick={handleMenuCollapse}   >
                  Patient Bill
                  </Link>
                  <Link className="dropdown-item" to="/advancereceipt" onClick={handleMenuCollapse}   >
                  Patient Advance Receipt
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/packagemaster" onClick={handleMenuCollapse}  >
                  Package Master Data
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/packagedetails" onClick={handleMenuCollapse} >
                    Package Details Data
                  </Link>
                </li>
              </ul>
            </li>
         )}
        </ul>
        <div className="mt-3 w-80">
          {singleUser && Object.keys(singleUser).length > 0 ? (
            <button
              className="btn btn-dark btn-sm d-flex align-items-center justify-content-center"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-2" />
              <span className="d-none d-lg-inline">Sign Out</span>
            </button>
          ) : (
            <Link className="btn btn-dark btn-sm w-100 d-flex align-items-center justify-content-center" to="/signin"    >
              <FaSignInAlt className="me-2" />
              <span className="d-none d-lg-inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Leftsidebar;
