import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
 import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Signin from './Users/Signin';
import Signup from './Users/Signup';
import Leftsidebar from './Component/Leftsidebar';
import Rightsidebar from './Component/Rightsidebar';
import Home from './Mainscreen/Home';
import About from './Mainscreen/About';
import ReportComponent from './utils/ReportComponent';
import DepartmentsView from './Mainscreen/DepartmentsView';
import DocterView from './Mainscreen/DocterView';
import ServiceLayout from './Layout/ServiceLayout';
import PatientInfoLayout from './Layout/PatientInfoLayout';
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
            {/* <Breadcrumbs /> */}
            <Routes>
             <Route path="/home" element={<Home />} /> 
             <Route path="/about" element={<About />} />
             <Route path="/departmentview" element={<DepartmentsView />} />
              <Route path="/docterview/:id" element={<DocterView />} /> 
              <Route path="/docterview" element={<DocterView />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} /> 
              {/* <Route path="/forms/*" element={<ServiceLayout />} /> */}
              <Route path="/patientforms/*" element={<PatientInfoLayout />} />
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
