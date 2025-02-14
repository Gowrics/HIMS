import React, { useCallback, useContext, useMemo, useState } from "react";
import { nationalityColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
import withAuth from "../withAuth";

const Nationality = () => {
  const { nationalityData, BASE_URL, setValidtationMessage, setNationalityData, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    nationality: "",
    nationalityFl: "",
    nationalityCode: 0,
  }
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };
  // const [errors, setErrors] = useState({
  //   nationality: false,
  //   nationalityFl: false,
  //   nationalityCode: false,
  // });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleDelete = useCallback((id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}nationality/delete`,
      setValidtationMessage,
      data: nationalityData,
      setAlert,
      setData: setNationalityData,
      itemKey: "nationalityCode",
    });
  }, [BASE_URL, nationalityData, setNationalityData, setValidtationMessage]);
  

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
    submitForm(url, formData, setNationalityData, setValidtationMessage, setAlert, clearForm);
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
    const id = formData.nationalityCode; // The URL for form submission
    updateForm(url, id, updatedData, setNationalityData, setValidtationMessage, setIsEditMode, false, clearForm,setAlert);
  };
  const filteredData = useMemo(() => 
    filterData(nationalityData, searchTerm, ["nationality"]),
  [nationalityData, searchTerm]);
  

  return (
    <>
      <div className="container page-content ">
        <h2 className="mb-4">Nationality Form</h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

        <form onSubmit={handleSubmit} >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nationality" className="form-label">     Nationality     </label>
              <input type="text" className={`form-control`} id="nationality"
                name="nationality" value={formData.nationality} onChange={handleChange} required />
              {/* {errors.nationality && (<div className="invalid-feedback">Nationality is required</div>)} */}
            </div>
            <div className="col mb-3">
              <label htmlFor="nationalityFl" className="form-label">      Nationality FL   </label>
              <input type="text" className={`form-control`} id="nationalityFl"
                name="nationalityFl" value={formData.nationalityFl} onChange={handleChange} required />
              {/* {errors.nationalityFl && (<div className="invalid-feedback">      Nationality FL is required  </div>)} */}
            </div>
          </div>
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary"> Create+</button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">    Update  </button>
              <button type="button" onClick={() => { setIsEditMode(false);  clearForm(); }} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}
        </form>
        <h1>Nationality Data</h1>
        <input type="text" placeholder="Search Nationality" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />

        <CustomDataTable
          columns={nationalityColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filteredData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />{" "}
        <ExportData url={`${BASE_URL}nationality/export`} fileName="nationality" previewData={nationalityData} />
      </div>
    </>
  );
};
export default withAuth( Nationality); 
