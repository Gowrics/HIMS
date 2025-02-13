import React, { useContext, useState } from "react";
import axios from "axios";
import { priceDetailsDepRuleColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import { faL } from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";

const PriceDetailsDepRule = () => {
  const {
    priceDetailsDepRuleData, setPriceDetailsDepRuleData, BASE_URL, searchTerm, setSearchTerm,
    priceListDepRuleData, serviceMasterData, setValidtationMessage
  } = useContext(FormContext);

  const [isEditMode, setIsEditMode] = useState(false); 
  const [notEditMode, setNotEditMode] = useState(false);
  const [alert, setAlert] = useState(false);

  const initialFormData = {
    numberOfDays: null,
    serviceMaster: { serviceCode: "" },
    dependencyServiceCode: { serviceCode: "" },
    priceListDependency: { depRuleNo: null }
  };

  const [formData, setFormData] = useState(initialFormData);

  
  // Clear form data
  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
    setNotEditMode(false);
      };

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "serviceMaster") {
        return { ...prevData, serviceMaster: { serviceCode: value } };
      } else if (name === "depRuleNo") {
        return { ...prevData, priceListDependency: { depRuleNo: Number(value) || null } };
      } else if (name === "dependencyServiceCode") {
        return { ...prevData, dependencyServiceCode: { serviceCode: value } };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };


  // Handle form submission (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      numberOfDays: Number(formData.numberOfDays) || null,
      priceListDependency: {
        depRuleNo: formData.priceListDependency.depRuleNo 
          ? Number(formData.priceListDependency.depRuleNo) 
          : null,
      },
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}detailsDependency/create`;

    submitForm(url, updatedFormData, setPriceDetailsDepRuleData, setValidtationMessage,setAlert, clearForm);
  };

  // Handle data update
  const handleUpdateData = (id) => {
    setNotEditMode(true);
    const itemToUpdate = priceDetailsDepRuleData.find((item) => item.id === id);

    if (itemToUpdate) {
      setFormData({
        id: itemToUpdate.id,
        numberOfDays: itemToUpdate.numberOfDays,
        serviceMaster: { serviceCode: itemToUpdate.serviceMaster?.serviceCode || "" },
        dependencyServiceCode: { serviceCode: itemToUpdate.dependencyServiceCode?.serviceCode || "" },
        priceListDependency: { depRuleNo: itemToUpdate.priceListDependency?.depRuleNo || null },
      });
      setIsEditMode(true);
    } else {
      console.error("Item not found!");
    }
  };

  // Handle Update
  const handleUpdate = () => {
    const { id, numberOfDays, serviceMaster, dependencyServiceCode, priceListDependency } = formData;

    const updatedData = {
      id,
      numberOfDays,
      serviceMaster: { serviceCode: serviceMaster.serviceCode },
      dependencyServiceCode: { serviceCode: dependencyServiceCode.serviceCode },
      priceListDependency: { depRuleNo: priceListDependency.depRuleNo },
    };
     const url = `${BASE_URL}detailsDependency/update`;
           const ids =formData.id; // The URL for form submission
           updateForm( url,ids,updatedData, setPriceDetailsDepRuleData, setValidtationMessage, setIsEditMode,  setNotEditMode, clearForm,setAlert );
    };

  // Handle Delete
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}detailsDependency/delete`,
      setValidtationMessage,
      data: priceDetailsDepRuleData,
      setAlert,
      setData: setPriceDetailsDepRuleData,
      itemKey: "id",
    });
  };

  return (
    <div className="container page-content">
      <h2>Price List Details Dependency</h2>
      {alert.show && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}
      <form   onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="depRuleNo" className="form-label">Price List Detail Dep (depRuleNo)</label>
            <CustomSelect
              id="depRuleNo"
              name="depRuleNo"
               valueKey="depRuleNo"   // Dynamic value key
              labelKey="depRuleName"   
              data={priceListDepRuleData}  // Pass the raw data, no need to map
              value={formData.priceListDependency.depRuleNo}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
                    </div>
          <div className="col-md-4">
    <label htmlFor="numberOfDays" className="form-label">Number of Days</label>
    <input  type="number"  className="form-control" id="numberOfDays" name="numberOfDays"  value={formData.numberOfDays || ""} onChange={handleChange} required />
  </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="serviceMaster" className="form-label">Service Master (serviceCode)</label>
            <CustomSelect
              id="serviceMaster"
              name="serviceMaster"
               valueKey="serviceCode"   // Dynamic value key
              labelKey="serviceCode"   
              data={serviceMasterData}  // Pass the raw data, no need to map
              value={formData.serviceMaster.serviceCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
           
          </div>

          <div className="col-md-4">
            <label htmlFor="dependencyServiceCode" className="form-label">Dependency Service Code (serviceCode)</label>
            <CustomSelect
              id="dependencyServiceCode"
              name="dependencyServiceCode"
               valueKey="serviceCode"   // Dynamic value key
              labelKey="serviceName"   
              data={serviceMasterData}  // Pass the raw data, no need to map
              value={formData.dependencyServiceCode.serviceCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
           
          </div>
        </div>

        {!isEditMode ? (
          <button type="submit" className="btn btn-primary">Create+</button>
        ) : (
          <>
            <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
            <button type="button" onClick={clearForm} className="ms-4 btn btn-secondary">Cancel</button>
          </>
        )}
      </form>
      <input   type="text"   placeholder="Search hchgName"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}   className="form-control my-2"  />
      <CustomDataTable columns={priceDetailsDepRuleColumn(handleUpdateData, handleDelete)} data={filterData( priceDetailsDepRuleData,searchTerm,["id"])} paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15, 20]} />
      <ExportData url={`${BASE_URL}detailsDependency/export`}   fileName="Price_list_details_dependency"   previewData={priceDetailsDepRuleData} />

    </div>
  );
};

export default PriceDetailsDepRule;
