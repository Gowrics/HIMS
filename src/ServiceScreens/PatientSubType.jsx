import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import { subTypePatientColumn } from "../assets/ArrayData";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import ExportData1 from "../utils/Export1";
import { FormContext } from "../Context/Context";

const PatientSubType = () => {
  const {
    patientsMainTypeData,  patientsSubTypeData,BASE_URL,
    setPatientsSubTypeData,  priceListData,messageType,
    validtationMessage,setValidtationMessage,
  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [notEditMode, setNotEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
      const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  
  const initialFormData = {
    // schgCode: 0,
    schaName: "",
    active: "",
    clinicCredit: "",
    phCredit: "",
    optCredit: "",
    otherCredit: "",
    icdVersion: "",
    toothSystem: "",
    headCharge: {
      hchgCode: 0,
    },
    priceList: {
      priceListCode: 0,
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "hchgCode") {
      // Update subCharge
      setFormData((prevData) => ({
        ...prevData,
        headCharge: {
          ...prevData.headCharge,
          hchgCode: value,
        },
      }));
    } else if (name === "priceListCode") {
      // Update tpaHead
      setFormData((prevData) => ({
        ...prevData,
        priceList: {
          ...prevData.priceList,
          priceListCode: value,
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

    const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure the payload matches the API's expected format
    const updatedFormData = {
      ...formData,
      headCharge: {
        ...formData.headCharge,
        hchgCode: Number(formData.headCharge.hchgCode),
      },
      priceList: {
        ...formData.priceList,
        priceListCode: Number(formData.priceList.priceListCode),
      },
    // Provide a default value if null or undefined
      active:formData.active||null,
      clinicCredit:formData.clinicCredit||null,
      phCredit:formData.phCredit|| null,
      optCredit:formData.optCredit||null,
      otherCredit:formData.otherCredit|| null,
      schaName:(formData.schaName).trim()    
    };
    
    console.log("Payload sent to API:", updatedFormData);
   const url = 'http://192.168.91.201:8082/subcharge/create'; // The URL for form submission
    submitForm(url, updatedFormData, setPatientsSubTypeData, setValidtationMessage,setAlert,  clearForm);
   
  };

    const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = patientsSubTypeData.find(
      (item) => item.schgCode === id
    );

    if (itemToUpdate) {
      setFormData({
        schgCode: itemToUpdate.schgCode,
        schaName: itemToUpdate.schaName,
        active: itemToUpdate.active,
        clinicCredit: itemToUpdate.clinicCredit,
        phCredit: itemToUpdate.phCredit,
        optCredit: itemToUpdate.optCredit,
        otherCredit: itemToUpdate.otherCredit,
        icdVersion: itemToUpdate.icdVersion,
        toothSystem: itemToUpdate.toothSystem,
        headCharge: {
          hchgCode: itemToUpdate.headCharge?.hchgCode || 0,
        },
        priceList: {
          priceListCode: itemToUpdate.priceList?.priceListCode || 0,
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
        url: `${BASE_URL}subcharge/delete`,
        setValidtationMessage,
        data: patientsSubTypeData,
        setAlert,
        setData: setPatientsSubTypeData,
        itemKey: "schgCode", // Key to identify the item in the dataset
      });
    };

  const handleUpdate = () => {
    const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);
  
    const updatedData = {
      schaName: convertEmptyToNull(formData.schaName).trim(),
      schgCode: convertEmptyToNull(formData.schgCode),
      active: convertEmptyToNull(formData.active),
      clinicCredit: convertEmptyToNull(formData.clinicCredit),
      phCredit: convertEmptyToNull(formData.phCredit),
      optCredit: convertEmptyToNull(formData.optCredit),
      otherCredit: convertEmptyToNull(formData.otherCredit),
      icdVersion: convertEmptyToNull(formData.icdVersion),
      toothSystem: convertEmptyToNull(formData.toothSystem),
      // headCharge: { hchgCode: convertEmptyToNull(formData?.headCharge?.hchgCode) },
      // priceList: { priceListCode: convertEmptyToNull(formData?.priceList?.priceListCode) },
    };
  
    console.log("Updated Data:", updatedData);
    const url = `${BASE_URL}subcharge/update`;
        const id =formData.schgCode; // The URL for form submission
        updateForm( url,id,updatedData, setPatientsSubTypeData, setValidtationMessage,   setIsEditMode, setNotEditMode, clearForm ,setAlert);
     };

     return (
    <>
      <div className="container page-content">
        <h2>SUB CLASSIFICATION OF PATIENT TYPE</h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
    <form   onSubmit={handleSubmit} >
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="schaName" className="form-label">
                Schg Name
              </label>
              <input className="form-control"  id="schaName"  name="schaName" value={formData.schaName} onChange={handleChange}   required   ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select   className="form-control"   id="active"  name="active"  value={formData.active}  onChange={handleChange}  > 
                <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
             <div className="col-md-4">
              <label htmlFor="toothSystem" className="form-label">
                Tooth System
              </label>
              <input     type="text"  className="form-control"   id="toothSystem"    name="toothSystem"  value={formData.toothSystem}  onChange={handleChange} required  />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="clinicCredit" className="form-label">
                Clinic Credit
              </label>
              <select   className="form-control"   id="clinicCredit"    name="clinicCredit" value={formData.clinicCredit} onChange={handleChange}      >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="phCredit" className="form-label">
                Ph Credit
              </label>
              <select  className="form-control"   id="phCredit" name="phCredit"  value={formData.phCredit}  onChange={handleChange}  >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="optCredit" className="form-label">
                Opt Credit
              </label>
              <select  className="form-control"    id="optCredit"   name="optCredit"   value={formData.optCredit}  onChange={handleChange} >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          {/* Row 3 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="otherCredit" className="form-label">
                Other Credit
              </label>
              <select   className="form-control"  id="otherCredit"   name="otherCredit"  value={formData.otherCredit} onChange={handleChange}  >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="icdVersion" className="form-label">
                ICD Version
              </label>
              <input   type="text"  className="form-control"  id="icdVersion" name="icdVersion"   value={formData.icdVersion} onChange={handleChange}  required />
            </div>

           
            <div className="col-md-3">
              <label htmlFor="priceList" className="form-label">
                Price List (priceListcode)
              </label>
               <CustomSelect
              id="priceListCode"
              name="priceListCode"
              valueKey="priceListCode"   // Dynamic value key
              labelKey="priceListName"   
              data={priceListData}  // Pass the raw data, no need to map
              value={formData.priceList.priceListCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
            </div> 

          </div>

          {/* Patient Main Type (hchgCode) Row */}
          <div className="row mb-3">
         
             <div className="col-md-4">
              <label htmlFor="hchgCode" className="form-label">
                Patient Main Type (hchgCode)
              </label>
              <CustomSelect
              id="hchgCode"
              name="hchgCode"
              valueKey="hchgCode"   // Dynamic value key
              labelKey="hchgName"   
              data={patientsMainTypeData}  // Pass the raw data, no need to map
              value={formData.headCharge.hchgCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
            </div> 
          </div>
          {!isEditMode ? (
  <button type="submit" className="btn btn-primary">
    Create+
  </button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">
      Update
    </button>
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setNotEditMode(false);}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
  </form>
        <input   type="text"  placeholder="Search  by schg Name , schg Code" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
        <CustomDataTable
          columns={subTypePatientColumn(handleUpdateData, handleDelete)}
          data={filterData(patientsSubTypeData, searchTerm, ["schgCode","schaName"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
            <ExportData  url={`${BASE_URL}subcharge/export`}   fileName="Chg_grp_sub_head"   previewData={patientsSubTypeData} />
      </div>
    </>
  );
};

export default PatientSubType;



