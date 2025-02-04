import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { serviceMasterColumn } from "../assets/ArrayData";
import { useNavigate } from "react-router";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const ServiceMaster = () => {
  const {serviceCategoryData, showModal,BASE_URL, setShowModal,setValidtationMessage,validtationMessage, handleCloseModal,handleShowModal,
    serviceMasterData,cptCodesData,loincCodesData,setServiceMasterData,
  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
      const [notEditMode, setNotEditMode] = useState(false);
         const [showModal1, setShowModal1] = useState(false);
    const initialFormData = {
      serviceCode: "",
      serviceName: "",
      serviceNameAr: "",
      serviceCategoryCode: { serviceCategoryCode: "" },
      serviceNotes: "",
      serviceFilt1: "",
      serviceFilt2: "",
      subscriptionTotalNoVisits: "",
      subscriptionVisitsPerMonth: "",
      active: "",
      subscriptionService: "",
      toothMandatory: "",
      cptCodes: { cptCode: "" },
      loincCodes1: { loincCode: "" },
      loincCodes2: { loincCode: "" },
    };
  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

// Handle changes for nested objects
const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "serviceCategoryCode") {
    setFormData((prevData) => ({
      ...prevData,
      serviceCategoryCode: {
        ...prevData.serviceCategoryCode,
        serviceCategoryCode: value ? Number(value) : null, // Convert to Number or null
      },
    }));
  } else if (name === "cptCode") {
    setFormData((prevData) => ({
      ...prevData,
      cptCodes: {
        ...prevData.cptCodes,
        cptCode: value !== "" ? value : null, // Convert empty string to null
      },
    }));
  } else if (name === "loincCodes1") {
    setFormData((prevData) => ({
      ...prevData,
      loincCodes1: {
        ...prevData.loincCodes1,
        loincCode: value !== "" ? value : null, // Convert empty string to null
      },
    }));
  } else if (name === "loincCodes2") {
    setFormData((prevData) => ({
      ...prevData,
      loincCodes2: {
        ...prevData.loincCodes2,
        loincCode: value !== "" ? value : null, // Convert empty string to null
      },
    }));
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value !== "" ? value : null,
    }));
    setShowModal1(false);
  }

};
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Original Form Data:", formData);

  const updatedFormData = {
      ...formData,
      subscriptionTotalNoVisits: formData.subscriptionTotalNoVisits ? Number(formData.subscriptionTotalNoVisits) : 0,
      subscriptionVisitsPerMonth: formData.subscriptionVisitsPerMonth ? Number(formData.subscriptionVisitsPerMonth) :0,
      serviceCategoryCode: {
          ...formData.serviceCategoryCode,
          serviceCategoryCode: formData.serviceCategoryCode.serviceCategoryCode ? Number(formData.serviceCategoryCode.serviceCategoryCode) : null,
      },
      active: formData.active || null,
      serviceFilt1: formData.serviceFilt1 || null,
      serviceFilt2: formData.serviceFilt2 || null,
      serviceNotes: formData.serviceNotes || null,
      serviceName:(formData.serviceName).trim(),
      loincCodes1: { loincCode: formData.loincCodes1.loincCode || null }, 
      loincCodes2: { loincCode: formData.loincCodes2.loincCode || null }, 
      cptCodes: { cptCode: formData.cptCodes.cptCode || null }, // Fixed issue here
  };

    console.log("Payload sent to API:", updatedFormData);
  const url = `${BASE_URL}serviceMaster/create`; // The URL for form submission
  submitForm(url, updatedFormData, setServiceMasterData, setValidtationMessage, setShowModal1, clearForm);
  setShowModal(true);

};

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/serviceMaster/delete",
      data: serviceMasterData,
      setData: setServiceMasterData,
      itemKey: "serviceCode",
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = serviceMasterData.find((item) => item.serviceCode === id);

    if (itemToUpdate) {
      setFormData({
        serviceCode: itemToUpdate.serviceCode,
        serviceName: itemToUpdate.serviceName,
        serviceNameAr: itemToUpdate.serviceNameAr,
        
        serviceCategoryCode: {
            serviceCategoryCode: itemToUpdate.serviceCategoryCode?.serviceCategoryCode || "",
          },
        serviceNotes: itemToUpdate.serviceNotes,
        serviceFilt1: itemToUpdate.serviceFilt1,
        serviceFilt2: itemToUpdate.serviceFilt2,
        subscriptionTotalNoVisits: itemToUpdate.subscriptionTotalNoVisits,
        subscriptionVisitsPerMonth: itemToUpdate.subscriptionVisitsPerMonth,
        active: itemToUpdate.active,
        subscriptionService: itemToUpdate.subscriptionService,
        toothMandatory: itemToUpdate.toothMandatory,
        
        cptCodes: {
            cptCode: itemToUpdate.cptCodes?.cptCode || "",
          },
          
          loincCodes2: {
            loincCode: itemToUpdate.loincCodes2?.loincCode || "",
          },
          
          loincCodes1: {
            loincCode: itemToUpdate.loincCodes1?.loincCode || "",
          },
        // cptCodes: itemToUpdate.cptCodes,
        // loincCodes1: itemToUpdate.loincCodes1,
        // loincCodes2: itemToUpdate.loincCodes2,
      });
      setIsEditMode(true);
      setShowModal(false);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const {
      serviceCode,
      serviceName,
      serviceNameAr,  
      serviceCategoryCode: { serviceCategoryCode },
      serviceNotes,
      serviceFilt1,
      serviceFilt2,
      subscriptionTotalNoVisits,
      subscriptionVisitsPerMonth,
      active,
      subscriptionService,
      toothMandatory,
      cptCodes: { cptCode },
      loincCodes1: { loincCode:loincCodes1 },
      loincCodes2: { loincCode:loincCodes2 },
    } = formData;

    const updatedData = {
      serviceCode,
      serviceName:serviceName.trim(),
      serviceNameAr,
      serviceCategoryCode: { serviceCategoryCode },
      serviceNotes,
      serviceFilt1,
      serviceFilt2,
      subscriptionTotalNoVisits,
      subscriptionVisitsPerMonth,
      active,
      subscriptionService,
      toothMandatory,
      cptCodes: { cptCode },
      loincCodes1: { loincCode:loincCodes1 },
      loincCodes2: { loincCode:loincCodes2 },
    };

            console.log("Updated Data:", updatedData);
        const url = `${BASE_URL}serviceMaster/update`;
            const id =formData.serviceCode; // The URL for form submission
              updateForm( url,id,updatedData, setServiceMasterData, setValidtationMessage,  setShowModal, setIsEditMode, setNotEditMode, clearForm );
    
  };

  return (
    
        <div className="container page-content">
          <h2>SERVICE MASTER HANDLING</h2>
          <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal1 ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
          
          <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="serviceCode" className="form-label">Service Code</label>
                <input    type="text"   className="form-control"    id="serviceCode"    name="serviceCode"   value={formData.serviceCode} onChange={handleChange}     required      />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceName" className="form-label">Service Name</label>
                <input  type="text" className="form-control"  id="serviceName"  name="serviceName"    value={formData.serviceName}     onChange={handleChange}  required          />
              </div>
              <div className="col-md-4">
              <label htmlFor="serviceCategoryCode" className="form-label">
                serviceCategoryCode
              </label>
              <select    className="form-control"    id="serviceCategoryCode"   name="serviceCategoryCode"   value={formData.serviceCategoryCode.serviceCategoryCode}
                onChange={handleChange}      required  disabled={notEditMode}        >
                <option value="">Select an option</option>
                {serviceCategoryData.map((option) => (
                  <option key={option.serviceCategoryCode} value={option.serviceCategoryCode}>
                    {option.serviceCategoryCode}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="serviceNameAr" className="form-label">Service Name (Arabic)</label>
                <input     type="text"  className="form-control"  id="serviceNameAr"  name="serviceNameAr" value={formData.serviceNameAr} onChange={handleChange} required  />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceNotes" className="form-label">Service Notes</label>
                <input    type="text" className="form-control"  id="serviceNotes"  name="serviceNotes" value={formData.serviceNotes} onChange={handleChange}      />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceFilt1" className="form-label">Service Filter 1</label>
                <input    type="text"  className="form-control"  id="serviceFilt1"   name="serviceFilt1"    value={formData.serviceFilt1}   onChange={handleChange}  />
              </div>
            </div>
            <div className="row mb-3">
             
              <div className="col-md-4">
                <label htmlFor="serviceFilt2" className="form-label">Service Filter 2</label>
                <input   type="text"  className="form-control" id="serviceFilt2" name="serviceFilt2" value={formData.serviceFilt2} onChange={handleChange}     />
              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionTotalNoVisits" className="form-label">Subscription Total No. of Visits</label>
                <input   type="number"  className="form-control"  id="subscriptionTotalNoVisits" name="subscriptionTotalNoVisits" value={formData.subscriptionTotalNoVisits}  
                   onChange={handleChange}   />

              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionVisitsPerMonth" className="form-label">Subscription Visits Per Month</label>
                <input type="number" className="form-control" id="subscriptionVisitsPerMonth" name="subscriptionVisitsPerMonth" value={formData.subscriptionVisitsPerMonth}onChange={handleChange} />
              </div>
            </div>
        
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="active" className="form-label"> Service Active</label>
                <select   className="form-control"   id="active"   name="active"  value={formData.active}  onChange={handleChange}     >
                  <option value="">Select an Option</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionService" className="form-label">Subscription Service</label>
                <select    className="form-control"    id="subscriptionService"  name="subscriptionService" value={formData.subscriptionService} onChange={handleChange} required     >
                   <option value="">Select an Option</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="toothMandatory" className="form-label">Tooth Mandatory</label>
                <select className="form-control" id="toothMandatory"  name="toothMandatory"  value={formData.toothMandatory} onChange={handleChange} required >
                     <option value="">Select an Option</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              
              <div className="col-md-4">
              <label htmlFor="cptCode" className="form-label">
              cptCode
              </label>
              <select className="form-control"   id="cptCode"  name="cptCode" value={formData.cptCodes.cptCode}  onChange={handleChange}  disabled={notEditMode} required   >
                <option value="">Select an option</option>
                {cptCodesData.map((option) => (
                  <option key={option.cptCode} value={option.cptCode}>
                    {option.cptCode}
                  </option>
                ))}
              </select>
            </div>          
            
  <div className="col-md-4">
    <label htmlFor="loincCodes1" className="form-label">Loinc Code 1</label>
    <select  className="form-control"  id="loincCodes1"  name="loincCodes1" value={formData.loincCodes1.loincCode} onChange={handleChange} disabled={notEditMode}  required   >
      <option value="">Select an option</option>
      {loincCodesData.map((option) => (
        <option key={option.loincCode} value={option.loincCode}>
          {option.loincCode}
        </option>
      ))}
    </select>
  </div>
  <div className="col-md-4">
    <label htmlFor="loincCodes2" className="form-label">Loinc Code 2</label>
    <select   className="form-control"  id="loincCodes2" name="loincCodes2"  value={formData.loincCodes2.loincCode} onChange={handleChange} disabled={notEditMode} required >
      <option value="">Select an option</option>
      {loincCodesData.map((option) => (
        <option key={option.loincCode} value={option.loincCode}>
          {option.loincCode}
        </option>

      ))}
    </select>
  </div>
</div>

{!isEditMode ? (
  <button type="submit" className="btn btn-primary">
    Create+
  </button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">  Update </button>
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setNotEditMode(false);setShowModal(false)}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
<button type="button" className="btn btn-primary ms-4" onClick={handleShowModal} > Service Master Data </button>
          </form>
        
              {/* Modal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title"> Service Master Data</h5>
                <button       type="button"  className="btn-close btn-danger"    onClick={handleCloseModal} ></button>
              </div>
              {/* Modal Body */}
              <div className="modal-body">
                <div className="table-responsive">
                  <h1>Docters Data</h1>
                 
                  <CustomDataTable
        columns={serviceMasterColumn(handleUpdateData, handleDelete)}
        data={serviceMasterData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
                </div>
              </div>
              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
};

export default ServiceMaster ;






  // axios.post("http://192.168.91.201:8082/serviceMaster/create", updatedFormData)
  //     .then((response) => {
  //         console.log("API Response:", response.data);
  //         alert("Service Master created successfully!");
  //         fetchServiceMasterData();
  //         clearForm();
  //     })
  //     .catch((error) => {
  //         console.error("Error creating Service Master:", error.response);
  //         alert("Failed to create Service Master. Please check the console for more details.");
  //     });

  // try {
  //   const response = await axios.put(
  //     `http://192.168.91.201:8082/serviceMaster/update/${serviceCode}`,
  //     updatedData
  //   );

  //   console.log("Updated successfully:", response.data);
  //   fetchServiceMasterData();
  //   clearForm();
  //   setShowModal(true);
  //   setIsEditMode(false); // Hide update form after successful update
  //   setNotEditMode(false)
  // } catch (error) {
  //   console.error("Error updating Service Master:", error.response?.data || error.message);
  //   alert("The data is already present in another child table.");
  // }