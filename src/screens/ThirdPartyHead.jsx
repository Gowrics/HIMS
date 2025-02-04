import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { thirdPartyHeadDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
const ThirdPartyHead = () => {

  const {
    validtationMessage, setValidtationMessage, BASE_URL,
    thirdPartyHeadData, setThirdPartyHead, patientsSubTypeData, } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
  const [notEditMode, setNotEditMode] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
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
    if(name === "schgCode"){
          setFormData((prevData) => ({
      ...prevData,
      subcharge: {
        ...prevData.schgCode,
        [name]: value,
      },
    }));
  }else {
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
      tpaName:(formData.tpaName).trim()
    };

    console.log("Payload sent to API:", updatedFormData);
  const url = `${BASE_URL}tpahead/create`; // The URL for form submission
  submitForm(url, updatedFormData, setThirdPartyHead, setValidtationMessage, setShowModal, clearForm);
   
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
      tpaName:tpaName.trim(),
      tpaCode,
      active,
      subcharge: { schgCode },
    };
    console.log(formData);
    console.log(updatedData);
    const url = `${BASE_URL}tpahead/update`;
    const id =formData.tpaCode; // The URL for form submission
    updateForm( url,id,updatedData, setThirdPartyHead, setValidtationMessage,  setShowModal, setIsEditMode,  setNotEditMode, clearForm );

  };

  return (
    <>
      <div className="container page-content">
        <h2>THIRD PARTY AUDITORS FOR A SUB CLASSIFICATION PATIENT TYPE</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
           {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="tpaName" className="form-label">
                Tpa Name
              </label>
              <input  className="form-control" id="tpaName" name="tpaName"  value={formData.tpaName} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select   className="form-control"    id="active"   name="active"  value={formData.active} onChange={handleChange}  >
                 <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>

          {/* Patient Main Type (schgCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="schgCode" className="form-label">
                Patient Sub Type (schgCode)
              </label>
              <select
                className="form-control" id="schgCode" name="schgCode"  value={formData.subcharge.schgCode} onChange={handleChange}  required disabled={notEditMode}  >
                <option value="">Select an option</option>
                {patientsSubTypeData.map((option) => (
                  <option key={option.schgCode} value={option.schgCode}>
                    {option.schgCode}
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
              <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false); }} className=" ms-4 btn btn-secondary">
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
          columns={thirdPartyHeadDataColumn(handleUpdateData, handleDelete)}
          data={filterData(thirdPartyHeadData, searchTerm, ["tpaName","tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default ThirdPartyHead;



 // Submit form data to the API
    // axios
    //   .post("http://192.168.91.201:8082/tpahead/create", updatedFormData)
    //   .then((res) => {
    //     console.log("Form submitted successfully:", res.data);
    //     alert("Form Submitted Successfully..");
    //     clearForm();
    //     // Fetch the updated data from the API
    //     return axios.get("http://192.168.91.201:8082/tpahead/getAll");
    //   })
    //   .then((res) => {
    //     setThirdPartyHead(res.data); // Update the state with the new data
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 500) {
    //       setValidtationMessage("Tpa Name must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //   });
//-------------    
    // axios
    //   .put(
    //     `http://192.168.91.201:8082/tpahead/update/${formData.tpaCode}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/tpahead/getAll")
    //       .then((res) => {
    //         setThirdPartyHead(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //         clearForm();
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //    {
    //     if (err.response && err.response.status === 500) {
    //       setValidtationMessage("Tpa Name must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //    }
    //   );