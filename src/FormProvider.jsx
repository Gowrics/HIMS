import React, { useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import axios from "axios";

export const FormProvider = ({ children }) => {
  const [nationalityData, setNationalityData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]); // Ensure it's an array
  const [docterData, setDocterData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false); // New state to track form visibility
  // const [formData, setFormData] = useState({
  //   deptCode: "",
  //   doctorName: "",
  //   doctorNameFl: "",
  //   doctorImg: "",
  //   licenseNo: "",
  //   doctorDesignation: "",
  //   doctorDesignationFl: "",
  //   doctorQualifications: "",
  //   doctorQualificationsFl: "",
  //   gender: "",
  //   sortOrder: 0,
  //   nationalityCode: 0,
  //   costCenterCode: "",
  //   active: "Y", // Default to "Y" (active)
  // });

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

  // {

  //   "doctorName": "Dr. Alice Johnson",
  //   "drNameFl": "डॉ. एलीस जॉनसन",
  //   "drImg": "https://example.com/images/dr_alice_johnson.jpg",
  //   "drActive": "NO",
  //   "drLicNo": "LIC987654321",
  //   "drDesignation": "Consultant Neurologist",
  //   "drDesignationFl": "कंसल्टेंट न्यूरोलॉजिस्ट",
  //   "drQualifications": "MBBS, MD (Neurology)",
  //   "drQualificationsFl": "एमबीबीएस, एमडी (न्यूरोलॉजी)",
  //   "drGender": "Female",
  //   "drSrtOrd": 2,
  //   "costCenterCode": "CC456",
  //   "department": {
  //     "deptCode": 1

  //   },
  //   "nationality": {
  //     "nationalityCode": 2

  //   }
  // }
  useEffect(() => {
    axios
      .get("http://192.168.91.201:8082/nationality/getAll")
      .then((res) => {
        setNationalityData(res.data);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.91.201:8082/department/getAll")
      .then((res) => {
        setDepartmentData(res.data); // Set the nationality data as an array
        console.log(departmentData);
      })
      .catch((err) => console.log("Error fetching data:", err));
  }, []); // Empty array ensures this runs only once when the component mounts
  return (
    <FormContext.Provider
      value={{
        nationalityData,
        setNationalityData,
        departmentData,
        setDepartmentData,
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
