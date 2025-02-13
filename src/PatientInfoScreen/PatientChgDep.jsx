import React, { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { thirdPartyHeadDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
const PatientChgDep = () => {

  const {
    setValidtationMessage, BASE_URL,
    thirdPartyHeadData, setThirdPartyHead, patientsSubTypeData, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    //tpaCode
    tpaName: "",
    active: "",
    subcharge: {
      schgCode: "",
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
    if (name === "schgCode") {
      setFormData((prevData) => ({
        ...prevData,
        subcharge: {
          ...prevData.subcharge,
          schgCode: value,
        },
      }));
    } else {
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
      subcharge: {
        ...formData.subcharge,
        schgCode: (formData.subcharge.schgCode), // Convert schgCode to a number
      },
      active: formData.active || null,
      tpaName: (formData.tpaName).trim()
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}tpahead/create`; // The URL for form submission
    submitForm(url, updatedFormData, setThirdPartyHead, setValidtationMessage, setAlert, clearForm);

  };
  
  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = thirdPartyHeadData.find((item) => item.tpaCode === id);

    if (itemToUpdate) {
      setFormData({
        tpaCode: itemToUpdate.tpaCode,
        tpaName: itemToUpdate.tpaName,
        active: itemToUpdate.active,
        subcharge: {
          schgCode: itemToUpdate.subcharge?.schgCode || 0,
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
      url: `${BASE_URL}tpahead/delete`, setValidtationMessage, setAlert,
      data: thirdPartyHeadData,
      setData: setThirdPartyHead,
      itemKey: "tpaCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {

    const {
      tpaName,
      tpaCode,
      active,
      subcharge: { schgCode },
    } = formData;
    const updatedData = {
      tpaName: tpaName.trim(),
      tpaCode,
      active,
      subcharge: { schgCode },
    };
    console.log(formData);
    console.log(updatedData);
    const url = `${BASE_URL}tpahead/update`;
    const id = formData.tpaCode; // The URL for form submission
    updateForm(url, id, updatedData, setThirdPartyHead, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);

  };

  return (
    <>
      <div className="container page-content">
        <h2>THIRD PARTY AUDITORS FOR A SUB CLASSIFICATION PATIENT TYPE</h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="tpaName" className="form-label">
                Tpa Name
              </label>
              <input className="form-control" id="tpaName" name="tpaName" value={formData.tpaName} onChange={handleChange} required />
            </div>

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
          </div>


          <div className="row mb-3">
            <div className="col-md-4">
    <label htmlFor="schgCode" className="form-label">
      Patient Sub Type (schgCode)
    </label>
            <CustomSelect
              id="schgCode"
              name="schgCode"
               valueKey="schgCode"   // Dynamic value key
              labelKey="schaName"   
              data={patientsSubTypeData}  // Pass the raw data, no need to map
              value={formData.subcharge.schgCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
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
        
        <input     type="text"      placeholder="Search hchgName"    value={searchTerm}    onChange={(e) => setSearchTerm(e.target.value)}     className="form-control my-2"     />
        <CustomDataTable
          columns={thirdPartyHeadDataColumn(handleUpdateData, handleDelete)}
          data={filterData(thirdPartyHeadData, searchTerm, ["tpaName", "tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
     <ExportData   url={`${BASE_URL}tpahead/export`}   fileName="TPA_head"   previewData={patientsSubTypeData} />
      </div>
    </>
  );
};

export default PatientChgDep
