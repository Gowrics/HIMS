import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { serviceCategoryColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const ServiceCategory = () => {
  const {
    serviceCategoryData, setserviceCategoryData,BASE_URL,validtationMessage,setValidtationMessage} = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false); 
   const [showModal, setShowModal] = useState(false);
  const initialFormData = {
    serviceCategoryCode: 0,
    serviceCategoryName: "",
    serviceTypeCons: "",
    serviceTypeFollowup: "",
    serviceFreeFollowup: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowModal(false);
  };
  const fetchServiceCategoryData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/serviceCategory/getAll");
      setserviceCategoryData(response.data);
      clearForm();
    } catch (error) {
      console.error("Error fetching service category data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

        const updatedFormData = { ...formData,
        serviceTypeCons:formData.serviceTypeCons||null,
        serviceFreeFollowup:formData.serviceFreeFollowup||null,
        serviceTypeFollowup:formData.serviceTypeFollowup||null,       };

        console.log("Payload sent to API:", updatedFormData);
        const url = `${BASE_URL}serviceCategory/create`; // The URL for form submission
                      submitForm(url, updatedFormData, setserviceCategoryData, setValidtationMessage,setShowModal, clearForm);
  };

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/serviceCategory/delete",
      data: serviceCategoryData,
      setData: setserviceCategoryData,
      itemKey: "serviceCategoryCode",
    });
  };

  const handleUpdateData = (id) => {
    const itemToUpdate = serviceCategoryData.find(
      (item) => item.serviceCategoryCode === id
    );

    if (itemToUpdate) {
      setFormData({
        serviceCategoryCode: itemToUpdate.serviceCategoryCode,
        serviceCategoryName: itemToUpdate.serviceCategoryName,
        serviceTypeCons: itemToUpdate.serviceTypeCons,
        serviceTypeFollowup: itemToUpdate.serviceTypeFollowup,
        serviceFreeFollowup: itemToUpdate.serviceFreeFollowup,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const {
      serviceCategoryCode,
      serviceCategoryName,
      serviceTypeCons,
      serviceTypeFollowup,
      serviceFreeFollowup,
    } = formData;

    const updatedData = {
      serviceCategoryCode,
      serviceCategoryName,
      serviceTypeCons,
      serviceTypeFollowup,
      serviceFreeFollowup,
    };
        console.log("Updated Data:", updatedData);
        const url = `${BASE_URL}serviceCategory/update`;
            const id =formData.serviceCategoryCode; // The URL for form submission
            updateForm( url,id,updatedData, setserviceCategoryData, setValidtationMessage,  setShowModal, setIsEditMode, null, clearForm );
  };

  return (
    <>
      <div className="container page-content">
        <h2>Service Category Management</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
        <h6 className="m-0">{validtationMessage}</h6>
      </div>
      <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="serviceCategoryName" className="form-label">
                Service Category Name
              </label>
              <input    type="text"    className="form-control" id="serviceCategoryName" name="serviceCategoryName"  value={formData.serviceCategoryName}  onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="serviceFreeFollowup" className="form-label">
                Service Free Followup
              </label>
              <select  className="form-control"  id="serviceFreeFollowup"  name="serviceFreeFollowup"  value={formData.serviceFreeFollowup}  onChange={handleChange}  >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="serviceTypeCons" className="form-label">
                Service Type Cons
              </label>
              <select   className="form-control"  id="serviceTypeCons"    name="serviceTypeCons"   value={formData.serviceTypeCons}  onChange={handleChange}   >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="serviceTypeFollowup" className="form-label">
                Service Type Followup
              </label>
              <select  className="form-control"   id="serviceTypeFollowup"   name="serviceTypeFollowup"  value={formData.serviceTypeFollowup} onChange={handleChange}  >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
          </div>

          {/* Submit and Update Buttons */}
          {!isEditMode ? (
  <button type="submit" className="btn btn-primary">
    Create+
  </button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">
      Update
    </button>
    <button type="button" onClick={() => {setIsEditMode(false);setShowModal(false);clearForm();}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
        </form>
        <CustomDataTable
          columns={serviceCategoryColumn(handleUpdateData, handleDelete)}
          data={serviceCategoryData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};
export default ServiceCategory;



 //   const response = await axios.post(
    //     "http://192.168.91.201:8082/serviceCategory/create",
    //     updatedFormData
    //   );

    //   alert("Form submitted successfully");
    //   fetchServiceCategoryData();
    // } catch (err) {
    //   console.error("Error details:", err.response?.data || err.message);
    //   alert(
    //     "Error submitting form: " +
    //       (err.response?.data?.message || "Check console for details")
    //   );
    // }

    
    // try {
    //   const response = await axios.put(
    //     `http://192.168.91.201:8082/serviceCategory/update/${serviceCategoryCode}`,
    //     updatedData
    //   );

    //   console.log("Updated successfully:", response.data);
    //   fetchServiceCategoryData();
    //   setIsEditMode(false);
    //     } catch (err) {
    //   alert("The data is already present in another child table.", err);
    // }