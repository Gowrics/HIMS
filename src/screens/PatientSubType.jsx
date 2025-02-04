import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
import { subTypePatientColumn } from "../assets/ArrayData";

const PatientSubType = () => {
  const {
    patientsMainTypeData,  patientsSubTypeData,BASE_URL,
    setPatientsSubTypeData,  priceListData,
    validtationMessage,setValidtationMessage, showModal, setShowModal,
  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [notEditMode, setNotEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
  
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
      setShowModal(false);
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
    submitForm(url, updatedFormData, setPatientsSubTypeData, setValidtationMessage, setShowModal, clearForm);
   
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
        setValidtationMessage,setShowModal,
        data: patientsSubTypeData,
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
        updateForm( url,id,updatedData, setPatientsSubTypeData, setValidtationMessage,  setShowModal, setIsEditMode, setNotEditMode, clearForm );
     };

     return (
    <>
      <div className="container page-content">
        <h2>SUB CLASSIFICATION OF PATIENT TYPE</h2>
        <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
    <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
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
              <select    className="form-control"   id="pr"  name="priceListCode" value={formData.priceList.priceListCode} onChange={handleChange}  required  disabled={notEditMode}  >
                <option value="">Select an option</option>
                {priceListData.map((option) => (
                  <option
                    key={option.priceListCode}
                    value={option.priceListCode}
                  >
                    {option.priceListCode}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Patient Main Type (hchgCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="hchgCode" className="form-label">
                Patient Main Type (hchgCode)
              </label>
              <select   className="form-control"   id="hchgCode"  name="hchgCode"  value={formData.headCharge.hchgCode}    onChange={handleChange}  required   disabled={notEditMode} >
                <option value="">Select an option</option>
                {patientsMainTypeData.map((option) => (
                  <option key={option.hchgCode} value={option.hchgCode}>
                    {option.hchgCode}
                  </option>
                ))}
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setNotEditMode(false);setShowModal(false)}} className=" ms-4 btn btn-secondary">
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
      </div>
    </>
  );
};

export default PatientSubType;





 // // Send the data to the API
    // axios
    //   .post("http://192.168.91.201:8082/subcharge/create", updatedFormData)
    //   .then((response) => {
    //     alert("Form submitted successfully");
  
    //     // Fetch the latest data after successful submission
    //     axios
    //       .get("http://192.168.91.201:8082/subcharge/getAll")
    //       .then((res) => {
    //         setPatientsSubTypeData(res.data);
    //         // Clear form after successful submission
    //         clearForm();
    //       })
    //       .catch((err) => console.error("Error fetching data:", err));
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 500) {
    //       setValidtationMessage("Schg  Name must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //   });

     // axios
    //   .put(`http://192.168.91.201:8082/subcharge/update/${formData.schgCode}`, updatedData)
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/subcharge/getAll")
    //       .then((res) => {
    //         setPatientsSubTypeData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //         clearForm();
    //                   })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     {
    //        if (err.response && err.response.status === 400) {
    //       setValidtationMessage("Schg  Name must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //     }
    //   );