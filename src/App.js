import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Signin from './Users/Signin';
import Registration from './Users/Signup';
import Leftsidebar from './Component/Leftsidebar';
import Rightsidebar from './Component/Rightsidebar';
import Home from './Mainscreen/Home';

import About from './Mainscreen/About';
import ReportComponent from './utils/ReportComponent';
import DepartmentsView from './Mainscreen/DepartmentsView';
import DocterView from './Mainscreen/DocterView';
import ServiceLayout from './Layout/ServiceLayout';
import PatientInfoLayout from './Layout/PatientInfoLayout';
import Contact from './Mainscreen/Contact';
import Nationality from './ServiceScreens/Nationality';
import Departments from './ServiceScreens/Departments';
import DoctorForm from './ServiceScreens/Docters';
import ServicePage from './Layout/HimsServiceLayout';
import PatientServicePage from './Layout/PatientServiceLayout';
import PationMainType from './ServiceScreens/PationtMainType';
import PatientSubType from './ServiceScreens/PatientSubType';
import ThirdPartyHead from './ServiceScreens/ThirdPartyHead';
import PoliciesSubPatient from './ServiceScreens/PoliciesSubPatient';
import SubPoliciesPatient from './ServiceScreens/SubPoliciesPatient';
import CoPaymentCoverage from './ServiceScreens/CoPaymentCoverage';
import PriceList from './ServiceScreens/PriceList';
import PriceListDetails from './ServiceScreens/PriceListDetails';
import PriceListDepRule from './ServiceScreens/PriceListDepRule';
import PriceDetailsDepRule from './ServiceScreens/PriceDetailsDepRule';
import ServiceCategory from './ServiceScreens/ServiceCategory';
import CptCodes from './ServiceScreens/CptCodes';
import LoincCodes from './ServiceScreens/LoincCodes';
import ServiceMaster from './ServiceScreens/ServiceMaster';
import Breadcrumbs from './Component/BreadCrumbs';
import InvoiceLayout from './Layout/InvoiceLayout';
import PatientBillingHeader from './Invoice/PatientBillingHeader';
import PatientBillingDetails from './Invoice/PatientBillingDetails';
import InvoiceForm from './Invoice/InvoiceForm';
import InvoiceForm1 from './Invoice/InvoiveForm1';

// import ServiceLayout from './ServiceLayout';


function App() {

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <div className="navbar bg-dark text-white">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="main-content-wrapper ">
          <div className="left-sidebar">
            <Leftsidebar />

          </div>
          <div className="main-content">
            <Breadcrumbs /> 
            <Routes>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about">
                <Route index element={<About />} /> {/* Default About Page */}
                <Route path="contact" element={<Contact />} /> {/* Full Page Contact */}
              </Route>
              <Route path="/himsservice">
                <Route index element={<ServicePage />} /> {/* Default About Page */}
                <Route path="nationality" element={<Nationality />} />
                <Route path="department" element={<Departments />} />
                <Route path="docters" element={<DoctorForm />} >
                <Route path="docters" element={<DoctorForm />} />
                </Route>
              </Route>

              <Route path="/patientservice">
                <Route index element={<PatientServicePage />} /> {/* Default About Page */}
                <Route path="patientmaintype" element={<PationMainType />} />
                <Route path="patientsubtype" element={<PatientSubType />} />
                <Route path="thirdpartyhead" element={<ThirdPartyHead />} />
                <Route path="policiessubpatient" element={<PoliciesSubPatient />} />
                <Route path="subpoliciespatient" element={<SubPoliciesPatient />} />
                <Route path="copaycoverage" element={<CoPaymentCoverage />} />
                <Route path="pricelist" element={<PriceList />} />
                <Route path="pricelistdetails" element={<PriceListDetails />} />
                <Route path="pricelistdeprule" element={<PriceListDepRule />} />
                <Route path="pricedetailsdeprule" element={<PriceDetailsDepRule />} />
                <Route path="servicecategory" element={<ServiceCategory />} />
                <Route path="cptcodes" element={<CptCodes />} />
                <Route path="loinccodes" element={<LoincCodes />} />
                <Route path="servicemaster" element={<ServiceMaster />} />
                {/* <Route path="export" element={<ReportComponent />} />
                <Route path="export" element={<ReportComponent />} /> */}
              </Route>

              <Route path="/departmentview" element={<DepartmentsView />} />
              <Route path="/docterview/:id" element={<DocterView />} />
              <Route path="/docterview" element={<DocterView />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Registration />} />
              {/* <Route path="/forms/*" element={<ServiceLayout />} /> */}
              <Route path="/patientforms/*" element={<PatientInfoLayout />} />
              {/* <Route path="/invoicelayout/*" element={<InvoiceLayout />} />  */}
              <Route path="/patientbillingheader" element={<PatientBillingHeader />} />
              <Route path="/patientbillingdetails" element={<InvoiceForm1 />} />
            
              <Route path="/*" element={<ServiceLayout />} /> {/* Fixed wildcard route */}

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
