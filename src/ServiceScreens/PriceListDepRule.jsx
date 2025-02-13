import { useContext, useState } from "react";
import axios from "axios";
import {  priceListDepRuleDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm, useFetchData } from "../utils/Actions";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
const PriceListDepRule = () => {
  const { BASE_URL,setValidtationMessage,priceListDepRuleData,setPriceListDepRuleData  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
   const [alert, setAlert] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
     const [notEditMode, setNotEditMode] = useState(false);
    const initialFormData = {
    depRuleNo:"",
    depRuleName: "",
     };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };

   
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Payload sent to API:", formData);
               const url = `${BASE_URL}priceListDependency/create`; // The URL for form submission
                    submitForm(url, formData, setPriceListDepRuleData, setValidtationMessage,setAlert, clearForm);

  };  
 

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}priceListDependency/delete`,
      setValidtationMessage,
      data: priceListDepRuleData,
      setAlert,
      setData: setPriceListDepRuleData,
      itemKey: "depRuleNo", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
        const itemToUpdate = priceListDepRuleData.find(
      (item) => item.depRuleNo === id
    );
    if (itemToUpdate) {
      setFormData({
        depRuleNo:itemToUpdate.depRuleNo,
        depRuleName: itemToUpdate.depRuleName,
             
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
  const handleUpdate = () => {
    const {depRuleName ,depRuleNo} = formData;
    const updatedData = {
        depRuleName,depRuleNo
    };
    console.log(formData);
    console.log(updatedData);

        const url = `${BASE_URL}priceListDependency/update`;
                    const id =formData.depRuleNo; // The URL for form submission
                    updateForm( url,id,updatedData, setPriceListDepRuleData, setValidtationMessage, setIsEditMode,  setNotEditMode, clearForm,setAlert);
  };

  return (
    <div className="container page-content">
      <h2>Price List Dependency Rules</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
<form   onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">
            Dep Rule Name
            </label>
            <input  type="text"   className="form-control"  id="depRuleName"  name="depRuleName" value={formData.depRuleName} onChange={handleChange} required   ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="depRuleNo" className="form-label">
            Dep Rule No
            </label>
            <input  type="number"  className="form-control"  id="depRuleNo"  name="depRuleNo" value={formData.depRuleNo}  onChange={handleChange} required  disabled={notEditMode}   ></input>
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setNotEditMode(false);}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}

      </form>
      <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />

      <CustomDataTable
        columns={priceListDepRuleDataColumn(handleUpdateData, handleDelete)}
        data={filterData(priceListDepRuleData,searchTerm,["depRuleNo","depRuleName"])}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
          <ExportData url={`${BASE_URL}priceListDependency/export`}   fileName="Price_list_dependency_rules"   previewData={priceListDepRuleData} />

    </div>
  );
};

export default PriceListDepRule;

