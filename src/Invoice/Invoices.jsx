import React, { useContext, useEffect, useState } from "react";
import { AdvanceInvoiceContext, FormContext, InvoiceContext } from "../Context/Context";
import { CustomDataTable, filterData, handleDeleteItem } from "../utils/Actions";
import { invoiceColumns, serviceColumns } from "../utils/ArrayData1";
import logo from '../assets/basilicon.jpeg';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FormProvider } from "../Context/FormProvider";
import { Link } from "react-router";
// Invoice Title Component
const InvoiceTitle = ({ invoice }) => {

  const { invoiceBillData, setInvoiceBillData } = useContext(AdvanceInvoiceContext);
  const { BASE_URL } = useContext(FormContext);
  const downloadPDF = (index) => {
    const invoiceElement = document.getElementById(`invoice-${index}`);
    if (!invoiceElement) {
      console.error("Invoice section not found.");
      return;
    }

    // Hide print/download buttons before capturing
    const buttons = invoiceElement.querySelectorAll(".hide-on-print");
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(invoiceElement, { scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${index + 1}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      })
      .finally(() => {
        // Show buttons again after download
        buttons.forEach((btn) => (btn.style.display = "block"));
      });
  };
  const handlePrint = (index) => {
    const invoiceElement = document.getElementById(`invoice-${index}`);
    if (!invoiceElement) {
      console.error("Invoice section not found.");
      return;
    }

    const originalContent = document.body.innerHTML;
    const invoiceContent = invoiceElement.innerHTML;

    document.body.innerHTML = invoiceContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Refresh after print
  };


  const handleDelete = (id) => {

    handleDeleteItem({
      id,
      url: `${BASE_URL}patientBilling/delete`,
      data: invoiceBillData,
      setData: setInvoiceBillData,
      itemKey: "patientBillingHeader.billNo",
      setValidtationMessage: () => { },
      setAlert: () => { },
    });


  };

  return (
    <>
      <div className="row justify-content-between align-items-center text-center m-2">
        {/* Column 1: Company Info */}
        {/* <div className="col-md-3 text-md-left text-center">
          <h5 className="mb-1">BasilHut Private Limited</h5>
          <address className="p-0 text-muted">123 Main Street, City, Country</address>
        </div>

        {/* Column 2: Title */}
        {/* <div className="col-md-4 text-center">
          <h3> Invoice Data</h3>
        </div>

        {/* Column 3: Links */}
        {/* <div className="col-md-4 d-flex flex-row text-md-right text-center">
        <button type="button" className="btn btn-primary me-3 hide-on-print" title="Print" onClick={() => handlePrint(invoice.patientBillingHeader.billNo)}>
              <i className="fas fa-print"></i>
            </button>

            <button type="button" className="btn btn-primary hide-on-print" title="Download" onClick={() => downloadPDF(invoice.patientBillingHeader.billNo)}>
              <i className="fas fa-download"></i>
            </button>
            
            <button type="button" className="btn btn-danger me-3 ms-3 hide-on-print" title="Delete" onClick={() => handleDelete(invoice.patientBillingHeader.billNo)}>
              <i className="fas fa-trash"></i>
            </button>
        </div>  */}
      </div>
    </>
  );
};



