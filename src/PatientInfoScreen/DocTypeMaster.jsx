import React, { useContext,  useState } from "react";
import { mainTypePatientColumn } from "../assets/ArrayData"; //arraydata
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm,  } from "../utils/Actions";
import { Link } from "react-router";
import DownloadExcel from "../utils/Export";
import ExportData from "../utils/Export";
import { RiContactsBookLine } from "react-icons/ri";
import ExportData1 from "../utils/Export1";
import { FormContext } from "../Context/Context";
import { docTypeMasterDataColumn } from "../utils/ArrayData1";


const DocTypeMaster = () => {

  const {docTypeMasterData, setDocTypeMasterData,setValidtationMessage, BASE_URL, } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
     const [searchTerm, setSearchTerm] = useState("");
     const [alert, setAlert] = useState({ show: false, type: "", message: "" });

     const maxDocTypeCode = docTypeMasterData.length > 0 
     ? Math.max(...docTypeMasterData.map(doc => doc.docTypeCode)) 
     : 0;
   
   // Generate a new unique `docTypeCode`
   const newDocTypeCode = maxDocTypeCode + 1;
   
   
   console.log(newDocTypeCode);

const initialFormData ={
    docTypeCode: null,
  docTypeName: "",
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
      url:`${BASE_URL}documentMaster/delete`,
      setValidtationMessage,
      data: docTypeMasterData,
      setAlert,
      setData: setDocTypeMasterData,
      itemKey: "docTypeCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
        const itemToUpdate = docTypeMasterData.find(
      (item) => item.docTypeCode === id
    );

    if (itemToUpdate) {
      setFormData({
        docTypeName: itemToUpdate.docTypeName,
        docTypeCode: itemToUpdate.docTypeCode,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
 // Handle form submission
 const handleSubmit = (e) => {
  e.preventDefault();
 
  
  const url = `${BASE_URL}documentMaster/create`; // The URL for form submission
  submitForm(url, formData, setDocTypeMasterData,setValidtationMessage,setAlert, clearForm);
};


const handleUpdate = () => {
    const { docTypeName, docTypeCode } = formData;
        const updatedData = {
          docTypeName:(formData.docTypeName).trim(),
      docTypeCode,
    };
      console.log(updatedData);
      const url = `${BASE_URL}documentMaster/update`;
      const id =formData.docTypeCode; // The URL for form submission
      updateForm( url,id,updatedData, setDocTypeMasterData, setValidtationMessage,  setIsEditMode, false, clearForm ,setAlert);
      
  };
 

  return (
    <>
      <div className="container page-content ">

        <h2 className="mb-4">MAIN CLASSIFICATION OF Document TYPE </h2>
        {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

        <form   onSubmit={handleSubmit}>
 
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="docTypeCode" className="form-label">
              Document Type Code
              </label>
              <input
                type="text"
                 className="form-control" 
              // className={`form-control  ${formData.docTypeName ? "" : "is-invalid"}`}
                id="docTypeCode"
                name="docTypeCode"
                value={formData.docTypeCode}
                onChange={handleChange}
                required
                
              />
             
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="docTypeName" className="form-label">
              Document Type Name
              </label>
              <input
                type="text"
                 className="form-control" 
              // className={`form-control  ${formData.hchgName ? "" : "is-invalid"}`}
                id="docTypeName"
                name="docTypeName"
                value={formData.docTypeName}
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
    <button type="button" onClick={() => {setIsEditMode(false); formData.docTypeName=""}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)} </form>
        <h4> Patient type Data</h4>
        <input   type="text"    placeholder="Search docTypeName"   value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}   className="form-control my-2"  />     
         <CustomDataTable
          columns={docTypeMasterDataColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={docTypeMasterData}
          onRowSelect={(selectedRows) => console.log("Selected Rows:", selectedRows)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        /> 
        {/* <Link to="/export">Export</Link> */}
        <ExportData url={`${BASE_URL}documentMaster/export`} fileName="Chg_grp_head" previewData={docTypeMasterData}/>

       

      </div>
    </>
  );
};




export default DocTypeMaster
