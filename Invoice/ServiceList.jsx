import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InvoiceContext } from "../Context/Context";
import { CustomDataTable } from "../utils/Actions";
import { serviceColumns, serviceDataColumn } from "../utils/ArrayData1";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";


const ServiceList = () => {
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);


  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      console.log("Attempting to delete the item at index:", index);
  
      // Create a new array without the deleted item
      const updatedPatientBillingDetails = invoiceData.patientBillingDetails
        .filter((_, i) => i !== index)
        .map((item, index) => ({
          ...item,
          slNo: index + 1, // Reset serial number sequentially
        }));
  
      // Update the context with the modified patientBillingDetails
      setInvoiceData((prevData) => ({
        ...prevData,
        patientBillingDetails: updatedPatientBillingDetails,
      }));
    }
  };
  

  return (
    <div>
         <CustomDataTable
                columns={serviceColumns( handleDelete)}
                data={invoiceData.patientBillingDetails}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10, 15, 20]}  
              />
    </div>
  );
};

export default ServiceList;
