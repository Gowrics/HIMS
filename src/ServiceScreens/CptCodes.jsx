import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { cptCodesColumn, priceListColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";

const CptCodes = () => {
  const {
    setIsEditMode, isEditMode,
    cptCodesData,   setCptCodesData,BASE_URL,
    validtationMessage,setValidtationMessage,
  } = useContext(FormContext);
   const [searchTerm, setSearchTerm] = useState("");
   const [alert, setAlert] = useState({ show: false, type: "", message: "" });
     const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    cptCode: "",
    cptName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     console.log("Payload sent to API:", formData);
          const url = `${BASE_URL}cptCodes/create`; // The URL for form submission
           submitForm(url, formData, setCptCodesData, setValidtationMessage, setAlert, clearForm);
   
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
      url: `${BASE_URL}cptCodes/delete`,
      setValidtationMessage,
      data: cptCodesData,
      setAlert,
      setData: setCptCodesData,
      itemKey: "cptCode",
   
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = cptCodesData.find((item) => item.cptCode === id);

    if (itemToUpdate) {
      setFormData({
        cptCode: itemToUpdate.cptCode,
        cptName: itemToUpdate.cptName,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const { cptCode, cptName } = formData;
    const updatedData = { cptCode, cptName };
 console.log(formData);
    console.log(updatedData);

  const url = `${BASE_URL}cptCodes/update`;
        const id =formData.cptCode; // The URL for form submission
        updateForm( url,id,formData, setCptCodesData, setValidtationMessage, setIsEditMode,  setNotEditMode, clearForm ,setAlert);

  };

  return (
    <div className="container page-content">
      <h2>CPT CODES HANDLING</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
<form   onSubmit={handleSubmit}  >
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Name
            </label>
            <input type="text"  className="form-control"  id="cptName"  name="cptName"  value={formData.cptName}  onChange={handleChange}  required    />
          </div>
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Code
            </label>
            <input    type="text"   className="form-control"    id="cptCode"   name="cptCode"  value={formData.cptCode}  onChange={handleChange}    required  disabled={notEditMode}   />
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
        columns={cptCodesColumn(handleUpdateData, handleDelete)}
        data={filterData(cptCodesData,searchTerm,["cptCode","cptName"])}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
                        <ExportData url={`${BASE_URL}cptCodes/export`}   fileName="Cpt_codes"   previewData={cptCodesData} />

    </div>
  );
};

export default CptCodes;


