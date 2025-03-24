import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FormContext } from "../Context/Context";

const BillRulesForm = () => {

    const {BASE_URL } = useContext(FormContext);
  // Initial state with default values
  const [formData, setFormData] = useState({
    srvAmtEditable: "",
    srvDiscountEditable: "",
    srvPaidEditable: ""
  });

  // Handle dropdown changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {  
      const response = await axios.post( `${BASE_URL}billRules/createOrUpdate` , formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Bill rules updated successfully!");
        console.log("Saved Record:", response.data);
      } else {
        alert("Failed to update bill rules. Please try again.");
      }
    } catch (error) {
      console.error("Error saving record:", error);
      alert("An error occurred while updating the bill rules.");
    }
  };


  return (
    <div className="container mt-4">
      <h2>Bill Rules</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-lg">
        {/* srvAmtEditable */}
        <div className="mb-3">
          <label className="form-label"><strong>srvAmtEditable (Y/N):</strong></label>
          <select
            className="form-control"
            name="srvAmtEditable"
            value={formData.srvAmtEditable}
            onChange={handleChange}
          >
             <option value="">Select On Option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        {/* Srv_discount_editable */}
        <div className="mb-3">
          <label className="form-label"><strong>srvDiscountEditable (Y/N):</strong></label>
          <select
            className="form-control"
            name="srvDiscountEditable"
            value={formData.srvDiscountEditable}
            onChange={handleChange}
          >  <option value="">Select On Option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label"><strong>srvPaidEditable (Y/N):</strong></label>
          <select
            className="form-control"
            name="srvPaidEditable"
            value={formData.srvPaidEditable}
            onChange={handleChange}
          >  <option value="">Select On Option</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
};

export default BillRulesForm;
