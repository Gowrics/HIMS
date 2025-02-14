import React, { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import { nationalityData, subTypePatientColumn } from "../assets/ArrayData";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import ExportData1 from "../utils/Export1";
import { FormContext } from "../Context/Context";
import { patientDataMasterDataColumn, patientRegDocsDataColumn } from "../utils/ArrayData1";

const PatientRegDocs = () => {
  const { patientDataMasterData,docTypeMasterData,patientRegDocsData, setPatientRegDocsData, BASE_URL, setValidtationMessage, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    //regNo:"",  
    patientDataMaster: {
      patientCode: null,
    },
    docTypeMaster: { 
      docTypeCode: null,
    },
    docAttachment: "",
    expiryDate: "",
    defaultDoc: "", 
    passportLinkDoc: "", 
    countryIdDoc: "", 
    active: "",
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
      if (name === "patientCode") {
        return {
          ...prevData,
          patientDataMaster: {
            ...prevData.patientDataMaster,
            patientCode: value,
          },
        };
      }
      else if(name === "docTypeCode") {
        return {
          ...prevData,
          docTypeMaster: {
            ...prevData.docTypeMaster,
            docTypeCode: value,
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
      // patientDataMaster: {
      //   ...formData.patientDataMaster,
      //   patientCode: Number(formData.patientDataMaster.patientCode),
      // },
      docTypeMaster: {
        ...formData.docTypeMaster,
        docTypeCode: Number(formData.docTypeMaster.docTypeCode),
      },
    //  patientRegCode: Number(formData.patientRegCode),

      };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}patientRegister/create`; // The URL for form submission
    submitForm(url, updatedFormData, setPatientRegDocsData, setValidtationMessage, setAlert, clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = patientRegDocsData.find(
      (item) => item.regNo === id
    );

    if (itemToUpdate) {
    
      setFormData({
        regNo: itemToUpdate.regNo,
        docAttachment: itemToUpdate.docAttachment,
        expiryDate: itemToUpdate.expiryDate,
        defaultDoc: itemToUpdate.defaultDoc,
        passportLinkDoc: itemToUpdate.passportLinkDoc,
        countryIdDoc: itemToUpdate.countryIdDoc,
        active: itemToUpdate.active,
        patientDataMaster: {
          patientCode: itemToUpdate.patientDataMaster?.patientCode || 0,
        },
        docTypeMaster: {
          docTypeCode: itemToUpdate.docTypeMaster?.docTypeCode || 0,
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
      url: `${BASE_URL}patientRegister/delete`,
      setValidtationMessage,
      data: patientRegDocsData,
      setAlert,
      setData: setPatientRegDocsData,
      itemKey: "regNo", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    // const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);


    console.log("Updated Data:", formData);
    const url = `${BASE_URL}patientRegister/update`;
    const id = formData.regNo; // The URL for form submission
    updateForm(url, id, formData, setPatientRegDocsData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
  };
return (
  <>
    <div className="container page-content">
      <h2>Patient Reg Documents</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form onSubmit={handleSubmit} >
        {/* Row 1 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="regNo" className="form-label">
            patientRegCode
            </label>
            <input className="form-control" type="number" id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} required   disabled/>
          </div>
          <div className="col-md-3">
            <label htmlFor="priceList" className="form-label">
            patientDataMaster (patientCode)
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
          <div className="col-md-3">
            <label htmlFor="priceList" className="form-label">
            docTypeMaster (docTypeCode)
            </label>
            <CustomSelect
              id="docTypeCode"
              name="docTypeCode"
              valueKey="docTypeCode"   // Dynamic value key
              labelKey="docTypeName"
              data={docTypeMasterData}  // Pass the raw data, no need to map
              value={formData.docTypeMaster.docTypeCode}
              onChange={handleChange}
              isDisabled={notEditMode}
                placeholder="Select an option"
            />
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
            <label htmlFor="defaultDoc" className="form-label">
            defaultDoc
            </label>
            <select className="form-control" id="defaultDoc" name="defaultDoc" value={formData.defaultDoc} onChange={handleChange}  >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="passportLinkDoc" className="form-label">
            passportLinkDoc
            </label>
            <select className="form-control" id="passportLinkDoc" name="passportLinkDoc" value={formData.passportLinkDoc} onChange={handleChange} >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="docAttachment" className="form-label">
            docAttachment
            </label>
            <input type="url" className="form-control" id="docAttachment" name="docAttachment" value={formData.docAttachment} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="expiryDate" className="form-label">
            expiryDate
            </label>
            <input type="date" className="form-control" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
          </div>
        
        </div>

        <div className="row mb-3">
        <div className="col-md-4">
            <label htmlFor="countryIdDoc" className="form-label">
            countryIdDoc
            </label>
            <select className="form-control" id="countryIdDoc" name="countryIdDoc" value={formData.countryIdDoc} onChange={handleChange} >
              <option value="">Select an Option</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
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
        columns={patientRegDocsDataColumn(handleUpdateData, handleDelete)}
        data={filterData(patientRegDocsData, searchTerm, ["patientCode", "patientName"],)}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
      <ExportData url={`${BASE_URL}patientRegister/export`} fileName="Patient_reg_docs" previewData={patientDataMasterData} />
    </div>
  </>
);
};
export default PatientRegDocs
