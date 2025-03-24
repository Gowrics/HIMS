import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export const patientDataMasterDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Patient Id",
    selector: (row) => row.patientCode,
    sortable: true,
  },
  {
    name: "Patient Name",
    selector: (row) => row.patientName,
    sortable: true,
  },
  {
    name: "Patient Name (FL)",
    selector: (row) => row.patientNameAr,
    sortable: true,
  },
  {
    name: "Patient Mobile Country Code ",
    selector: (row) => row.patientMobileCountryCode,
    sortable: true,
      },
  {
    name: "Patient Mobile No ",
    selector: (row) => row.patientMobileNo,
    sortable: true,
  },
  {
    name: "Nationality Code",
    selector: (row) => (row.nationalityCode?.nationalityCode),
    sortable: true,
  },
  {
    name: "Patient Date of Birth ",
    selector: (row) => row.patientDateOfBirth,
    sortable: true,
  },
  {
    name: "Country Id No ",
    selector: (row) => row.countryIdNo,
    sortable: true,
  },
  {
    name: "Passport No ",
    selector: (row) => row.passportNo,
    sortable: true,
  },
    {
    name: "Occupation ",
    selector: (row) => row.occupation,
    sortable: true,
  },
  {
    name: "Vip Patient",
    selector: (row) => row.vipPatient,
    sortable: true,
  },
  {
    name: "Active G",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Black Listed ",
    selector: (row) => row.blackListed,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.patientCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.patientCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
//---------------------------------------------

export const docTypeMasterDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "docTypeCode",
    selector: (row) => row.docTypeCode,
    sortable: true,
  },
  {
    name: "docTypeName ",
    selector: (row) => row.docTypeName ,
    sortable: true,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.docTypeCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.docTypeCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const patientRegDocsDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "regNo",
    selector: (row) => row.regNo,
    sortable: true,
  },
  {
    name: "patientDataMaster Code",
    selector: (row) => (row.patientDataMaster?.patientCode),
    sortable: true,
  },
  {
    name: "documentMaster Code",
    selector: (row) => (row.documentMaster?.docTypeCode),
    sortable: true,
  },
  {
    name: "docAttachment ",
    selector: (row) => row.docAttachment ,
    sortable: true,
  },
  {
    name: "expiryDate ",
    selector: (row) => row.expiryDate ,
    sortable: true,
  },
  {
    name: "default ",
    selector: (row) => row.default ,
    sortable: true,
  },
  {
    name: "passportLinkDoc ",
    selector: (row) => row.passportLinkDoc ,
    sortable: true,
  },
  
  {
    name: "countryIdDoc ",
    selector: (row) => row.passportLinkDoc ,
    sortable: true,
  },
  
  {
    name: "active ",
    selector: (row) => row.active ,
    sortable: true,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.regNo)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.regNo)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const patientChgDepDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "patientChargeCode",
    selector: (row) => row.patientChargeCode,
    sortable: true,
  },
  {
    name: "patientDataMaster Code",
    selector: (row) => (row.patientDataMaster?.patientCode),
    sortable: true,
  },
  {
    name: "policiesCharge Code",
    selector: (row) => (row.policiesCharge?.chargeCode),
    sortable: true,
  },
  {
    name: "cardAttachment ",
    selector: (row) => row.cardAttachment ,
    sortable: true,
  },
  {
    name: "cardExpiryDate ",
    selector: (row) => row.cardExpiryDate ,
    sortable: true,
  },
  {
    name: "default ",
    selector: (row) => row.default ,
    sortable: true,
  },  
  {
    name: "active ",
    selector: (row) => row.active ,
    sortable: true,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.patientChargeCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.patientChargeCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];



export const patientSystemNotesDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "notesAddedBy",
    selector: (row) => row.notesAddedBy,
    sortable: true,
  },
  {
    name: "notesAddedDatetime ",
    selector: (row) => row.notesAddedDatetime ,
    sortable: true,
  }, 
  {
    name: "active ",
    selector: (row) => row.active ,
    sortable: true,
  },
  
  {
    name: "patientCode Code",
    selector: (row) => (row.patientDataMaster?.patientCode),
    sortable: true,
  },
  
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.noteId)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.noteId)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