// Invoice Header Components
const InvoiceHeader = ({ invoice }) => {

  const { invoiceBillData, setInvoiceBillData } = useContext(AdvanceInvoiceContext);
  const { BASE_URL } = useContext(FormContext);
  const downloadPDF = (index) => {
    const invoiceElement = document.getElementById(`invoice-${index}`);
    if (!invoiceElement) {
      console.error("Invoice section not found.");
      return;
    }

    // Hide print/download buttons before capturing
    const buttons = invoiceElement.querySelectorAll(".hide-on-print");
    buttons.forEach((btn) => (btn.style.display = "none"));

    html2canvas(invoiceElement, { scale: 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.5);
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`invoice_${index + 1}.pdf`);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      })
      .finally(() => {
        // Show buttons again after download
        buttons.forEach((btn) => (btn.style.display = "block"));
      });
  };
  const handlePrint = (index) => {
    const invoiceElement = document.getElementById(`invoice-${index}`);
    if (!invoiceElement) {
      console.error("Invoice section not found.");
      return;
    }

    const originalContent = document.body.innerHTML;
    const invoiceContent = invoiceElement.innerHTML;

    document.body.innerHTML = invoiceContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Refresh after print
  };


  const handleDelete = (id) => {

    handleDeleteItem({
      id,
      url: `${BASE_URL}patientBilling/delete`,
      data: invoiceBillData,
      setData: setInvoiceBillData,
      itemKey: "patientBillingHeader.billNo",
      setValidtationMessage: () => { },
      setAlert: () => { },
    });


  };

  return (
    <div className="header">
      <p><strong>Invoice:</strong>{invoice?.patientBillingHeader?.billNo || "  N/A"}</p>
      <p><strong>Date:</strong> {invoice?.patientBillingHeader?.billDate || "N/A"}</p>
      {/* <p><strong>Time:</strong> {invoice?.patientBillingHeader?.billTmStmp || "N/A"}</p> */}


      <p><strong>Time:</strong> {invoice?.patientBillingHeader?.billTmStmp 
  ? new Date(invoice.patientBillingHeader.billTmStmp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) 
  : "N/A"}
</p>
      
      <p><strong>Patient:</strong>
        {invoice?.patientBillingHeader?.patientDataMasterName || "N/A"}
        {invoice?.patientBillingHeader?.patientDataMasterNameAr
          ? ` (${invoice.patientBillingHeader.patientDataMasterNameAr})`
          : ""}
      </p>

      <p><strong>Doctor Name:</strong> {invoice?.patientBillingHeader?.doctor?.doctorCode || "N/A"}</p>
      <div className=" d-flex flex-row text-md-right text-center">
        <button type="button" className="btn text-primary me-3 hide-on-print" title="Print" onClick={() => handlePrint(invoice.patientBillingHeader.billNo)}>
          <i className="fas fa-print"></i>
        </button>

        <button type="button" className="btn text-primary hide-on-print" title="Download" onClick={() => downloadPDF(invoice.patientBillingHeader.billNo)}>
          <i className="fas fa-download"></i>
        </button>

        <button type="button" className="btn text-danger me-3 ms-3 hide-on-print" title="Delete" onClick={() => handleDelete(invoice.patientBillingHeader.billNo)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

// Invoice Details (Service Table)
const InvoiceDetails = ({ services }) => {
  if (!services || services.length === 0) {
    return <p>No services found for this invoice.</p>;
  }


  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Service Code</th>
            <th>Service Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Paid Amount</th>
            <th>Credit</th>
            <th>Service Done</th>
            <th>Service Comments</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{service?.serviceMaster?.serviceCode || "N/A"}</td>
              <td>{service?.serviceMasterName || "N/A"}</td>
              <td>${service?.quantity || 0}</td>
              <td>${service?.serviceAmount || 0}</td>
              <td>${service?.serviceDiscount || 0}</td>
              <td>${service?.servicePaid || 0}</td>
              <td>${service?.serviceCredit || 0}</td>
              <td>{service?.serviceDone || 0}</td>
              <td>{service?.serviceComment1 || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Invoice Summary Component
const InvoiceSummary = ({ invoice }) => {

  const subtotal = invoice?.patientBillingDetails?.reduce(
    (acc, service) => acc + (service?.serviceAmount || 0),
    0
  );
  const totalDiscount = invoice?.patientBillingDetails?.reduce(
    (acc, service) => acc + (service?.serviceDiscount || 0),
    0
  );
  const totalPaid = invoice?.patientBillingDetails?.reduce(
    (acc, service) => acc + (service?.servicePaid || 0),
    0
  );
  const totalCredit = invoice?.patientBillingDetails?.reduce(
    (acc, service) => acc + (service?.serviceCredit || 0),
    0
  );

  return (
    <div className="invoice-summary">
      <div>
        <h4>Invoice Summary</h4>
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Total Discount:</strong> ${totalDiscount}</p>
        <p><strong>Total Credit:</strong> ${totalCredit}</p>
        <hr />
        <p><strong>Total Paid:</strong> ${totalPaid}</p>
        <hr />
      </div>
    </div>
  );
};

const InvoiceList = () => {
  const { invoiceBillData, setInvoiceBillData } = useContext(AdvanceInvoiceContext);
  console.log(invoiceBillData)

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  useEffect(() => {
    setFilteredInvoices(filterData(invoiceBillData || [], searchTerm, ["patientBillingHeader.billNo", "patientBillingHeader.billDate", "patientBillingHeader.patientDataMasterName"]));
  }, [searchTerm, invoiceBillData]);


  const ExpandedComponent = ({ data, handleUpdateData, handleDelete, searchTerm }) => (
    <div className="p-3">
      <h5>Services</h5>
      <CustomDataTable
        columns={serviceColumns(handleUpdateData, handleDelete)} // Ensure serviceColumns is a function
        data={filterData(data?.patientBillingDetails || [], searchTerm, [
          "serviceMaster.serviceCode", // Correct property names
          "serviceMasterName",
          "serviceAmount",
        ])}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );


  return (
    <div className="page-content">
      <div className="d-flex justify-content-center align-item-center text-center">
        <h3>Patient Invoice Data</h3>
      </div>
      <input
        type="text"
        placeholder="Search by Bill No, Bill Date, Patient Code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-2"
      />
      <div className="invoice-section">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.patientBillingHeader.billNo} id={`invoice-${invoice.patientBillingHeader.billNo}`} className="invoice-card">

            {/* Invoice Title */}
            <InvoiceTitle invoice={invoice} />

            <InvoiceHeader invoice={invoice} />
            <h4>Services:</h4>
            <InvoiceDetails services={invoice.patientBillingDetails} />
            <InvoiceSummary invoice={invoice} />

            {/* Buttons for individual invoice */}
            {/* <button type="button" className="btn btn-primary me-3 hide-on-print" title="Print" onClick={() => handlePrint(invoice.patientBillingHeader.billNo)}>
              <i className="fas fa-print"></i>
            </button>

            <button type="button" className="btn btn-primary hide-on-print" title="Download" onClick={() => downloadPDF(invoice.patientBillingHeader.billNo)}>
              <i className="fas fa-download"></i>
            </button> */}

          </div>
        ))}
      </div>

      {/* <div>
 <input
   type="text"
   placeholder="Search by Bill No"
   value={searchTerm}
   onChange={(e) => setSearchTerm(e.target.value)}
   className="form-control my-2"
 /> 
{/* Invoice Table */ }
      {/* <CustomDataTable
   columns={invoiceColumns( handleDelete)}
   data={filterData(invoiceBillData || [], searchTerm, ["patientBillingHeader.billNo","patientBillingHeader.billDate","patientBillingHeader.patientName"])}

   paginationPerPage={5}
   paginationRowsPerPageOptions={[5, 10, 15, 20]}
   expandableRows={true} // Enable expandable rows
   expandableComponent={({ data }) => (
     <ExpandedComponent
       data={data}
       handleUpdateData={handleUpdateData}
       handleDelete={handleDelete}
       searchTerm={searchTerm}
     />
   )}
 /> 
 </div> */}


    </div>
  );

};

export default InvoiceList;
{/*----------------------------------------- */ }




//  <div>
{/* <input
   type="text"
   placeholder="Search by Bill No"
   value={searchTerm}
   onChange={(e) => setSearchTerm(e.target.value)}
   className="form-control my-2"
 /> */}
{/* Invoice Table */ }
{/* <CustomDataTable
   columns={invoiceColumns( handleDelete)}
   data={filterData(invoiceBillData || [], searchTerm, ["patientBillingHeader.billNo"])}

   paginationPerPage={5}
   paginationRowsPerPageOptions={[5, 10, 15, 20]}
   expandableRows={true} // Enable expandable rows
   expandableComponent={({ data }) => (
     <ExpandedComponent
       data={data}
       handleUpdateData={handleUpdateData}
       handleDelete={handleDelete}
       searchTerm={searchTerm}
     />
   )}
 /> */}
// </div>

{/*----------------------------------------- */ }