import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import ExportData1 from "../utils/Export1";
import { FormContext } from "../Context/Context";
import { patientDataMasterDataColumn } from "../utils/ArrayData1";


const PatientDataMaster = () => {
  const { patientDataMasterData, nationalityData,setPatientDataMasterData,patientsSubTypeData, BASE_URL, setValidtationMessage, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const initialFormData = {
   
    // patientCode: "",
    patientName: "",
    patientNameAr: "",
    patientMobileCountryCode: "", //number
    patientMobileNo: "",   //number
    nationalityCode: {
      nationalityCode: 0,
    },
    patientDateOfBirth: "", //date
    countryIdNo: "", //str
    passportNo: "", //str
    occupation: "", //str
    vipPatient: "", 
    active: "",
    blackListed: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };

  // Handle patientMainTypeData changes (for select input)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      if (name === "nationalityCode") {
        return {
          ...prevData,
          nationalityCode: {
            ...prevData.nationalityCode,
            nationalityCode: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  }, []);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the payload matches the API's expected format
    const updatedFormData = {
      ...formData,
      nationalityCode: {
        ...formData.nationalityCode,
        nationalityCode: Number(formData.nationalityCode.nationalityCode),
      },
      patientMobileCountryCode: Number(formData.patientMobileCountryCode),
      patientMobileNo: Number(formData.patientMobileNo),
      // patientCode: Number(formData. patientCode)
   
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}patientDataMaster/create`; // The URL for form submission
    submitForm(url, updatedFormData, setPatientDataMasterData, setValidtationMessage, setAlert, clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = patientDataMasterData.find(
      (item) => item.patientCode === id
    );

    if (itemToUpdate) {
      setFormData({
        patientCode: itemToUpdate.patientCode,
        patientName: itemToUpdate.patientName,
        patientNameAr: itemToUpdate.patientNameAr,
        patientMobileCountryCode: itemToUpdate.patientMobileCountryCode,
        patientMobileNo: itemToUpdate.patientMobileNo,
        patientDateOfBirth: itemToUpdate.patientDateOfBirth,
        countryIdNo: itemToUpdate.countryIdNo,
        passportNo: itemToUpdate.passportNo,
        occupation: itemToUpdate.occupation,
        vipPatient: itemToUpdate.vipPatient,
        active: itemToUpdate.active,
        blackListed: itemToUpdate.blackListed,

        nationalityCode: {
          nationalityCode: itemToUpdate.nationalityCode?.nationalityCode || 0,
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
      url: `${BASE_URL}patientDataMaster/delete`,
      setValidtationMessage,
      data: patientsSubTypeData,
      setAlert,
      setData: setPatientDataMasterData,
      itemKey: "patientCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    // const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);


    console.log("Updated Data:", formData);
    const url = `${BASE_URL}patientDataMaster/update`;
    const id = formData.patientCode; // The URL for form submission
    updateForm(url, id, formData, setPatientDataMasterData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
  };
return (
  <>
    <div className="container page-content">
      <h2>Patient Data Master</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} >
        {/* Row 1 */}
        <div className="row mb-3">
          {/* <div className="col-md-4">
            <label htmlFor="patientCode" className="form-label">
              Patient Code
            </label>
            <input className="form-control" type="text" id="patientCode" name="patientCode" value={formData.patientCode} onChange={handleChange} required   ></input>
          </div> */}
          <div className="col-md-4">
            <label htmlFor="patientName" className="form-label">
              Patient Name
            </label>
            <input type="text" className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="patientNameAr" className="form-label">
              Patient Name Ar
            </label>
            <input className="form-control" id="patientNameAr" name="patientNameAr" value={formData.patientNameAr} onChange={handleChange} required   ></input>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="active" className="form-label">
              Active
            </label>
            <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange}  >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="vipPatient" className="form-label">
              Vip Patient
            </label>
            <select className="form-control" id="vipPatient" name="vipPatient" value={formData.vipPatient} onChange={handleChange}  >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="blackListed" className="form-label">
              Black Listed
            </label>
            <select className="form-control" id="blackListed" name="blackListed" value={formData.blackListed} onChange={handleChange} >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="patientMobileCountryCode" className="form-label">
              Patient Mobile Country Code
            </label>
            <input type="number" className="form-control" id="patientMobileCountryCode" name="patientMobileCountryCode" value={formData.patientMobileCountryCode} onChange={handleChange} required />
          </div>
        
          <div className="col-md-4">
            <label htmlFor="patientMobileNo" className="form-label">
              Patient Mobile No
            </label>
            <input type="number" className="form-control" id="patientMobileNo" name="patientMobileNo" value={formData.patientMobileNo} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <label htmlFor="priceList" className="form-label">
              Nationality (Nationality_code)
            </label>
            <CustomSelect
              id="nationalityCode"
              name="nationalityCode"
              valueKey="nationalityCode"   // Dynamic value key
              labelKey="nationality"
              data={nationalityData}  // Pass the raw data, no need to map
              value={formData.nationalityCode.nationalityCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
          </div>
          
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="patientDateOfBirth" className="form-label">
              Patient Date Of Birth
            </label>
            <input type="date" className="form-control" id="patientDateOfBirth" name="patientDateOfBirth" value={formData.patientDateOfBirth} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="countryIdNo" className="form-label">
              Country Id
            </label>
            <input type="text" className="form-control" id="countryIdNo" name="countryIdNo" value={formData.countryIdNo} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="passportNo" className="form-label">
            Passport No
            </label>
            <input type="text" className="form-control" id="passportNo" name="passportNo" value={formData.passportNo} onChange={handleChange} required />
          </div>
        </div>
        
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="occupation" className="form-label">
            Occupation
            </label>
            <input type="text" className="form-control" id="occupation" name="occupation" value={formData.occupation} onChange={handleChange} required />
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
            <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">
              Cancel
            </button>
          </>
        )}
      </form>
      <input type="text" placeholder="Search  by  patientCode,patientName , " value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
      <CustomDataTable
        columns={patientDataMasterDataColumn(handleUpdateData, handleDelete)}
        data={filterData(patientDataMasterData, searchTerm, ["patientCode", "patientName"],)}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
      <ExportData url={`${BASE_URL}patientDataMaster/export`} fileName="Patient_data_master" previewData={patientDataMasterData} />
    </div>
  </>
);
};


export default PatientDataMaster
