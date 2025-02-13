import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {coPaymentCoverageDataColumn} from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";

const CoPaymentCoverage = () => {
  const {
    policiesSubPatientData, subPoliciesPatientData,BASE_URL,
    coPaymentCoverageData,setCoPaymentCoverageData,
    serviceCategoryData, setMessageType, validtationMessage, messageType,setValidtationMessage, } = useContext(FormContext);
   const [isEditMode, setIsEditMode] = useState(false); 
    const [searchTerm, setSearchTerm] = useState("");
     const [alert, setAlert] = useState({ show: false, type: "", message: "" });
         const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    // policyCopayId: 0,
    covered: "",
    coPaymentPercent: "",
    coPaymentAmt: "",
    policiesCharge: {
      chargeCode: "",
    },
    policySubCharge: {
      policySubCode: "",
    },
    serviceCategory: {
      serviceCategoryCode: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "chargeCode") {
      // Update policiesCharge
      setFormData((prevData) => ({
        ...prevData,
        policiesCharge: {
          ...prevData.policiesCharge,
          chargeCode: value,
        },
      }));
    } else if (name === "policySubCode") {
      // Update policySubCharge
      setFormData((prevData) => ({
        ...prevData,
        policySubCharge: {
          ...prevData.policySubCharge,
          policySubCode: value,
        },
      }));
    } else if (name === "serviceCategoryCode") {
      // Update policySubCharge
      setFormData((prevData) => ({
        ...prevData,
        serviceCategory: {
          ...prevData.serviceCategory,
          serviceCategoryCode: value,
        },
      }));
    } else {
      // Update top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
          }
  };
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

          const updatedFormData = {
        ...formData,
        policiesCharge: {
          ...formData.policiesCharge,
          chargeCode: Number(formData.policiesCharge.chargeCode),
        },
        policySubCharge: {
          ...formData.policySubCharge,
          policySubCode: Number(formData.policySubCharge.policySubCode),
        },
        serviceCategory: {
          ...formData.serviceCategory,
          serviceCategoryCode: Number(
            formData.serviceCategory.serviceCategoryCode
          ),
        },
        coPaymentPercent:Number(formData.coPaymentPercent)||null,
        coPaymentAmt:Number(formData.coPaymentAmt)||null,
        covered:formData.covered||null
      }
        
            console.log("Payload sent to API:", updatedFormData);
       const url = `${BASE_URL}policySubCopay/create`; // The URL for form submission
            submitForm(url, updatedFormData, setCoPaymentCoverageData, setValidtationMessage,setAlert,clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = coPaymentCoverageData.find(
      (item) => item.policyCopayId === id
    );

    if (itemToUpdate) {
      setFormData({
        policyCopayId: itemToUpdate.policyCopayId,
        coPaymentAmt: itemToUpdate.coPaymentAmt,
        coPaymentPercent: itemToUpdate.coPaymentPercent,
        covered: itemToUpdate.covered,
      
        policiesCharge: {
          chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
        },
        policySubCharge: {
          policySubCode: itemToUpdate.policySubCharge?.policySubCode || null,
        },
        serviceCategory: {
          serviceCategoryCode:
            itemToUpdate.serviceCategory?.serviceCategoryCode || null,
        },
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  
  const handleDelete = (id) => {
    
    handleDeleteItem({
      id,
      url: `${BASE_URL}policySubCopay/delete`,
      setValidtationMessage,
      data: coPaymentCoverageData,
      setAlert,
      setData: setCoPaymentCoverageData,
      itemKey: "policyCopayId", // Key to identify the item in the dataset
    });
  };
  

  const handleUpdate = () => {
    const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);

    const updatedData = {

      covered: convertEmptyToNull(formData.covered),
      policyCopayId: convertEmptyToNull(formData.policyCopayId),
      coPaymentPercent: convertEmptyToNull (Number(formData.coPaymentPercent)),
      coPaymentAmt: convertEmptyToNull(Number(formData.coPaymentAmt)),
      policiesCharge: { chargeCode: convertEmptyToNull(Number(formData?.policiesCharge?.chargeCode)) },
      policySubCharge: { policySubCode: convertEmptyToNull(Number(formData?.policySubCharge?.policySubCode) )},
      serviceCategory:{serviceCategoryCode:convertEmptyToNull(Number(formData?.serviceCategory?.serviceCategoryCode))}
    };
    console.log(formData);
    console.log(updatedData);
    
      const url = `${BASE_URL}policySubCopay/update`;
            const id =formData.policyCopayId; // The URL for form submission
            updateForm( url,id,updatedData, setCoPaymentCoverageData, setValidtationMessage, setIsEditMode,  setNotEditMode, clearForm ,setAlert);

  };

  return (
    <>
      <div className="container page-content">
        <h2>CO PAYMENT AND COVERAGE FOR A SUB POLICY TYPE</h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
        <form   onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="coPaymentPercent" className="form-label">
                Co Payment Percent
              </label>
              <input   className="form-control"   type="number"   id="coPaymentPercent"    name="coPaymentPercent" 
               min="1"  max="100"  value={formData.coPaymentPercent}    onChange={handleChange}       ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="covered" className="form-label">
              Covered
              </label>
              <select  className="form-control"  id="covered"   name="covered"   value={formData.covered} onChange={handleChange}  >
                <option value="">Select an option </option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            {/* subPoliciesPatient  Type (policySubCode) Row */}
            <div className="col-md-4">
              <label htmlFor="policySubCode" className="form-label">
                Sub PoliciesPatient Type (policySubCode)
              </label>
              <CustomSelect
              id="policySubCode"
              name="policySubCode"
               valueKey="policySubCode"   // Dynamic value key
              labelKey=""   
              data={subPoliciesPatientData}  // Pass the raw data, no need to map
              value={formData.policySubCharge.policySubCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
            
            </div>
          </div>

          {/* patientsSubType (chargeCode) Row */}
          <div className="row mb-3">
         
             <div className="col-md-4">
              <label htmlFor="chargeCode" className="form-label">
              Policy sub Patient Type (chargeCode)
              </label>
              <CustomSelect
              id="chargeCode"
              name="chargeCode"
               valueKey="chargeCode"   // Dynamic value key
              labelKey="chargeName"   
              data={policiesSubPatientData}  // Pass the raw data, no need to map
              value={formData.policiesCharge.chargeCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
            </div> 

            <div className="col-md-4">
              <label htmlFor="" className="form-label">
              Service Category Type (serviceCategoryCode)
              </label>
              <CustomSelect
              id="serviceCategoryCode"
              name="serviceCategoryCode"
               valueKey="serviceCategoryCode"   // Dynamic value key
              labelKey="serviceCategoryName"   
              data={serviceCategoryData}  // Pass the raw data, no need to map
              value={formData.serviceCategory.serviceCategoryCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
           </div>

            <div className="col-md-4">
              <label htmlFor="coPaymentAmt" className="form-label">       Co Payment Amt          </label>
              <input className="form-control"  id="coPaymentAmt" name="coPaymentAmt" value={formData.coPaymentAmt}  onChange={handleChange} ></input>
            </div>
          </div>

         
          {!isEditMode ? (
  <button type="submit" className="btn btn-primary">   Create+  </button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">     Update   </button>
    <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false);}} className=" ms-4 btn btn-secondary">      Cancel            </button>
  </>
)}
        </form>

          <input   type="text"   placeholder="Search hchgName"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}   className="form-control my-2"  />
        <CustomDataTable
          columns={coPaymentCoverageDataColumn(handleUpdateData, handleDelete)}
          data={filterData(coPaymentCoverageData,searchTerm,["policyCopayId","covered"])}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        /> 
          <ExportData   url={`${BASE_URL}policySubCopay/export`}   fileName="Chg_grp_policy_sub_copay"   previewData={coPaymentCoverageData} />

      </div>
    </>
  );
};

export default CoPaymentCoverage;

