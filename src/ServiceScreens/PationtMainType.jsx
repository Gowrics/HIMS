import React, { useContext,  useState } from "react";
import { mainTypePatientColumn } from "../assets/ArrayData"; //arraydata
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm,  } from "../utils/Actions";
import { Link } from "react-router";
import DownloadExcel from "../utils/Export";
import ExportData from "../utils/Export";
import { RiContactsBookLine } from "react-icons/ri";
import ExportData1 from "../utils/Export1";
import { FormContext } from "../Context/Context";

const PationMainType = () => {

  const {patientsMainTypeData, setPatientMainTypeData, setValidtationMessage, BASE_URL, } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
     const [searchTerm, setSearchTerm] = useState("");
     const [alert, setAlert] = useState({ show: false, type: "", message: "" });

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
      
  };


  const handleDelete = (id) => {
        handleDeleteItem({
      id,
      url:`${BASE_URL}headcharge/delete`,
      setValidtationMessage,
      data: patientsMainTypeData,
      setAlert,
      setData: setPatientMainTypeData,
      itemKey: "hchgCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
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
  submitForm(url, formData, setPatientMainTypeData,setValidtationMessage,setAlert, clearForm);
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
      updateForm( url,id,updatedData, setPatientMainTypeData, setValidtationMessage,  setIsEditMode, false, clearForm ,setAlert);
      
  };
 

  return (
    <>
      <div className="container page-content ">

        <h2 className="mb-4">MAIN CLASSIFICATION OF PATIENT TYPE </h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

        <form   onSubmit={handleSubmit}>
 
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="hchgName" className="form-label">
                Hchg Name
              </label>
              <input
                type="text"
                 className="form-control" 
              // className={`form-control  ${formData.hchgName ? "" : "is-invalid"}`}
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
    <button type="button" onClick={() => {setIsEditMode(false); formData.hchgName=""}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)} </form>
        <h4> Patient type Data</h4>
        <input   type="text"    placeholder="Search hchgName"   value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}   className="form-control my-2"  />     
        <CustomDataTable
          columns={mainTypePatientColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filterData(patientsMainTypeData, searchTerm, ["hchgName","hchgCode"],)}
          onRowSelect={(selectedRows) => console.log("Selected Rows:", selectedRows)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        {/* <Link to="/export">Export</Link> */}
        <ExportData url={`${BASE_URL}headcharge/export`} fileName="Chg_grp_head" previewData={patientsMainTypeData}/>
     </div>
    </>
  );
};

export default PationMainType;


