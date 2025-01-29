import React, { useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import axios from "axios";
import useFetchData from "./ReusableComponent/useFetchData";

export const FormProvider = ({ children }) => {
  
  const [nationalityData, setNationalityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]); // Ensure it's an array
  const [docterData, setDocterData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // New state to track form visibility
  const [searchTerm, setSearchTerm] = useState("");

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
  
  const [validtationMessage,setValidtationMessage]  =useState("");
  const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
  
 
  const [formData, setFormData] = useState({
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
      deptCode: 0,
    },
    nationality: {
      nationalityCode: 0,
    },
  });

  
  useFetchData(
    " http://192.168.91.201:8082/loincCodes/getAll",
    setLoincCodesData
  );
  useFetchData(
    " http://192.168.91.201:8082/policySubCopay/getAll",
    setCoPaymentCoverageData
  );
  
  useFetchData(
    " http://192.168.91.201:8082/cptCodes/getAll",
    setCptCodesData
  );
  
  useFetchData(
    " http://192.168.91.201:8082/detailsDependency/getAll",
    setPriceDetailsDepRuleData
  );

  useFetchData(
    " http://192.168.91.201:8082/priceListDependency/getAll",
    setPriceListDepRuleData
  );
  
  useFetchData(
    " http://192.168.91.201:8082/priceDetails/getAll",
    setPriceListDeatilsData
  );
  useFetchData(
    " http://192.168.91.201:8082/priceList/getAll",
    setPriceListData
  );

  useFetchData(
    "http://192.168.91.201:8082/serviceMaster/getAll",   
    setServiceMasterData
  );

  useFetchData(
    "http://192.168.91.201:8082/headcharge/getAll",
    setPatientMainTypeData
  );

  useFetchData(
    "http://192.168.91.201:8082/policySubCharge/getAll",
    setSubPoliciesPatientData
  );

  useFetchData(
    "http://192.168.91.201:8082/subcharge/getAll",
    setPatientsSubTypeData
  );
  useFetchData(
    "http://192.168.91.201:8082/nationality/getAll",
    setNationalityData
  );

  useFetchData(
    "http://192.168.91.201:8082/department/getAll",
    setDepartmentData
  );

  useFetchData("http://192.168.91.201:8082/tpahead/getAll", setThirdPartyHead);

  useFetchData(
    "http://192.168.91.201:8082/policiesCharge/getAll",
    setPoliciesSubPatient
  );
  
  useFetchData(
    "http://192.168.91.201:8082/serviceCategory/getAll",   
    setserviceCategoryData
  );
  

  useFetchData("http://192.168.91.201:8082/doctor/getAll", setDocterData);

  return (
    <FormContext.Provider
      value={{
        nationalityData,
        setNationalityData,
        patientsMainTypeData,
        validtationMessage,setValidtationMessage,
        showModal, setShowModal, handleCloseModal,handleShowModal,
        setPatientMainTypeData,
        departmentData,
        searchTerm,
        setSearchTerm,
        patientsSubTypeData,
        subPoliciesPatientData,
        coPaymentCoverageData,
        cptCodesData, setCptCodesData,
        loincCodesData, setLoincCodesData,
        setCoPaymentCoverageData,
        priceListData,
        setPriceListData,
        setSubPoliciesPatientData,
        setPatientsSubTypeData,
        setDepartmentData,
        thirdPartyHeadData,
        priceListDepRuleData, setPriceListDepRuleData,
        priceListDetailsData, setPriceListDeatilsData,
        priceDetailsDepRuleData, setPriceDetailsDepRuleData,
        setThirdPartyHead,
        policiesSubPatientData,
        serviceMasterData, setServiceMasterData,
        serviceCategoryData,
        setserviceCategoryData,
        setPoliciesSubPatient,
        isEditMode,
        setIsEditMode,
        docterData,
        setDocterData,
        formData,
        setFormData,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
