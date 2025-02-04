import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext, UserContext } from "../FormContext";
import { mainTypePatientColumn } from "../assets/ArrayData"; //arraydata
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm, useFetchData } from "../ReusableComponent/Actions";

const PationMainType = () => {

  const {patientsMainTypeData, setPatientMainTypeData,validtationMessage, setValidtationMessage ,BASE_URL, } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
     const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

const initialFormData ={
  // hchgCode: 0,
  hchgName: "",
}
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
        setShowModal(false);
  };

  useFetchData(
    "http://192.168.91.201:8082/headcharge/getAll",
    setPatientMainTypeData
  );

  console.log(patientsMainTypeData);

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url:`${BASE_URL}headcharge/delete`,
      setValidtationMessage,setShowModal,
      data: patientsMainTypeData,
      setData: setPatientMainTypeData,
      itemKey: "hchgCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = patientsMainTypeData.find(
      (item) => item.hchgCode === id
    );

    if (itemToUpdate) {
      setFormData({
        hchgName: itemToUpdate.hchgName,
        hchgCode: itemToUpdate.hchgCode,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
 // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault();
  const url = `${BASE_URL}headcharge/create`; // The URL for form submission
  submitForm(url, formData, setPatientMainTypeData, setValidtationMessage, setShowModal, clearForm);
};


const handleUpdate = () => {
    const { hchgName, hchgCode } = formData;
    const updatedData = {
      hchgName:(formData.hchgName).trim(),
      hchgCode,
    };
      console.log(updatedData);
      const url = `${BASE_URL}headcharge/update`;
      const id =formData.hchgCode; // The URL for form submission
      updateForm( url,id,updatedData, setPatientMainTypeData, setValidtationMessage,  setShowModal, setIsEditMode, false, clearForm );
      
  };

  return (
    <>
      <div className="container page-content ">

        <h2 className="mb-4">MAIN CLASSIFICATION OF PATIENT TYPE </h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>

        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
 
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="hchgName" className="form-label">
                Hchg Name
              </label>
              <input
                type="text"
                className={`form-control  ${formData.hchgName ? "is-invalid" : ""}`}
                id="hchgName"
                name="hchgName"
                value={formData.hchgName}
                onChange={handleChange}
                required
              />
             
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
    <button type="button" onClick={() => {setIsEditMode(false); setShowModal(false);formData.hchgName=""}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)} </form>
        <h4> Patient type Data</h4>
        <input
      type="text"
      placeholder="Search hchgName"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control my-2"
    />
       
        <CustomDataTable
          columns={mainTypePatientColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filterData(patientsMainTypeData, searchTerm, ["hchgName","hchgCode"],)}
          onRowSelect={(selectedRows) => console.log("Selected Rows:", selectedRows)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PationMainType;



    // axios
    //   .put(
    //      `${BASE_URL}headcharge/update/${formData.hchgCode}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get(`${BASE_URL}headcharge/getAll`)
    //       .then((res) => {
    //         setPatientMainTypeData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setFormData({
    //           hchgName: "",
    //         });
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     {
    //       if (err.response && err.response.status === 500) {
    //         setValidtationMessage("Hchg Name must be unique. This value already exists!"); // Custom message for 500 errors
    //         setShowModal(true);
    //       } else {
    //         console.log("Error submitting form:", err);
    //       }
    //     });