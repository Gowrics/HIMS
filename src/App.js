import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FormContext } from './FormContext';
import Home from './screens/Home';
import Navbar from './Component/Navbar';
import Nationality from './screens/Nationality';
import Departments from './screens/Departments';
import Doctors from './screens/Docters';
import Nationality1 from './screens/About';
import DepartmentsView from './Component/DepartmentsView';
import DocterView from './screens/DocterView';
import Footer from './Component/Footer';
import Breadcrumbs from './Component/BreadCrumbs';
import Signin from './Users/Signin';
import Signup from './Users/Signup';
import Leftsidebar from './Component/Leftsidebar';
import Rightsidebar from './Component/Rightsidebar';
import PatientSubType from './screens/PatientSubType';
import PationMainType from './screens/PationtMainType';
import ThirdPartyHead from './screens/ThirdPartyHead';
import PoliciesSubPatient from './screens/PoliciesSubPatient';
import SubPoliciesPatient from './screens/SubPoliciesPatient';
import CoPaymentCoverage from './screens/CoPaymentCoverage';
import PriceList from './screens/PriceList';
import PriceListDetails from './screens/PriceListDetails';
import PriceListDepRule from './screens/PriceListDepRule';
import PriceDetailsDepRule from './screens/PriceDetailsDepRule';
import ServiceCategory from './screens/ServiceCategory';
import CptCodes from './screens/CptCodes';
import LoincCodes from './screens/LoincCodes';
import ServiceMaster from './screens/ServiceMaster';


function App() {
  const { state } = useContext(FormContext);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <div className="navbar bg-dark text-white">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="main-content-wrapper">
          <div className="left-sidebar">
            <Leftsidebar />
          </div>
          <div className="main-content">
            {/* <Breadcrumbs /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nationality" element={<Nationality />} />
              <Route path="/department" element={<Departments />} />
              <Route path="/docters" element={<Doctors />} />
              <Route path="/about" element={<Nationality1 />} />
              <Route path="/departmentview" element={<DepartmentsView />} />
              <Route path="/docterview/:id" element={<DocterView />} />
              <Route path="/docterview" element={<DocterView />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} /> 
              <Route path="/patientmaintype" element={<PationMainType />} />   
              <Route path="/patientsubtype" element={<PatientSubType />} />   
              <Route path="/thirdpartyhead" element={<ThirdPartyHead/>} /> 
              <Route path="/policiessubpatient" element={<PoliciesSubPatient/>} />   
              <Route path="/subpoliciespatient" element={<SubPoliciesPatient/>} /> 
              <Route path="/copaycoverage" element={<CoPaymentCoverage/>} />  
              <Route path="/pricelist" element={<PriceList/>} />  
              <Route path="/pricelistdetails" element={<PriceListDetails/>} />  
              <Route path="/pricelistdeprule" element={<PriceListDepRule/>} />  
              <Route path="/pricedetailsdeprule" element={<PriceDetailsDepRule/>} />  
              <Route path="/servicecategory" element={<ServiceCategory/>} />  
              <Route path="/cptcodes" element={<CptCodes/>} />  
              <Route path="/loinccodes" element={<LoincCodes/>} />  
              <Route path="/servicemaster" element={<ServiceMaster/>} />  
            </Routes>
          </div>
          <div className="right-sidebar">
            <Rightsidebar />
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
