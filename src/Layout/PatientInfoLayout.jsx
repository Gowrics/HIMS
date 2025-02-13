import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocTypeMaster from '../PatientInfoScreen/DocTypeMaster';
import PatientChgDep from '../PatientInfoScreen/PatientChgDep';
import PatientDataMaster from '../PatientInfoScreen/PatientDataMaster';
import PatientRegDocs from '../PatientInfoScreen/PatientRegDocs';
import PatientSystemNotes from '../PatientInfoScreen/PatientSystemNotes';

function PatientInfoLayout() {

  return (
    <div>
            <Routes>
            <Route path="/doctypemaster" element={<DocTypeMaster />} />
            <Route path="/patientchgdep" element={<PatientChgDep />} />
            <Route path="/patientdatadaster" element={<PatientDataMaster />} />
            <Route path="/patientregdocs" element={<PatientRegDocs />} />
            <Route path="/patientsystemnotes" element={<PatientSystemNotes />} />
            </Routes>
            </div>
  );
}

export default PatientInfoLayout;
