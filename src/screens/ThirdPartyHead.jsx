import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import {
  subTypePatientColumn,
  thirdPartyHeadDataColumn,
} from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
const ThirdPartyHead = () => {
 
  const {
    patientsMainTypeData,validtationMessage,setValidtationMessage, showModal, setShowModal,
    thirdPartyHeadData,
    setThirdPartyHead,
    patientsSubTypeData,
    setPatientsSubTypeData,
    setIsEditMode,
    isEditMode,
    searchTerm,
    setSearchTerm,
  } = useContext(FormContext);

  const initialFormData = {
    //tpaCode
    tpaName: "",
    active: null,
    subcharge: {
      schgCode: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateData = (id) => {
    console.log(id);
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
    setFormData((prevData) => ({
      ...prevData,
      subcharge: {
        ...prevData.subcharge,
        [name]: value,
      },
    }));
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
      subcharge: {
        ...formData.subcharge,
        schgCode: Number(formData.subcharge.schgCode), // Convert schgCode to a number
      },
    };
  
    console.log("Payload sent to API:", updatedFormData);
  
    // Submit form data to the API
    axios
      .post("http://192.168.91.201:8082/tpahead/create", updatedFormData)
      .then((res) => {
        console.log("Form submitted successfully:", res.data);
        alert("Form Submitted Successfully..");
  clearForm();
        // Fetch the updated data from the API
        return axios.get("http://192.168.91.201:8082/tpahead/getAll");
      })
      .then((res) => {
        setThirdPartyHead(res.data); // Update the state with the new data
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          setValidtationMessage("Tpa Name must be unique. This value already exists!"); // Custom message for 500 errors
          setShowModal(true);
        } else {
          console.log("Error submitting form:", err);
        }
      });
  };
  

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/tpahead/delete",
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
      tpaName,
      tpaCode,
      active,
      subcharge: { schgCode },
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/tpahead/update/${formData.tpaCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/tpahead/getAll")
          .then((res) => {
            setThirdPartyHead(res.data);
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
        <h2>THIRD PARTY AUDITORS FOR A SUB CLASSIFICATION PATIENT TYPE</h2>
        <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="tpaName" className="form-label">
                tpaName Name
              </label>
              <input
                className="form-control"
                id="tpaName"
                name="tpaName"
                value={formData.tpaName}
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

          {/* Patient Main Type (schgCode) Row */}
          <div className="row mb-3">
            <div className="col-md-12">
              <label htmlFor="schgCode" className="form-label">
                Patient Main Type (schgCode)
              </label>
              <select
                className="form-control"
                id="schgCode"
                name="schgCode"
                value={formData.subcharge.schgCode}
                onChange={handlePatientTypeChange}
                required
              >
                <option value="">Select an option</option>
                {patientsSubTypeData.map((option) => (
                  <option key={option.schgCode} value={option.schgCode}>
                    {option.schgCode}
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
          columns={thirdPartyHeadDataColumn(handleUpdateData, handleDelete)}
          data={thirdPartyHeadData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default ThirdPartyHead;
