
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
    name: "id",
    selector: (row) => row.id,
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


//----------------------------------------------invoice Data----------------------------------------------
export const serviceDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Service Code",
    selector: (row) => row.serviceMaster?.serviceCode || "N/A",
    sortable: true,
  },
  {
    name: "Quantity",
    selector: (row) => row.quantity || "0",
    sortable: true,
  },
  {
    name: "Service Amount",
    selector: (row) => row.serviceAmount || "0",
    sortable: true,
  },
  {
    name: "Service Discount",
    selector: (row) => row.serviceDiscount || "0",
    sortable: true,
  },
  {
    name: "Special Discount",
    selector: (row) => row.serviceSpecialDiscount || "0",
    sortable: true,
  },
  {
    name: "Service Paid",
    selector: (row) => row.servicePaid || "0",
    sortable: true,
  },
  {
    name: "Service Credit",
    selector: (row) => row.serviceCredid || "0",
    sortable: true,
  },
  {
    name: "Service Done",
    selector: (row) => row.serviceDone || "No",
    sortable: true,
  },
  {
    name: "Service Cancelled",
    selector: (row) => row.serviceCancelled || "No",
    sortable: true,
  },
  {
    name: "Return Number",
    selector: (row) => row.ReturnNumber || "-",
    sortable: true,
  },
  {
    name: "Return Quantity",
    selector: (row) => row.returnQuantity || "0",
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
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
