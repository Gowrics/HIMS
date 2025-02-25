import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocTypeMaster from '../PatientInfoScreen/DocTypeMaster';
import PatientChgDep from '../PatientInfoScreen/PatientChgDep';
import PatientDataMaster from '../PatientInfoScreen/PatientDataMaster';
import PatientRegDocs from '../PatientInfoScreen/PatientRegDocs';
import PatientSystemNotes from '../PatientInfoScreen/PatientSystemNotes';
 import PatientBillingHeader from '../Invoice/PatientBillingHeader';
import PatientBillingDetails from '../Invoice/PatientBillingDetails';

function InvoiceLayout() {

  return (
    <div>
            <Routes>
            <Route path="/patientbillingheader" element={<PatientBillingHeader />} />
            <Route path="/patientbillingdetails" element={<PatientBillingDetails />} />
            {/* <Route path="/patientchgdep" element={<PatientChgDep />} />
            <Route path="/patientdatadaster" element={<PatientDataMaster />} />
            <Route path="/patientregdocs" element={<PatientRegDocs />} />
            <Route path="/patientsystemnotes" element={<PatientSystemNotes />} /> */}
            </Routes>
            </div>
  );
}

export default InvoiceLayout
