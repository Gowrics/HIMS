import logo from '../../assets/basilicon.jpeg';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router";
import { serviceColumns } from '../../utils/ArrayData1';
import { CustomDataTable, filterData, handleDeleteItem } from '../../utils/Actions';
import { AdvanceInvoiceContext, FormContext } from '../../Context/Context';
import { useContext, useEffect, useState } from 'react';
// Invoice Title Component
const InvoiceTitle = ({invoice}) => {
  const {    advanceInvoiceBillData,setAdvanceInvoiceBillData } = useContext(AdvanceInvoiceContext);
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
      data: advanceInvoiceBillData,
      setData: setAdvanceInvoiceBillData,
      itemKey: "advanceReceiptsHeader.receiptNo",
      setValidtationMessage: () => {},
      setAlert: () => {},
    });
    
    
  };
  return (
    <>
    <div className="row justify-content-between align-items-center text-center m-2">
      {/* Column 1: Company Info */}
      <div className="col-md-3 text-md-left text-center">
        <h5 className="mb-1">BasilHut Private Limited</h5>
        <address className="p-0 text-muted">123 Main Street, City, Country</address>
      </div>

      {/* Column 2: Title */}
      <div className="col-md-4 text-center">
        <h3>Advance Invoice Data</h3>
      </div>

      {/* Column 3: Links */}
      <div className="col-md-4 d-flex flex-row text-md-right text-center">
      <button type="button" className="btn btn-primary me-3 hide-on-print" title="Print" onClick={() => handlePrint(invoice.advanceReceiptsHeader.receiptNo)}>
              <i className="fas fa-print"></i>
            </button>

            <button type="button" className="btn btn-primary hide-on-print" title="Download" onClick={() => downloadPDF(invoice.advanceReceiptsHeader.receiptNo)}>
              <i className="fas fa-download"></i>
            </button>

            <button type="button" className="btn btn-danger me-3 ms-3 hide-on-print" title="Delete" onClick={() => handleDelete(invoice.advanceReceiptsHeader.receiptNo)}>
              <i className="fas fa-trash"></i>
            </button>
      </div>
    </div>
  </>

  );
};



// Invoice Header Components
const InvoiceHeader = ({ invoice }) => {
  return (
    <div className="header">
      <p><strong>Invoice:</strong>{invoice?.advanceReceiptsHeader?.receiptNo || "  N/A"}</p>
      <p><strong>Date:</strong> {invoice?.advanceReceiptsHeader?.receiptDate || "N/A"}</p>
      <p><strong>Time:</strong> {invoice?.advanceReceiptsHeader?.receiptTmStmp 
  ? new Date(invoice.advanceReceiptsHeader.receiptTmStmp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) 
  : "N/A"}
</p>

      <p><strong>Patient:</strong>
        {invoice?.advanceReceiptsHeader?.patientDataMasterName || "N/A"}
        {invoice?.advanceReceiptsHeader?.patientDataMasterNameAr
          ? ` (${invoice.advanceReceiptsHeader.patientDataMasterNameAr})`
          : ""}
      </p>

      <p><strong>Doctor Name:</strong> {invoice?.advanceReceiptsHeader?.doctor?.doctorCode || "N/A"}</p>
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
            <th>Price</th>
            <th>Discount</th>
            <th>Net Amount</th>
           
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{service?.serviceMaster?.serviceCode || "N/A"}</td>
              <td>{service?.serviceMasterName || "N/A"}</td>
              <td>${service?.serviceAmount || 0}</td>
              <td>${service?.serviceDiscount || 0}</td>
              <td>${(service?.serviceAmount -service?.serviceDiscount) || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Invoice Summary Component
const InvoiceSummary = ({ invoice }) => {

  const subtotal = invoice?.advanceReceiptsDetails?.reduce(
    (acc, service) => acc + (service?.serviceAmount || 0),
    0
  );
  const totalDiscount = invoice?.advanceReceiptsDetails?.reduce(
    (acc, service) => acc + (service?.serviceDiscount || 0),
    0
  );
  const totalNetAmount = subtotal - totalDiscount;  // ✅ Correct formula

  return (
    <div className="invoice-summary">
      <div>
        <h4>Invoice Summary</h4>
        <p><strong>Subtotal:</strong> ${subtotal}</p>
        <p><strong>Total Discount:</strong> ${totalDiscount}</p>
               <hr />
        <p><strong>Total Net Amount:</strong> ${totalNetAmount}</p>
        <hr />
      </div>
    </div>
  );
};

const AdvanceInvoiceList = () => {
  const {    advanceInvoiceBillData,setAdvanceInvoiceBillData } = useContext(AdvanceInvoiceContext);
  const { BASE_URL } = useContext(FormContext);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  useEffect(() => {
    setFilteredInvoices(filterData(advanceInvoiceBillData || [], searchTerm, ["advanceReceiptsHeader.receiptNo", "advanceReceiptsHeader.receiptDate", "advanceReceiptsHeader.patientDataMasterName"]));
  }, [searchTerm, advanceInvoiceBillData]);

  const handleUpdateData = (patientCode) => {
    console.log("Update clicked for Patient Code:", patientCode);
    // Here, you can open a modal, set a form state, or navigate to an edit page
    // Example: setSelectedPatientCode(patientCode);
  };

  
  const ExpandedComponent = ({ data, handleUpdateData, handleDelete, searchTerm }) => (
    <div className="p-3">
      <h5>Services</h5>
      <CustomDataTable
        columns={serviceColumns(handleUpdateData, handleDelete)} // Ensure serviceColumns is a function
        data={filterData(data?.advanceReceiptsDetails || [], searchTerm, [
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
      <input
        type="text"
        placeholder="Search by receipt No, receipt Date, Patient Code"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-2"
      />
      <div className="invoice-section">
        {filteredInvoices.map((invoice) => (
          <div key={invoice.advanceReceiptsHeader.receiptNo} id={`invoice-${invoice.advanceReceiptsHeader.receiptNo}`} className="invoice-card">

            {/* Invoice Title */}
            <InvoiceTitle invoice={invoice}/>

            <InvoiceHeader invoice={invoice} />
            <h4>Services:</h4>
            <InvoiceDetails services={invoice.advanceReceiptsDetails} />
            <InvoiceSummary invoice={invoice} />

            {/* Buttons for individual invoice */}
          
          



          </div>
        ))}
      </div>
    </div>
  );

};

export default AdvanceInvoiceList;
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
   data={filterData(advanceInvoiceBillData || [], searchTerm, ["advanceReceiptsHeader.receiptNo"])}

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