//----------------------------------------------invoice Data----------------------------------------------


// -------------------------------------------------------------------
export const packageMasterDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Package Code",
    selector: (row) => row.packageCode || "N/A",
    sortable: true,
  },
  {
    name: "Package Name",
    selector: (row) => row.packageName || "N/A",
    sortable: true,
  },
  {
    name: "Active Status",
    selector: (row) => row.packageActive || "No",
    sortable: true,
  },
  {
    name: "Start Date",
    selector: (row) => row.packageStDate || "-",
    sortable: true,
  },
  {
    name: "End Date",
    selector: (row) => row.packageEnDate || "-",
    sortable: true,
  },
  {
    name: "Package Rate",
    selector: (row) => row.packageRate || "0",
    sortable: true,
  },
  {
    name: "Payment Portion",
    selector: (row) => row.packagePaymentPortion || "0",
    sortable: true,
  },
  {
    name: "Credit Portion",
    selector: (row) => row.packageCreditPortion || "0",
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.packageCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.packageCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const invoiceColumns = (handleUpdateData, handleDelete) => [
  {
    name: "Bill No",
    selector: (row) => row.patientBillingHeader.billNo,
    sortable: true,
  },
  {
    name: "Patient Code",
    selector: (row) => row.patientBillingHeader.patientDataMaster.patientCode,
    sortable: true,
  },
  {
    name: "Patient Name",
    selector: (row) => row.patientBillingHeader.patientDataMasterName,
    sortable: true,
  },
  {
    name: "Doctor Code",
    selector: (row) => row.patientBillingHeader.doctor.doctorCode,
    sortable: true,
  },
  {
    name: "Charge Code",
    selector: (row) => row.patientBillingHeader.policiesCharge.chargeCode,
    sortable: true,
  },
  {
    name: "Created By",
    selector: (row) => row.patientBillingHeader.createdBy,
    sortable: true,
  },
  {
    name: "Cash Paid",
    selector: (row) => row.patientBillingHeader.cashPaid,
    sortable: true,
  },
  {
    name: "Card Paid",
    selector: (row) => row.patientBillingHeader.cardPaid,
    sortable: true,
  },
  {
    name: "Card No",
    selector: (row) => row.patientBillingHeader.cardNo,
    sortable: true,
  },
  {
    name: "Package Code",
    selector: (row) => row.patientBillingHeader.packageCode,
    sortable: true,
  },
  {
    name: "EMR No",
    selector: (row) => row.patientBillingHeader.emrNo,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.patientBillingHeader.patientDataMaster.patientCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.patientBillingHeader.patientDataMaster.patientCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const serviceColumns = (handleDelete) => [
  {
    name: "Sl No",
    selector: (row) => row.slNo,
    sortable: true,
  },
  {
    name: "Service Code",
    selector: (row) => row.serviceMaster.serviceCode,
    sortable: true,
  },
  {
    name: "Service Name",
    selector: (row) => row.serviceMasterName,
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.serviceAmount,
    sortable: true,
  },
  {
    name: "Discount",
    selector: (row) => row.serviceDiscount,
    sortable: true,
  },
  {
    name: "Paid",
    selector: (row) => row.servicePaid,
    sortable: true,
  },
  {
    name: "Credit",
    selector: (row) => row.serviceCredit,
    sortable: true,
  },
   
  {
    name: "Actions",
    cell: (row, index) => (
      <>
        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDelete(index)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </>
    ),
  },
];

export const packagesDetailsDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Package Code",
    selector: (row) => row.packageMaster?.packageCode || "N/A",
    sortable: true,
  },
  {
    name: "Service Code",
    selector: (row) => row.serviceMaster?.serviceCode || "N/A",
    sortable: true,
  },
  {
    name: "Package Rate (₹)",
    selector: (row) => row.packageRate || "0",
    sortable: true,
  },
  {
    name: "Payment Portion (₹)",
    selector: (row) => row.packagePaymentPortion || "0",
    sortable: true,
  },
  {
    name: "Credit Portion (₹)",
    selector: (row) => row.packageCreditPortion || "0",
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={() => handleUpdateData(row.id)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.id)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
