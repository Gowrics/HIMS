import { useContext, useState } from "react";
import axios from "axios";
import { priceListColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm, useFetchData } from "../utils/Actions";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";

const PriceList = () => {
  const {  priceListData, setPriceListData,BASE_URL, setValidtationMessage,} = useContext(FormContext);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const [isEditMode, setIsEditMode] = useState(false); 
   const [searchTerm, setSearchTerm] = useState("");
    const initialFormData = { priceListName: "", active: "" };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => setFormData(initialFormData);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      priceListName:(formData.priceListName).trim()
    };
          console.log("Payload sent to API:", updatedFormData);
           const url = `${BASE_URL}priceList/create`; // The URL for form submission
                submitForm(url, updatedFormData, setPriceListData, setValidtationMessage,setAlert, clearForm);
  };

  const handleDelete = (id) => {
     handleDeleteItem({
      id,
      url: `${BASE_URL}priceList/delete`,
setValidtationMessage,
      data: priceListData,
      setAlert,
      setData: setPriceListData,
      itemKey: "priceListCode",
    });
      };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = priceListData.find((item) => item.priceListCode === id);
    if (itemToUpdate) {
      setFormData({ priceListCode: itemToUpdate.priceListCode, active: itemToUpdate.active, priceListName: itemToUpdate.priceListName });
      setIsEditMode(true);
    } else console.log("Item not found!");
  };

  const handleUpdate = () => {
    const updatedData = { priceListCode: formData.priceListCode, priceListName: (formData.priceListName).trim(), active: formData.active };
    console.log(formData, updatedData);
  
        const url = `${BASE_URL}priceList/update`;
              const id =formData.priceListCode; // The URL for form submission
              updateForm( url,id,updatedData, setPriceListData, setValidtationMessage, setIsEditMode,  null, clearForm,setAlert);
    };

  return (
    <div className="container page-content">
      <h2>PRICE LIST HANDLING</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form   onSubmit={handleSubmit} >
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">Price List Name</label>
            <input type="text" className="form-control" id="priceListName" name="priceListName" value={formData.priceListName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="Active" className="form-label">Active</label>
            <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange} required>
              <option value="">Select an option</option>
              <option value="YES">Y</option>
              <option value="NO">N</option>
            </select>
          </div>
        </div>
        {!isEditMode ? (
  <button type="submit" className="btn btn-primary">Create+</button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
    <button type="button" onClick={() => { setIsEditMode(false);clearForm(); }} className="ms-4 btn btn-secondary">Cancel</button>
  </>
)}
 </form>
      <input   type="text"   placeholder="Search hchgName"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}   className="form-control my-2"  />
      <CustomDataTable columns={priceListColumn(handleUpdateData, handleDelete)} 
      data={filterData( priceListData,searchTerm,["priceListName","priceListCode"])} paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15, 20]} />
      <ExportData   url={`${BASE_URL}priceList/export`}   fileName="Price_ List"   previewData={priceListData} />
    </div>
  );
};

export default PriceList;

