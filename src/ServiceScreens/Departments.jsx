import React, { useCallback, useContext, useState } from "react";
import Breadcrumbs from "../Component/BreadCrumbs";
import { departmentColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import { FormContext } from "../Context/Context";
import ExportData from "../utils/Export";
import withAuth from "../withAuth";
// import { departmentData } from "../assets/ArrayData";

const Departments = () => {
  const {
    departmentData, BASE_URL,  setValidtationMessage,  setDepartmentData,  } = useContext(FormContext);
     const [isEditMode, setIsEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    deptCode: 0,
    deptName: "", // Updated to deptName
    deptNameFl: "", // Updated to deptNameFl
    deptImage: "", // Updated to deptImg
    deptGeneral: "", // Default to "Y"
  }
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
        console.log(formData)
      const url = `${BASE_URL}department/create`; // The URL for form submission
      submitForm(url, formData, setDepartmentData, setValidtationMessage, setAlert, clearForm);
    
  };

  const handleUpdateData = (id) => {
    const itemToUpdate = departmentData.find((item) => item.deptCode === id);
    if (itemToUpdate) {
      setFormData({
        deptCode: itemToUpdate.deptCode,
        deptName: itemToUpdate.deptName,
        deptNameFl: itemToUpdate.deptNameFl,
        deptImage: itemToUpdate.deptImage,
        deptGeneral: itemToUpdate.deptGeneral,
        // id: itemToUpdate.id, // Add the id to form data for updating
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = () => {
    const { deptCode, deptName, deptNameFl, deptImage, deptGeneral } = formData;
    const updatedData = {
      deptCode,
      deptName,
      deptNameFl,
      deptImage,
      deptGeneral,
    };
    console.log(updatedData);
    const url = `${BASE_URL}department/update`;
    const id = formData.deptCode; // The URL for form submission
    updateForm(url, id, updatedData, setDepartmentData, setValidtationMessage,  setIsEditMode, false, clearForm,setAlert);

  };

  const handleDelete = useCallback((id) => {
      handleDeleteItem({
      id,
      url: `${BASE_URL}department/delete`,
      setValidtationMessage,
      data: departmentData,
      setAlert,
      setData: setDepartmentData,
      itemKey: "deptCode", // Key to identify the item in the dataset
    });
  },[BASE_URL, departmentData, setDepartmentData, setValidtationMessage]);


  return (
    <>
      <div className="container  page-content">
        <h2>Department Form</h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Dept Name */}
            <div className="col-md-3 mb-3">
              <label htmlFor="deptName" className="form-label">
                Department Name
              </label>
              <input type="text" className={`form-control `} id="deptName"
                name="deptName" value={formData.deptName} onChange={handleChange} required />
                        </div>

            {/* Dept Name (FL) */}
            <div className="col-md-3 mb-3">
              <label htmlFor="deptNameFl" className="form-label">
                Department Name (FL)
              </label>
              <input type="text" className={`form-control `} id="deptNameFl"
                name="deptNameFl" value={formData.deptNameFl} onChange={handleChange} required />
                       </div>
          </div>

          <div className="row">
            {/* Dept Img */}
            <div className="col-md-4 mb-3">
              <label htmlFor="deptImage" className="form-label">
                Department Image (URL)
              </label>
              <input type="url" className={`form-control`}
                id="deptImage" name="deptImage" value={formData.deptImage} onChange={handleChange} required />
                       </div>

            {/* Dept General */}
            <div className="col-md-4 mb-3">
              <label htmlFor="deptGeneral" className="form-label">
                Department General
              </label>
              <select className="form-control" id="deptGeneral" name="deptGeneral" value={formData.deptGeneral} onChange={handleChange}  >
                <option value="">Select an Option</option>
                <option value="YES">Yes</option>
                <option value="NO">No</option>
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
              <button type="button" onClick={() => { setIsEditMode(false);  clearForm(); }} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}
        </form>
        <h1>Department Data</h1>
        <input type="text" placeholder="Search department" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
        <CustomDataTable
          columns={departmentColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filterData(departmentData, searchTerm, ["deptName", "deptNameFl"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        <ExportData url={`${BASE_URL}department/export`} fileName="department" previewData={departmentData} />
      </div>
    </>
  );
};
export default withAuth( Departments);
