import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { loincCodesColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";

const LoincCodes = () => {
  const {
    setIsEditMode,   isEditMode,BASE_URL,
    loincCodesData,    setLoincCodesData,
    validtationMessage,setValidtationMessage,  } = useContext(FormContext);
    const [alert, setAlert] = useState(false);
     const [searchTerm, setSearchTerm] = useState("");
  const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    loincCode: "",
    loincName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("Payload sent to API:", formData);
        const url = `${BASE_URL}loincCodes/create`; // The URL for form submission
         submitForm(url, formData, setLoincCodesData, setValidtationMessage,setAlert, clearForm);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
      handleDeleteItem({
      id,
      url: `${BASE_URL}loincCodes/delete`,
      setValidtationMessage,
      data: loincCodesData,
      setAlert,
      setData: setLoincCodesData,
      itemKey: "loincCode",
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = loincCodesData.find((item) => item.loincCode === id);

    if (itemToUpdate) {
      setFormData({
        loincCode: itemToUpdate.loincCode,
        loincName: itemToUpdate.loincName,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const { loincCode, loincName } = formData;
    const updatedData = { loincCode, loincName };
    console.log(formData);
    console.log(updatedData);

  const url = `${BASE_URL}loincCodes/update`;
        const id =formData.loincCode; // The URL for form submission
        updateForm( url,id,formData, setLoincCodesData, setValidtationMessage, setIsEditMode,  setNotEditMode, clearForm,setAlert );

  };

  return (
    <div className="container page-content">
      <h2>LOINC CODES HANDLING</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
<form   onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="loincName" className="form-label">   LOINC Name     </label>
            <input    type="text"   className="form-control"   id="loincName" name="loincName"  value={formData.loincName} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="loincCode" className="form-label">     LOINC loincCode     </label>
            <input  type="text"   className="form-control"    id="loincCode"  name="loincCode"  value={formData.loincCode}   onChange={handleChange}  required    disabled={notEditMode}/>
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm();}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
      </form>
      <input  type="text"   placeholder="Search "    value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}  className="form-control my-2"  />  

      <CustomDataTable
        columns={loincCodesColumn(handleUpdateData, handleDelete)}
        data={filterData(loincCodesData,searchTerm,["loincCode","loincName"])}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
      <ExportData url={`${BASE_URL}loincCodes/export`}   fileName="Loinc_codes"   previewData={loincCodesData} />

    </div>
  );
};

export default LoincCodes;




