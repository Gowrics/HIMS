import React, { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { thirdPartyHeadDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
import { patientChgDepDataColumn } from "../utils/ArrayData1";
const PatientChgDep = () => {

  const {
    setValidtationMessage, BASE_URL, patientChgDepData, setPatientChgDepData,
    patientDataMasterData, policiesSubPatientData, patientsSubTypeData, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    //patientChargeCode
    patientDataMaster: { //patientDataMaster
      patientCode: null,
    },
    policiesCharge: { //policiesCharge
      chargeCode: "",
    },
    cardAttachment: "",
    cardExpiryDate: "",
    cardExpiryDate: "",
    active: "",  //isActive
    defaultStatus: ""  //defaultStatus
  };

  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "patientCode") {
      setFormData((prevData) => ({
        ...prevData,
        patientDataMaster: {
          ...prevData.patientDataMaster,
          patientCode: value,
        },
      }));
    } else if (name === "chargeCode") {
      setFormData((prevData) => ({
        ...prevData,
        policiesCharge: {
          ...prevData.policiesCharge,
          chargeCode: value,
        },
      }));
    }
    else {
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
      patientDataMaster: {
        ...formData.patientDataMaster,
        patientCode: (formData.patientDataMaster.patientCode), // Convert schgCode to a number
      },
      policiesCharge: {
        ...formData.policiesCharge,
        chargeCode: (formData.policiesCharge.chargeCode), // Convert schgCode to a number
      },
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}patientCharge/create`; // The URL for form submission
    // const url = `http://localhost:8005/patientChgDepData`; // The URL for form submission
    submitForm(url, updatedFormData, setPatientChgDepData, setValidtationMessage, setAlert, clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = patientChgDepData.find((item) => item.patientChargeCode === id);  //chag
    if (itemToUpdate) {
      setFormData({
        patientChargeCode: itemToUpdate.patientChargeCode,
        cardAttachment: itemToUpdate.cardAttachment,
        cardExpiryDate: itemToUpdate.cardExpiryDate,
        active: itemToUpdate.active,
        defaultStatus: itemToUpdate.defaultStatus,
        patientDataMaster: {
          patientCode: itemToUpdate.patientDataMaster?.patientCode || 0,
        },
        policiesCharge: {
          chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
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
      url: `${BASE_URL}patientCharge/delete`,
      setValidtationMessage,
      data: patientChgDepData,
        setAlert,
      setData: setPatientChgDepData,
      itemKey: "patientChargeCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const {
      patientChargeCode,
      cardAttachment,
      cardExpiryDate,
      active,
      defaultStatus, // renamed 'default' to avoid reserved keyword issues
      patientDataMaster,
      policiesCharge
    } = formData || {}; // Ensure formData is at least an empty object

    const updatedData = {
      patientChargeCode,
      cardAttachment,
      cardExpiryDate,
      active,
      defaultStatus: defaultStatus,
      patientDataMaster: { patientCode: patientDataMaster?.patientCode || "" },
      policiesCharge: { chargeCode: policiesCharge?.chargeCode || "" }
    };
    const url = `${BASE_URL}patientCharge/update`;
    const id = formData.patientChargeCode;
    updateForm(url, id, updatedData, setPatientChgDepData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);

  };

  return (
    <>
      <div className="container page-content">
        <h2>PATIENT CHARGE GROUP DEPENDENCY </h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="patientCode" className="form-label">
                Patient Data Master Sub Type (Patient Code)
              </label>
              <CustomSelect
                id="patientCode"
                name="patientCode"
                valueKey="patientCode"   // Dynamic value key
                labelKey="patientName"
                data={patientDataMasterData}  // Pass the raw data, no need to map
                value={formData.patientDataMaster.patientCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="patientCode" className="form-label">
                Policies Charge Sub Type (Charge Code)
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
              <label htmlFor="cardAttachment" className="form-label">
                Card Attachment
              </label>
              <input className="form-control" type="url" id="cardAttachment" name="cardAttachment" value={formData.cardAttachment} onChange={handleChange} required />
            </div>
          </div>


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
              <label htmlFor="defaultStatus" className="form-label">
                Default Status
              </label>
              <select className="form-control" id="defaultStatus" name="defaultStatus" value={formData.defaultStatus} onChange={handleChange}  >
                <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="cardExpiryDate" className="form-label">
                Card Expiry Date
              </label>
              <input className="form-control" type="date" id="cardExpiryDate" name="cardExpiryDate" value={formData.cardExpiryDate} onChange={handleChange} required />
            </div>
          </div>
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">      Create+         </button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">     Update        </button>
              <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">    Cancel       </button>
            </>
          )}
        </form>

        <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
        <CustomDataTable
          columns={patientChgDepDataColumn(handleUpdateData, handleDelete)}
          data={filterData(patientChgDepData, searchTerm, ["tpaName", "tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        <ExportData url={`${BASE_URL}patientChgDep/export`} fileName="Patient_chg_dep" previewData={patientChgDepData} />
      </div>
    </>
  );
};

export default PatientChgDep
