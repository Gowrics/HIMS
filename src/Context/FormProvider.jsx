import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "./Context";
import { useFetchData } from "../utils/Actions";
export const FormProvider = ({ children }) => {
  const [nationalityData, setNationalityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]); // Ensure it's an array
  const [docterData, setDocterData] = useState([]);
  

  const [patientsMainTypeData, setPatientMainTypeData] = useState([]);
  const [patientsSubTypeData, setPatientsSubTypeData] = useState([]);
  const [thirdPartyHeadData, setThirdPartyHead] = useState([]);
  const [policiesSubPatientData, setPoliciesSubPatient] = useState([]);
  const [subPoliciesPatientData, setSubPoliciesPatientData] = useState([]);

  const [priceListData, setPriceListData] = useState([]);
  const [priceListDetailsData, setPriceListDeatilsData] = useState([]);
  const [coPaymentCoverageData, setCoPaymentCoverageData] = useState([]);
  const [serviceCategoryData, setserviceCategoryData] = useState([]);
  const [serviceMasterData, setServiceMasterData] = useState([]);
  const [priceListDepRuleData, setPriceListDepRuleData] = useState([]);
  const [priceDetailsDepRuleData, setPriceDetailsDepRuleData] = useState([]);
  const [cptCodesData, setCptCodesData] = useState([]);
  const [loincCodesData, setLoincCodesData] = useState([]);
  // -----------------------------------------------
  const [docTypeMasterData, setDocTypeMasterData] = useState([]);
  const [patientChgDepData, setPatientChgDepData] = useState([]);
  const [patientDataMasterData, setPatientDataMasterData] = useState([]);
  const [patientRegDocsData, setPatientRegDocsData] = useState([]);
  const [patientSystemNotesData, setPatientSystemNotesData] = useState([]);



    // -----------------------------------------------

  const BASE_URL = "http://192.168.91.201:8082/";
  const [isEditMode, setIsEditMode] = useState(false); // New state to track form visibility
  const [searchTerm, setSearchTerm] = useState("");
    const [validtationMessage, setValidtationMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // -----------------------------------------------

  const initialFormData = {
    docterCode: 0,
    doctorName: "",
    drNameFl: "",
    drImg: "",
    drActive: "",
    drLicNo: "",
    drDesignation: "",
    drDesignationFl: "",
    drQualifications: "",
    drQualificationsFl: "",
    drGender: "",
    drSrtOrd: 0,
    costCenterCode: "",
    department: {
      deptCode: "",
    },
    nationality: {
      nationalityCode: "",
    },
  };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };

  useFetchData(
    ` ${BASE_URL }nationality/getAll`,
    setNationalityData
  );

  useFetchData(
    ` ${BASE_URL }loincCodes/getAll`,
    setLoincCodesData
  );
  useFetchData(
     ` ${BASE_URL }policySubCopay/getAll`,
    setCoPaymentCoverageData
  );

  useFetchData(
 ` ${BASE_URL }cptCodes/getAll`,
 setCptCodesData
  );

  useFetchData(
 ` ${BASE_URL }detailsDependency/getAll`,
    setPriceDetailsDepRuleData
  );

  useFetchData(
     ` ${BASE_URL }priceListDependency/getAll`,
    setPriceListDepRuleData
  );

  useFetchData(
     ` ${BASE_URL }priceDetails/getAll`,
    setPriceListDeatilsData
  );
  useFetchData(
 ` ${BASE_URL }priceList/getAll`,
    setPriceListData
  );

  useFetchData(
 ` ${BASE_URL }serviceMaster/getAll`,
    setServiceMasterData
  );

  useFetchData(
 ` ${BASE_URL }headcharge/getAll`,
    setPatientMainTypeData
  );

  useFetchData(
     ` ${BASE_URL }policySubCharge/getAll`,
    setSubPoliciesPatientData
  );

  useFetchData(
 ` ${BASE_URL }subcharge/getAll`,
    setPatientsSubTypeData
  );
  useFetchData(
     ` ${BASE_URL }nationality/getAll`,
    setNationalityData
  );

  useFetchData(
 ` ${BASE_URL }department/getAll`,
    setDepartmentData
  );

  useFetchData( ` ${BASE_URL }tpahead/getAll`, setThirdPartyHead);

  useFetchData(
  ` ${BASE_URL }policiesCharge/getAll`,
    setPoliciesSubPatient
  );

  useFetchData(
 ` ${BASE_URL }serviceCategory/getAll`,
    setserviceCategoryData
  );
  useFetchData( ` ${BASE_URL }doctor/getAll`, setDocterData);
//------------------------------
  
  useFetchData(
    ` ${BASE_URL }documentMaster/getAll`,
    setDocTypeMasterData
  );
  
  useFetchData(
    ` ${BASE_URL }patientDataMaster/getAll`,
    setPatientDataMasterData
  );
  
  useFetchData(
    ` ${BASE_URL }patientRegDocs/getAll`,
    setPatientRegDocsData
  );
  
  useFetchData(
    ` ${BASE_URL }patientChgDep/getAll`,
    setPatientChgDepData
  );
  return (
    <FormContext.Provider
      value={{
        nationalityData, setNationalityData,
        clearForm, BASE_URL,
        patientsMainTypeData, setPatientMainTypeData,
        validtationMessage, setValidtationMessage,
        showModal, setShowModal, handleCloseModal, handleShowModal,
        departmentData, setDepartmentData,
        searchTerm, setSearchTerm,
        patientsSubTypeData, setPatientsSubTypeData,
        subPoliciesPatientData, setSubPoliciesPatientData,
        coPaymentCoverageData, setCoPaymentCoverageData,
        cptCodesData, setCptCodesData,
        loincCodesData, setLoincCodesData,
        priceListData, setPriceListData,
        thirdPartyHeadData, setThirdPartyHead,
        priceListDepRuleData, setPriceListDepRuleData,
        priceListDetailsData, setPriceListDeatilsData,
        priceDetailsDepRuleData, setPriceDetailsDepRuleData,
        policiesSubPatientData, setPoliciesSubPatient,
        serviceMasterData, setServiceMasterData,
        serviceCategoryData, setserviceCategoryData,
        isEditMode, setIsEditMode,
        docterData, setDocterData,
        formData, setFormData,
        docTypeMasterData, setDocTypeMasterData,
        patientDataMasterData, setPatientDataMasterData,
        patientRegDocsData, setPatientRegDocsData,
        patientChgDepData, setPatientChgDepData,
        patientSystemNotesData, setPatientSystemNotesData
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
