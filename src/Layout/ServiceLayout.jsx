import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nationality from '../ServiceScreens/Nationality';
  import Doctors from '../ServiceScreens/Docters';
import PatientSubType from '../ServiceScreens/PatientSubType';
import PationMainType from '../ServiceScreens/PationtMainType';
import ThirdPartyHead from '../ServiceScreens/ThirdPartyHead';
import PoliciesSubPatient from '../ServiceScreens/PoliciesSubPatient';
import SubPoliciesPatient from '../ServiceScreens/SubPoliciesPatient';
import CoPaymentCoverage from '../ServiceScreens/CoPaymentCoverage';
import PriceList from '../ServiceScreens/PriceList';
import PriceListDetails from '../ServiceScreens/PriceListDetails';
import PriceListDepRule from '../ServiceScreens/PriceListDepRule';
import PriceDetailsDepRule from '../ServiceScreens/PriceDetailsDepRule';
import ServiceCategory from '../ServiceScreens/ServiceCategory';
import CptCodes from '../ServiceScreens/CptCodes';
import LoincCodes from '../ServiceScreens/LoincCodes';
import ServiceMaster from '../ServiceScreens/ServiceMaster';
import ThirdPartyHead1 from '../ServiceScreens/ThirdPartyHead1';
import PationMainType1 from '../ServiceScreens/PationMainType1';
import ReportComponent from '../utils/ReportComponent';
 import Departments from '../ServiceScreens/Departments';
import PatientInfoLayout from './PatientInfoLayout';
function ServiceLayout() {

  return (
    <div>
            <Routes>
              <Route path="/nationality" element={<Nationality />} />
              <Route path="/department" element={<Departments />} /> 
              <Route path="/docters" element={<Doctors />} />
              <Route path="/patientmaintype" element={<PationMainType1 />} />   
              <Route path="/patientsubtype" element={<PatientSubType />} />   
              <Route path="/thirdpartyhead" element={<ThirdPartyHead1/>} /> 
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
              <Route path="/export" element={<ReportComponent/>} />  
              <Route path="/export" element={<ReportComponent/>} />  
              <Route path="/*" element={<PatientInfoLayout />} /> {/* Fixed wildcard route */}
              </Routes>
            </div>
  );
}

export default ServiceLayout;
