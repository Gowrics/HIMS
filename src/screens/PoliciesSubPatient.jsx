import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { policiesSubPatientDataColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
const PoliciesSubPatient = () => {
  const {
    policiesSubPatientData, setPoliciesSubPatient,BASE_URL,
    validtationMessage, setValidtationMessage,
    thirdPartyHeadData, patientsSubTypeData,
        searchTerm, setSearchTerm,
  } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false); 
   const [notEditMode, setNotEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    subCharge: {
      ...formData.subCharge,
      schgCode: Number(formData.subCharge.schgCode),
    },
    tpaHead: {
      ...formData.tpaHead,
      tpaCode: Number(formData.tpaHead.tpaCode),

    },
    active: formData.active || null,
    chargeName:(formData.chargeName).trim(),
  };
      console.log("Payload sent to API:", updatedFormData);
const url = `${BASE_URL}policiesCharge/create`; // The URL for form submission
submitForm(url, updatedFormData, setPoliciesSubPatient, setValidtationMessage, setShowModal, clearForm);
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
      url: "http://192.168.91.201:8082/policiesCharge/delete",
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
      chargeName:chargeName.trim(),
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
        const id =formData.chargeCode; // The URL for form submission
        updateForm( url,id,updatedData, setPoliciesSubPatient, setValidtationMessage, setShowModal, setIsEditMode,  setNotEditMode, clearForm );
      };

  return (
    <>
      <div className="container page-content">
        <h2>POLICIES UNDER SUB CLASSIFIED PATIENT TYPE</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
 

          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="chargeName" className="form-label">
                Charge Name
              </label>
              <input  className="form-control"  id="chargeName"  name="chargeName"  value={formData.chargeName}  onChange={handleChange}  required  ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select  className="form-control"   id="active"  name="active"   value={formData.active}  onChange={handleChange} >
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
              <select   className="form-control"    id="tpaCode"    name="tpaCode" value={formData.tpaHead.tpaCode}  onChange={handleChange}   required  disabled={notEditMode} >
                <option value="">Select an option</option>
                {thirdPartyHeadData.map((option) => (
                  <option key={option.tpaCode} value={option.tpaCode}>
                    {option.tpaCode}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Patient Main Type (schgCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="schgCode" className="form-label">
                Patient Sub Type (schgCode)
              </label>
              <select className="form-control"    id="schgCode"  name="schgCode"    value={formData.subCharge.schgCode}   onChange={handleChange}   required  disabled={notEditMode} >
                <option value="">Select an option</option>
                {patientsSubTypeData.map((option) => (
                  <option key={option.schgCode} value={option.schgCode}>
                    {option.schgCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="policyNo" className="form-label">
                Policy No
              </label>
              <input  className="form-control"   id="policyNo"  name="policyNo"  value={formData.policyNo}  onChange={handleChange}   required  ></input>
            </div>
            <div className="col-md-4">
              <label htmlFor="policyExpDate" className="form-label">
                Policy Expiration Date
              </label>
              <input   type="date"  className="form-control"  id="policyExpDate"  name="policyExpDate" value={formData.policyExpDate} onChange={handleChange}   />
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
              <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false); setShowModal(false)}} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}
        </form>
        <input
      type="text"
      placeholder="Search hchgName"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control my-2"
    />  
        <CustomDataTable
          columns={policiesSubPatientDataColumn(handleUpdateData, handleDelete)}
          data={policiesSubPatientData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PoliciesSubPatient;

 // axios
  //   .post("http://192.168.91.201:8082/policiesCharge/create", updatedFormData)
  //   .then((response) => {
  //     alert("Form submitted successfully");

  //     // Fetch the latest data
  //     return axios.get("http://192.168.91.201:8082/policiesCharge/getAll");
  //   })
  //   .then((res) => {
  //     setPoliciesSubPatient(res.data);
  //     console.log(policiesSubPatientData);

  //     // Clear form after successful submission
  //     clearForm();
  //   })
  //   .catch((err) => {
  //     if (err.response && err.response.status === 500) {
  //       setValidtationMessage("Charge name must be unique. This value already exists!"); // Custom message for 500 errors
  //       setShowModal(true);
  //     } else {
  //       console.log("Error submitting form:", err);
  //     }
  //   });

   // axios
    //   .put(
    //     `http://192.168.91.201:8082/policiesCharge/update/${formData.chargeCode}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/policiesCharge/getAll")
    //       .then((res) => {
    //         setPoliciesSubPatient(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //         clearForm();
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 400) {
    //       setValidtationMessage("Tpa Name must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //    });