import React, { useContext, useState } from "react";
import axios from "axios";
import { subPoliciesPatientDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ReportComponent from "../utils/ReportComponent";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
const SubPoliciesPatient = () => {
  const {
    policiesSubPatientData,BASE_URL, subPoliciesPatientData,setSubPoliciesPatientData,  setValidtationMessage,} = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [notEditMode, setNotEditMode] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
   const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  
  const initialFormData = {
    policySubCode: "",
    policiesCharge: {
      chargeCode: "",
    },
    active: "",
    maternityCovered: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };

   // Handle patientMainTypeData changes (for select input)
   const handleChange= (e) => {
    const { name, value } = e.target;
    if(name==="chargeCode"){
    setFormData((prevData) => ({
      ...prevData,
      policiesCharge: {
        ...prevData.chargeCode,
        [name]: value,
      },
    }));
  }else{
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      policiesCharge: {
        ...formData.policiesCharge,
        chargeCode: Number(formData.policiesCharge.chargeCode),
      },
      policySubCode: Number(formData.policySubCode),
      active: formData.active || null,
      maternityCovered: formData.maternityCovered || null
    };

    console.log("Payload sent to API:", updatedFormData);
     const url = `${BASE_URL}policySubCharge/create`; // The URL for form submission
      submitForm(url, updatedFormData, setSubPoliciesPatientData, setValidtationMessage, setAlert, clearForm);
  };


  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = subPoliciesPatientData.find(
      (item) => item.policySubCode === id
    );

    if (itemToUpdate) {
      setFormData({
        policySubCode: itemToUpdate.policySubCode,
        active: itemToUpdate.active,
        policiesCharge: {
          chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
        },
        maternityCovered: itemToUpdate.maternityCovered,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
 

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}policySubCharge/delete`,setValidtationMessage,setAlert,
      data: subPoliciesPatientData,
      setData: setSubPoliciesPatientData,
      itemKey: "policySubCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value)
    const updatedData = {
      maternityCovered: convertEmptyToNull(formData.maternityCovered),
      policySubCode: convertEmptyToNull(formData.policySubCode),
      active: convertEmptyToNull(formData.active),
      policiesCharge: { chargeCode: convertEmptyToNull(formData?.policiesCharge?.chargeCode) },
    };
    console.log(formData);
    console.log(updatedData);

  const url = `${BASE_URL}policySubCharge/update`;
        const id =formData.policySubCode; // The URL for form submission
        updateForm( url,id,updatedData, setSubPoliciesPatientData, setValidtationMessage,setIsEditMode,  setNotEditMode, clearForm,setAlert );
     };

  return (
    <>
      <div className="container page-content">
        <h2>SUB POLICY TYPES UNDER A SUB CLASSIFIED PATIENT TYPE</h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
        <form   onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="policySubCode" className="form-label">
                Policy Sub Code
              </label>
              <input  type="number"  className="form-control"   id="policySubCode"  name="policySubCode" value={formData.policySubCode} 
              onChange={handleChange}  required     disabled={notEditMode}
              ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select   className="form-control"   id="active"   name="active"  value={formData.active} onChange={handleChange}   >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            {/* TPA head Type (tpaCode) Row */}
          </div>

          {/* Patient Main Type (chargeCode) Row */}
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
              <label htmlFor="active" className="form-label">
                Maternity Covered
              </label>
              <select className="form-control"  id="maternityCovered"  name="maternityCovered"  value={formData.maternityCovered} onChange={handleChange} >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
          </div>
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">Create+</button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
              <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false);}} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}

        </form>
        <input  type="text"   placeholder="Search "    value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}  className="form-control my-2"  />  
        <CustomDataTable
          columns={subPoliciesPatientDataColumn(handleUpdateData, handleDelete)}
          data={filterData(subPoliciesPatientData,searchTerm,["policySubCode","active"])}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
           <ExportData   url={`${BASE_URL}policySubCharge/export`}   fileName="Chg_grp_policy_sub"   previewData={subPoliciesPatientData} />
              </div>
    </>
  );
};

export default SubPoliciesPatient;
