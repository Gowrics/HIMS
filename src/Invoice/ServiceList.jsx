import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { InvoiceContext } from "../Context/Context";
import { CustomDataTable } from "../utils/Actions";
import { serviceDataColumn } from "../utils/ArrayData1";

const ServiceList = () => {
  const { invoiceData,serviceData,setInvoiceData } = useContext(InvoiceContext);
  console.log(invoiceData);

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Would you like to delete?");
    if (confirmDelete) {
      console.log("Attempting to delete the item at index:", index);

      // Create a new array without the deleted item
      const updatedPatientBillingDetails = invoiceData.patientBillingDetails.filter(
        (_, i) => i !== index
      );

      // Update the context with the modified patientBillingDetails
      setInvoiceData((prevData) => ({
        ...prevData,
        patientBillingDetails: updatedPatientBillingDetails,
      }));
    }
  };
  const handleUpdateData = (id) => {
    // Find the selected service data by ID
   console.log("updated")
  };
  

  return (
    <div>
        {/* <CustomDataTable
              columns={serviceDataColumn(handleUpdateData, handleDelete)}
           data={serviceData}
              // data={filterData(serv, searchTerm, ["patientCode", "patientName"],)}
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20]}
            /> */}
      <table className="table mt-5 border table-striped">
        <thead>
          <tr>
            <th scope="col">Service Code</th>
            <th scope="col">Quantity</th>
            <th scope="col">Service Amount</th>
            <th scope="col">Service Discount</th>
            <th scope="col">Service Special Discount</th>
            <th scope="col">Service Paid</th>
            <th scope="col">Service Credit</th>
            <th scope="col">Service Done</th>
            <th scope="col">Service Cancelled</th>
            <th scope="col">Return Number</th>
            <th scope="col">Return Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData.patientBillingDetails &&
          invoiceData.patientBillingDetails.length > 0 ? (
            invoiceData.patientBillingDetails.map((item, index) => (
              <tr key={index}>
                <td>{item.serviceCode}</td>
                <td>{item.quantity}</td>
                <td>{item.serviceAmount}</td>
                <td>{item.serviceDiscount}</td>
                <td>{item.serviceSpecialDiscount}</td>
                <td>{item.servicePaid}</td>
                <td>{item.serviceCredit}</td>
                <td>{item.serviceDone ? "Yes" : "No"}</td>
                <td>{item.serviceCancelled ? "Yes" : "No"}</td>
                <td>{item.returnNumber}</td>
                <td>{item.returnQuantity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/editItems/${index}`}
                    className="btn btn-sm btn-primary ms-2"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="text-center">
                No items available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceList;
