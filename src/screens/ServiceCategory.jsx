import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { serviceCategoryColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const ServiceCategory = () => {
  const {
    serviceCategoryData,
    setserviceCategoryData,
    setIsEditMode,
    isEditMode,
  } = useContext(FormContext);

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

  useEffect(() => {
    fetchServiceCategoryData();
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      clearForm();
    }
  }, [isEditMode]);

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

    try {
      const updatedFormData = { ...formData };

      console.log("Payload sent to API:", updatedFormData);

      const response = await axios.post(
        "http://192.168.91.201:8082/serviceCategory/create",
        updatedFormData
      );

      alert("Form submitted successfully");
      fetchServiceCategoryData();
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      alert(
        "Error submitting form: " +
          (err.response?.data?.message || "Check console for details")
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

    try {
      const response = await axios.put(
        `http://192.168.91.201:8082/serviceCategory/update/${serviceCategoryCode}`,
        updatedData
      );

      console.log("Updated successfully:", response.data);
      fetchServiceCategoryData();
      setIsEditMode(false);
        } catch (err) {
      alert("The data is already present in another child table.", err);
    }
  };

  return (
    <>
      <div className="container page-content">
        <h2>Service Category Management</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="serviceCategoryName" className="form-label">
                Service Category Name
              </label>
              <input
                type="text"
                className="form-control"
                id="serviceCategoryName"
                name="serviceCategoryName"
                value={formData.serviceCategoryName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="serviceFreeFollowup" className="form-label">
                Service Free Followup
              </label>
              <select
                className="form-control"
                id="serviceFreeFollowup"
                name="serviceFreeFollowup"
                value={formData.serviceFreeFollowup}
                onChange={handleChange}
              >
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
              <select
                className="form-control"
                id="serviceTypeCons"
                name="serviceTypeCons"
                value={formData.serviceTypeCons}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="serviceTypeFollowup" className="form-label">
                Service Type Followup
              </label>
              <select
                className="form-control"
                id="serviceTypeFollowup"
                name="serviceTypeFollowup"
                value={formData.serviceTypeFollowup}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
          </div>

          {/* Submit and Update Buttons */}
          {!isEditMode && (
            <button type="submit" className="btn btn-primary">
              Create+
            </button>
          )}
          {isEditMode && (
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-success"
            >
              Update
            </button>
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
