import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { subTypePatientColumn } from "../assets/ArrayData";

const PatientSubType = () => {
  const {
    patientsMainTypeData,
    patientsSubTypeData,
    setPatientsSubTypeData,
    setIsEditMode,
    isEditMode,
    priceListData,validtationMessage,setValidtationMessage, showModal, setShowModal,
    searchTerm,
    setSearchTerm,
  } = useContext(FormContext);

  const initialFormData = {
    // schgCode: 0,
    schaName: "",
    active: null,
    clinicCredit: null,
    phCredit: null,
    optCredit: null,
    otherCredit: null,
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
  const handleUpdateData = (id) => {
    console.log(id);
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowModal(false);
  };

  // Handle patientMainTypeData changes (for select input)
  const handlePatientTypeChange = (e) => {
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
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
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
      toothSystem: formData.toothSystem || "default", // Provide a default value if null or undefined
    };
  
    console.log("Payload sent to API:", updatedFormData);
  
    // Send the data to the API
    axios
      .post("http://192.168.91.201:8082/subcharge/create", updatedFormData)
      .then((response) => {
        alert("Form submitted successfully");
  
        // Fetch the latest data after successful submission
        axios
          .get("http://192.168.91.201:8082/subcharge/getAll")
          .then((res) => {
            setPatientsSubTypeData(res.data);
            // Clear form after successful submission
            clearForm();
          })
          .catch((err) => console.error("Error fetching data:", err));
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          setValidtationMessage("Hchg Name must be unique. This value already exists!"); // Custom message for 500 errors
          setShowModal(true);
        } else {
          console.log("Error submitting form:", err);
        }
      });
  };
  

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://192.168.91.201:8082/subcharge/delete/${id}`)
        .then((res) => {
          console.log("Deleted successfully:", res.data);
          const updatedData = patientsSubTypeData.filter(
            (item) => item.schgCode !== id
          );
          setPatientsSubTypeData(updatedData);
        })
        .catch((err) => console.log("Error deleting data:", err));
    }
  };

  const handleUpdate = () => {
    const {
      schaName,
      schgCode,
      active,
      clinicCredit,
      phCredit,
      optCredit,
      otherCredit,
      icdVersion,
      toothSystem,
      headCharge: { hchgCode },
      priceList: { priceListCode },
    } = formData;
    const updatedData = {
      schaName,
      schgCode,
      active,
      clinicCredit,
      phCredit,
      optCredit,
      otherCredit,
      icdVersion,
      toothSystem,
      headCharge: { hchgCode },
      priceList: { priceListCode },
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/subcharge/update/${formData.schgCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/subcharge/getAll")
          .then((res) => {
            setPatientsSubTypeData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            clearForm();
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) =>
        alert("The data is already present in another child table.", err)
      );
  };

  return (
    <>
      <div className="container page-content">
        <h2>SUB CLASSIFICATION OF PATIENT TYPE</h2>
        <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="schaName" className="form-label">
                Schg Name
              </label>
              <input
                className="form-control"
                id="schaName"
                name="schaName"
                value={formData.schaName}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select
                className="form-control"
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
              
              > <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="clinicCredit" className="form-label">
                Clinic Credit
              </label>
              <select
                className="form-control"
                id="clinicCredit"
                name="clinicCredit"
                value={formData.clinicCredit}
                onChange={handleChange}
                
              >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="phCredit" className="form-label">
                Ph Credit
              </label>
              <select
                className="form-control"
                id="phCredit"
                name="phCredit"
                value={formData.phCredit}
                onChange={handleChange}
              
              > <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="optCredit" className="form-label">
                Opt Credit
              </label>
              <select
                className="form-control"
                id="optCredit"
                name="optCredit"
                value={formData.optCredit}
                onChange={handleChange}
                            > <option value="">Select an Option</option>
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
              <select
                className="form-control"
                id="otherCredit"
                name="otherCredit"
                value={formData.otherCredit}
                onChange={handleChange}
                              > <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="icdVersion" className="form-label">
                ICD Version
              </label>
              <input
                type="text"
                className="form-control"
                id="icdVersion"
                name="icdVersion"
                value={formData.icdVersion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="toothSystem" className="form-label">
                Tooth System
              </label>
              <input
                type="text"
                className="form-control"
                id="toothSystem"
                name="toothSystem"
                value={formData.toothSystem}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Patient Main Type (hchgCode) Row */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="hchgCode" className="form-label">
                Patient Main Type (hchgCode)
              </label>
              <select
                className="form-control"
                id="hchgCode"
                name="hchgCode"
                value={formData.headCharge.hchgCode}
                onChange={handlePatientTypeChange}
                required
              >
                <option value="">Select an option</option>
                {patientsMainTypeData.map((option) => (
                  <option key={option.hchgCode} value={option.hchgCode}>
                    {option.hchgCode}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-12">
              <label htmlFor="priceList" className="form-label">
                Patient Main Type (priceList)
              </label>
              <select
                className="form-control"
                id="pr"
                name="priceListCode"
                value={formData.priceList.priceListCode}
                onChange={handlePatientTypeChange}
                required
              >
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

          {!isEditMode && (
            <button type="submit" className="btn btn-primary">
              Create+
            </button>
          )}
          {isEditMode && (
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-success"
            >
              Update
            </button>
          )}
        </form>
        <CustomDataTable
          columns={subTypePatientColumn(handleUpdateData, handleDelete)}
          data={patientsSubTypeData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PatientSubType;
