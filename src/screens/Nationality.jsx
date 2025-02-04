import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext, UserContext } from "../FormContext";
import Breadcrumbs from "../Component/BreadCrumbs";
import { nationalityColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const Nationality = () => {
  const {
    nationalityData,BASE_URL, searchTerm, setSearchTerm,setValidtationMessage,validtationMessage, setNationalityData, isEditMode,   setIsEditMode,  } = useContext(FormContext);
  
const initialFormData ={
  nationality: "",
  nationalityFl: "",
  nationalityCode: 0,
}
 const [formData, setFormData] = useState(initialFormData);
 const clearForm = () => {
  setFormData(initialFormData);
};
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({
    nationality: false,
    nationalityFl: false,
    nationalityCode: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowModal(false);
  };
  console.log(nationalityData);
  
    const handleDelete = (id) => {
      handleDeleteItem({
        id,
        url: `${BASE_URL}nationality/delete`,
        data: nationalityData,
        setData: setNationalityData,
        itemKey: "nationalityCode", // Key to identify the item in the dataset
      });
    };
  
  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = nationalityData.find(
      (item) => item.nationalityCode === id
    );

    if (itemToUpdate) {
      setFormData({
        nationality: itemToUpdate.nationality,
        nationalityFl: itemToUpdate.nationalityFl,
        nationalityCode: itemToUpdate.nationalityCode,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      console.log(formData)
           const url = `${BASE_URL}nationality/create`; // The URL for form submission
            submitForm(url, formData, setNationalityData, setValidtationMessage, setShowModal, clearForm);
      };

  const handleUpdate = async () => {
    const { nationality, nationalityFl, nationalityCode } = formData;
    const updatedData = {
      nationality,
      nationalityFl,
      nationalityCode,
    };
    console.log(updatedData);
    const url = `${BASE_URL}nationality/update`;
    const id =formData.nationalityCode; // The URL for form submission
    updateForm( url,id,updatedData, setNationalityData, setValidtationMessage,  setShowModal, setIsEditMode, false, clearForm );
    };
  
  return (
    <>
      <div className="container page-content ">
        <h2 className="mb-4">Nationality Form</h2>
       <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>

        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.nationality ? "is-invalid" : ""
                }`}
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
              {errors.nationality && (
                <div className="invalid-feedback">Nationality is required</div>
              )}
            </div>
            <div className="col mb-3">
              <label htmlFor="nationalityFl" className="form-label">
                Nationality FL
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.nationalityFl ? "is-invalid" : ""
                }`}
                id="nationalityFl"
                name="nationalityFl"
                value={formData.nationalityFl}
                onChange={handleChange}
                required
              />
              {errors.nationalityFl && (
                <div className="invalid-feedback">
                  Nationality FL is required
                </div>
              )}
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
    <button type="button" onClick={() => {setIsEditMode(false); setShowModal(false);clearForm();}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
        </form>
        <h1>Nationality Data</h1>
        <input
      type="text"
      placeholder="Search Nationality"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control my-2"
    />
        <CustomDataTable
          columns={nationalityColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filterData(nationalityData, searchTerm, ["nationality"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />{" "}
      </div>
    </>
  );
};
export default Nationality;
