import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { serviceMasterColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
import { Link, Navigate, useNavigate } from "react-router";

const ServiceMaster = () => {
  const {
    setIsEditMode, isEditMode, serviceCategoryData, showModal, setShowModal, handleCloseModal,handleShowModal,
    serviceMasterData,cptCodesData,loincCodesData,setServiceMasterData,
  } = useContext(FormContext);
  const initialFormData = {
    serviceCode: "",
    serviceName: "",
    serviceNameAr: "",
    serviceCategoryCode: {serviceCategoryCode:""},
    serviceNotes: "",
    serviceFilt1: null,
    serviceFilt2: null,
    subscriptionTotalNoVisits: null,
    subscriptionVisitsPerMonth: null,
    active: null,
    subscriptionService: "",
    toothMandatory: "",
    cptCodes: {
      cptCode: "",
    },
    loincCodes1: {
      loincCode: "",
    },
    loincCodes2: {
      loincCode: "",
    },
  };
const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  useEffect(() => {
    fetchServiceMasterData();
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      clearForm();
    }
  }, [isEditMode]);

  const fetchServiceMasterData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/serviceMaster/getAll");
      setServiceMasterData(response.data);
    } catch (error) {
      console.error("Error fetching service master data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const updatedFormData = {
            ...formData,
                    subscriptionTotalNoVisits: Number(formData.subscriptionTotalNoVisits), // Convert subscriptionTotalNoVisits to a number
            subscriptionVisitsPerMonth: Number(formData.subscriptionVisitsPerMonth), // Convert subscriptionVisitsPerMonth to a number
            serviceCategoryCode: {
              ...formData.serviceCategoryCode,
              serviceCategoryCode: Number(formData.serviceCategoryCode.serviceCategoryCode), // Convert chargeCode to a number
            },
          
          };
      console.log("Form Data:", updatedFormData);
      const response = await axios.post(
        "http://192.168.91.201:8082/serviceMaster/create",
        formData
      );

      console.log("API Response:", response.data);
      alert("Service Master created successfully!");
      fetchServiceMasterData();
      clearForm();
    } catch (error) {
      console.error(
        "Error creating Service Master:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create Service Master. Please check the console for more details."
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   // Handle patientMainTypeData changes (for select input)
   const handlePatientTypeChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "serviceCategoryCode") {
      // Update serviceMaster
      setFormData((prevData) => ({
        ...prevData,
        serviceCategoryCode: {
          ...prevData.serviceCategoryCode,
          serviceCategoryCode: value,
        },
      }));
    } else if (name === "cptCode") {
      // Update cptCodes
      setFormData((prevData) => ({
        ...prevData,
        cptCodes: {
          ...prevData.cptCodes,
          cptCode: value,
        },
      }));
    } else if (name === "loincCodes1") {
      // Update loincCodes1
      setFormData((prevData) => ({
        ...prevData,
        loincCodes1: {
          ...prevData.loincCodes1,
          loincCode: value,
        },
      }));
    } else if (name === "loincCodes2") {
      // Update loincCodes2
      setFormData((prevData) => ({
        ...prevData,
        loincCodes2: {
          ...prevData.loincCodes2,
          loincCode: value,
        },
      }));
    } else {
      // Update top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
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
    console.log(id);
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
    };

    try {
      const response = await axios.put(
        `http://192.168.91.201:8082/serviceMaster/update/${serviceCode}`,
        updatedData
      );

      console.log("Updated successfully:", response.data);
      fetchServiceMasterData();
      clearForm();
      setShowModal(true);
    } catch (error) {
      console.error("Error updating Service Master:", error.response?.data || error.message);
      alert("The data is already present in another child table.");
    }
  };

  return (
    
        <div className="container page-content">
          <h2>SERVICE MASTER HANDLING</h2>
          <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="serviceCode" className="form-label">Service Code</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceCode"
                  name="serviceCode"
                  value={formData.serviceCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceName" className="form-label">Service Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
              <label htmlFor="serviceCategoryCode" className="form-label">
                serviceCategoryCode
              </label>
              <select
                className="form-control"
                id="serviceCategoryCode"
                name="serviceCategoryCode"
                value={formData.serviceCategoryCode.serviceCategoryCode}
                onChange={handlePatientTypeChange}
                required
              >
                <option value="">Select an option</option>
                {serviceCategoryData.map((option) => (
                  <option key={option.depRuleNO} value={option.serviceCategoryCode}>
                    {option.serviceCategoryCode}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="serviceNameAr" className="form-label">Service Name (Arabic)</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceNameAr"
                  name="serviceNameAr"
                  value={formData.serviceNameAr}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceNotes" className="form-label">Service Notes</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceNotes"
                  name="serviceNotes"
                  value={formData.serviceNotes}
                  onChange={handleChange}
                        />
              </div>
              <div className="col-md-4">
                <label htmlFor="serviceFilt1" className="form-label">Service Filter 1</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceFilt1"
                  name="serviceFilt1"
                  value={formData.serviceFilt1}
                  onChange={handleChange}
                              />
              </div>
            </div>
            <div className="row mb-3">
             
              <div className="col-md-4">
                <label htmlFor="serviceFilt2" className="form-label">Service Filter 2</label>
                <input
                  type="text"
                  className="form-control"
                  id="serviceFilt2"
                  name="serviceFilt2"
                  value={formData.serviceFilt2}
                  onChange={handleChange}
                 
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionTotalNoVisits" className="form-label">Subscription Total No. of Visits</label>
                <input
                  type="number"
                  className="form-control"
                  id="subscriptionTotalNoVisits"
                  name="subscriptionTotalNoVisits"
                  value={formData.subscriptionTotalNoVisits}
                  onChange={handleChange}
                                  />
              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionVisitsPerMonth" className="form-label">Subscription Visits Per Month</label>
                <input
                  type="number"
                  className="form-control"
                  id="subscriptionVisitsPerMonth"
                  name="subscriptionVisitsPerMonth"
                  value={formData.subscriptionVisitsPerMonth}
                  onChange={handleChange}
                      />
              </div>
            </div>
        
            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="active" className="form-label">Active</label>
                <select
                  className="form-control"
                  id="active"
                  name="active"
                  value={formData.active}
                  onChange={handleChange}
                  
                >
                     <option value="">Select an Option</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="subscriptionService" className="form-label">Subscription Service</label>
                <select
                  className="form-control"
                  id="subscriptionService"
                  name="subscriptionService"
                  value={formData.subscriptionService}
                  onChange={handleChange}
                  required
                > <option value="">Select an Option</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="toothMandatory" className="form-label">Tooth Mandatory</label>
                <select
                  className="form-control"
                  id="toothMandatory"
                  name="toothMandatory"
                  value={formData.toothMandatory}
                  onChange={handleChange}
                  required
                >
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
              <select
                className="form-control"
                id="cptCode"
                name="cptCode"
                value={formData.cptCodes.cptCode}
                onChange={handlePatientTypeChange}
              >
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
    <select
      className="form-control"
      id="loincCodes1"
      name="loincCodes1"
      value={formData.loincCodes1.loincCode}
      onChange={handlePatientTypeChange}
         >
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
    <select
      className="form-control"
      id="loincCodes2"
      name="loincCodes2"
      value={formData.loincCodes2.loincCode}
      onChange={handlePatientTypeChange}
          >
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
              <button type="submit" className="btn btn-primary">Create+</button>
            ) : (
              <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
            )}
              <button
                          type="button"
                          className="btn btn-primary ms-4"
                          onClick={handleShowModal}
                        >
                        Service Master Data
                        </button>
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
                <button
                  type="button"
                  className="btn-close btn-danger"
                  onClick={handleCloseModal}
                ></button>
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