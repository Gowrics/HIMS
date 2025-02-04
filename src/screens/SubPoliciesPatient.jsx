import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { subPoliciesPatientDataColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
const SubPoliciesPatient = () => {
  const {
    policiesSubPatientData,BASE_URL, subPoliciesPatientData, setSubPoliciesPatientData, validtationMessage, setValidtationMessage,searchTerm, setSearchTerm} = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [notEditMode, setNotEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
  const initialFormData = {
    policySubCode: 0,
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
    setShowModal(false);
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
      submitForm(url, updatedFormData, setSubPoliciesPatientData, setValidtationMessage, setShowModal, clearForm);
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
      url: "http://192.168.91.201:8082/policySubCharge/delete",
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
        updateForm( url,id,updatedData, setSubPoliciesPatientData, setValidtationMessage, setShowModal, setIsEditMode,  setNotEditMode, clearForm );
     };

  return (
    <>
      <div className="container page-content">
        <h2>SUB POLICY TYPES UNDER A SUB CLASSIFIED PATIENT TYPE</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
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
              <select   className="form-control"  id="chargeCode"  name="chargeCode"    value={formData.policiesCharge.chargeCode} 
               onChange={handleChange} required disabled={notEditMode}   >
                <option value="">Select an option</option>
                {policiesSubPatientData.map((option) => (
                  <option key={option.chargeCode} value={option.chargeCode}>
                    {option.chargeCode}
                  </option>
                ))}
              </select>
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
              <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false); setShowModal(false)}} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}

        </form>
        <CustomDataTable
          columns={subPoliciesPatientDataColumn(handleUpdateData, handleDelete)}
          data={subPoliciesPatientData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default SubPoliciesPatient;



    // // Send POST request to the API
    // axios
    //   .post("http://192.168.91.201:8082/policySubCharge/create", updatedFormData)
    //   .then((response) => {
    //     alert("Form submitted successfully");

    //     // Fetch updated data after form submission
    //     axios
    //       .get("http://192.168.91.201:8082/policySubCharge/getAll")
    //       .then((res) => {
    //         setSubPoliciesPatientData(res.data); // Make sure this is defined in the same component
    //         clearForm();
    //       })
    //       .catch((err) => {
    //         console.error("Error fetching data:", err);
    //       });
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 500) {
    //       setValidtationMessage("policySubCode  must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //   });

     // axios
    //   .put(
    //     `http://192.168.91.201:8082/policySubCharge/update/${formData.policySubCode}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/policySubCharge/getAll")
    //       .then((res) => {
    //         setSubPoliciesPatientData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //         clearForm();
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     alert("The data is already present in another child table.", err)
    //   );