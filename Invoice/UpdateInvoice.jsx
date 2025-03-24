import React, { useContext, useEffect, useState } from "react";
import { FormContext, InvoiceContext } from "../Context/Context";
import { useParams } from "react-router";

const UpdateInvoice = () => {
  const { billNo } = useParams();
  const { invoiceData, setInvoiceData,handleChange,handleServiceChange } = useContext(InvoiceContext);

  // Load the invoice data based on billNo when component mounts
 
  // Handle Header Field Changes
  
  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Invoice Data:", invoiceData);

    // You can call an API to update the invoice in the backend here
  };

  // Prevent rendering if no invoice data is loaded yet
  if (!invoiceData || !invoiceData.patientBillingHeader) {
    return <div>Loading invoice data...</div>;
  }

  return (
    <div className="page-content">
      <h2>Update Invoice (Bill No: {billNo})</h2>
      <form onSubmit={handleSubmit}>
        <h3>Patient Details</h3>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patientDataMasterName"
          value={invoiceData.patientBillingHeader.patientDataMasterName || ""}
          onChange={(e) => handleChange(e, "patientDataMasterName")}
        />

        <label>Doctor Code:</label>
        <input
          type="text"
          name="doctorCode"
          value={invoiceData.patientBillingHeader.doctor?.doctorCode || ""}
          onChange={(e) => handleChange(e, "doctor", "doctorCode")}
        />

        <h3>Billing Details</h3>
        <label>Cash Paid:</label>
        <input
          type="text"
          name="cashPaid"
          value={invoiceData.patientBillingHeader.cashPaid || ""}
          onChange={(e) => handleChange(e, "cashPaid")}
        />

        <label>Card Paid:</label>
        <input
          type="text"
          name="cardPaid"
          value={invoiceData.patientBillingHeader.cardPaid || ""}
          onChange={(e) => handleChange(e, "cardPaid")}
        />

        <h3>Services</h3>
        {invoiceData.patientBillingDetails?.map((service, index) => (
          <div key={index}>
            <label>Service Name:</label>
            <input
              type="text"
              value={service.serviceMasterName || ""}
              onChange={(e) => handleServiceChange(e, index, "serviceMasterName")}
            />

            <label>Quantity:</label>
            <input
              type="number"
              value={service.quantity || ""}
              onChange={(e) => handleServiceChange(e, index, "quantity")}
            />

            <label>Amount:</label>
            <input
              type="number"
              value={service.serviceAmount || ""}
              onChange={(e) => handleServiceChange(e, index, "serviceAmount")}
            />
          </div>
        ))}

        <button type="submit">Update Invoice</button>
      </form>
    </div>
  );
};

export default UpdateInvoice;
