import React, { useContext, useState } from "react";
import axios from "axios";
import { policiesSubPatientDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
const PoliciesSubPatient = () => {
  const {
    policiesSubPatientData, setPoliciesSubPatient, BASE_URL, messageType,
    validtationMessage, setValidtationMessage,
    thirdPartyHeadData, patientsSubTypeData, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    // chargeCode: 0,
    chargeName: "", //
    policyNo: "",
    policyExpDate: "",
    active: "",
    subCharge: {
      schgCode: 0,
    },
    tpaHead: {
      tpaCode: 0,
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
      // Update subCharge
      setFormData((prevData) => ({
        ...prevData,
        subCharge: {
          ...prevData.subCharge,
          schgCode: value,
        },
      }));
    } else if (name === "tpaCode") {
      // Update tpaHead
      setFormData((prevData) => ({
        ...prevData,
        tpaHead: {
          ...prevData.tpaHead,
          tpaCode: value,
        },
      }));
    } else {
      // Update top-level fields
            setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      subCharge: {
        ...formData.subCharge,
        schgCode: Number(formData.subCharge.schgCode),
      },
      tpaHead: {
        ...formData.tpaHead,
        tpaCode: Number(formData.tpaHead.tpaCode),

      },
      active: formData.active || null,
      chargeName: (formData.chargeName).trim(),
    };
    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}policiesCharge/create`; // The URL for form submission
    submitForm(url, updatedFormData, setPoliciesSubPatient, setValidtationMessage, setAlert, clearForm);
  };



  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = policiesSubPatientData.find(
      (item) => item.chargeCode === id
    );

    if (itemToUpdate) {
      setFormData({
        chargeCode: itemToUpdate.chargeCode,
        policyNo: itemToUpdate.policyNo,
        policyExpDate: itemToUpdate.policyExpDate,
        chargeName: itemToUpdate.chargeName,
        active: itemToUpdate.active,

        subCharge: {
          schgCode: itemToUpdate.subCharge?.schgCode || 0,
        },
        tpaHead: {
          tpaCode: itemToUpdate.tpaHead?.tpaCode || null,
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
      url: `${BASE_URL}policiesCharge/delete`,
      setValidtationMessage, setAlert,
      data: policiesSubPatientData,
      setData: setPoliciesSubPatient,
      itemKey: "chargeCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const {
      chargeName,
      chargeCode,
      active,
      policyNo,
      policyExpDate,
      subCharge: { schgCode },
      tpaHead: { tpaCode },
    } = formData;
    const updatedData = {
      chargeName: chargeName.trim(),
      chargeCode,
      active,
      policyExpDate,
      policyNo,
      subCharge: { schgCode },
      tpaHead: { tpaCode },
    };
    console.log(formData);
    console.log(updatedData);
    const url = `${BASE_URL}policiesCharge/update`;
    const id = formData.chargeCode; // The URL for form submission
    updateForm(url, id, updatedData, setPoliciesSubPatient, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
  };

  return (
    <>
      <div className="container page-content">
        <h2>POLICIES UNDER SUB CLASSIFIED PATIENT TYPE</h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>


          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="chargeName" className="form-label">
                Charge Name
              </label>
              <input className="form-control" id="chargeName" name="chargeName" value={formData.chargeName} onChange={handleChange} required  ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange} >
                <option value="">Select an option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
            {/* TPA head Type (tpaCode) Row */}
            <div className="col-md-4">
              <label htmlFor="tpaCode" className="form-label">
                TPA head Type (tpaCode)
              </label>
              <CustomSelect
                id="tpaCode"
                name="tpaCode"
                valueKey="tpaCode"   // Dynamic value key
                labelKey="tpaName"
                data={thirdPartyHeadData}  // Pass the raw data, no need to map
                value={formData.tpaHead.tpaCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />
            </div>
          </div>
          {/* Patient Main Type (schgCode) Row */}
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
                value={formData.subCharge.schgCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="policyNo" className="form-label">
                Policy No
              </label>
              <input className="form-control" id="policyNo" name="policyNo" value={formData.policyNo} onChange={handleChange} required  ></input>
            </div>
            <div className="col-md-4">
              <label htmlFor="policyExpDate" className="form-label">
                Policy Expiration Date
              </label>
              <input type="date" className="form-control" id="policyExpDate" name="policyExpDate" value={formData.policyExpDate} onChange={handleChange} />
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
        <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
        <CustomDataTable
          columns={policiesSubPatientDataColumn(handleUpdateData, handleDelete)}
          data={filterData(policiesSubPatientData, searchTerm, ["chargeName", "chargeCode"])}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        <ExportData url={`${BASE_URL}policiesCharge/export`} fileName="Chg_grp_policies" previewData={policiesSubPatientData} />
      </div>
    </>
  );
};

export default PoliciesSubPatient;
