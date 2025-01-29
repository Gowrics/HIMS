import React, { useState, useEffect } from "react";
import axios from "axios";

const Empty = () => {
  const initialFormData = {
    policySubCode: 0,
    policiesCharge: { chargeCode: "" },
    active: "",
    maternityCovered: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [subPoliciesPatientData, setSubPoliciesPatientData] = useState([]);
  const [policiesSubPatientData, setPoliciesSubPatientData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchSubPoliciesPatientData();
    fetchPoliciesSubPatientData();
  }, []);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  const fetchSubPoliciesPatientData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/policySubCharge/getAll");
      setSubPoliciesPatientData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPoliciesSubPatientData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/policiesCharge/getAll");
      setPoliciesSubPatientData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        policiesCharge: {
          ...formData.policiesCharge,
          chargeCode: Number(formData.policiesCharge.chargeCode),
        },
        policySubCode: Number(formData.policySubCode),
      };

      const response = await axios.post("http://192.168.91.201:8082/policySubCharge/create", updatedFormData);
      alert("Form submitted successfully");
      fetchSubPoliciesPatientData();
      clearForm();
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      alert("Error submitting form: " + (err.response?.data?.message || "Check console for details"));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePatientTypeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      policiesCharge: { ...prevData.policiesCharge, [name]: value },
    }));
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.91.201:8082/policySubCharge/delete/${id}`);
      alert("Deleted successfully");
      fetchSubPoliciesPatientData();
    } catch (error) {
      console.error("Error deleting:", error.response?.data || error.message);
      alert("Failed to delete. Please check the console for more details.");
    }
  };

  const handleUpdateData = (id) => {
    const itemToUpdate = subPoliciesPatientData.find((item) => item.policySubCode === id);
    if (itemToUpdate) {
      setFormData({
        policySubCode: itemToUpdate.policySubCode,
        active: itemToUpdate.active,
        policiesCharge: { chargeCode: itemToUpdate.policiesCharge?.chargeCode || "" },
        maternityCovered: itemToUpdate.maternityCovered,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        ...formData,
        policiesCharge: { ...formData.policiesCharge, chargeCode: Number(formData.policiesCharge.chargeCode) },
        policySubCode: Number(formData.policySubCode),
      };

      const response = await axios.put(`http://192.168.91.201:8082/policySubCharge/update/${formData.policySubCode}`, updatedData);
      alert("Updated successfully");
      fetchSubPoliciesPatientData();
      setIsEditMode(false);
      clearForm();
    } catch (err) {
      console.error("Error updating:", err.response?.data || err.message);
      alert("Failed to update. Please check the console for more details.");
    }
  };

  return (
    <div className="container page-content">
      <h2>SUB POLICY TYPES UNDER A SUB CLASSIFIED PATIENT TYPE</h2>
      <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="policySubCode" className="form-label">Policy Sub Code</label>
            <input
              type="number"
              className="form-control"
              id="policySubCode"
              name="policySubCode"
              value={formData.policySubCode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="active" className="form-label">Active</label>
            <select
              className="form-control"
              id="active"
              name="active"
              value={formData.active}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="YES">Y</option>
              <option value="NO">N</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="chargeCode" className="form-label">Patient Sub Type (chargeCode)</label>
            <select
              className="form-control"
              id="chargeCode"
              name="chargeCode"
              value={formData.policiesCharge.chargeCode}
              onChange={handlePatientTypeChange}
              required
            >
              <option value="">Select an option</option>
              {policiesSubPatientData.map((option) => (
                <option key={option.chargeCode} value={option.chargeCode}>
                  {option.chargeCode}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="maternityCovered" className="form-label">Maternity Covered</label>
            <select
              className="form-control"
              id="maternityCovered"
              name="maternityCovered"
              value={formData.maternityCovered}
              onChange={handleChange}
              required
            >
              <option value="">Select an option</option>
              <option value="YES">Y</option>
              <option value="NO">N</option>
            </select>
          </div>
        </div>

        <div className="row mb-3">
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">Create+</button>
          ) : (
            <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
          )}
        </div>
      </form>

      <div className="mt-5">
        <h3>Sub Policies Patient Data</h3>
        <ul className="list-group">
          {subPoliciesPatientData.map((item) => (
            <li key={item.policySubCode} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Policy Sub Code: </strong>{item.policySubCode}
                <br />
                <strong>Charge Code: </strong>{item.policiesCharge.chargeCode}
                <br />
                <strong>Active: </strong>{item.active}
                <br />
                <strong>Maternity Covered: </strong>{item.maternityCovered}
              </div>
              <div>
                <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdateData(item.policySubCode)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.policySubCode)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Empty;
