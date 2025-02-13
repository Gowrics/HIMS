

export const patientDataMasterDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Department Code",
    selector: (row) => row.deptCode,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.deptName,
    sortable: true,
  },
  {
    name: "Department Name (FL)",
    selector: (row) => row.deptNameFl,
    sortable: true,
  },
  {
    name: ",Department Image",
    selector: (row) => row.deptImage,
    sortable: true,
    width:"500px"
  },
  {
    name: ",Department General",
    selector: (row) => row.deptGeneral,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.deptCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.deptCode)}
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