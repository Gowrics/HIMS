import React from "react";
import DataTable from "react-data-table-component";

const CustomDataTable = ({
  columns,
  data,
  pagination = true,
  paginationPerPage = 5,
  paginationRowsPerPageOptions = [5, 10, 15, 20],
  customStyles,
}) => {
  const defaultStyles = {
    header: {
      style: {
        backgroundColor: "#343a40",
        color: "#ffffff",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        backgroundColor: "#6c757d",
        color: "#ffffff",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };

  return (
    <DataTable
      className="table table-striped"
      columns={columns}
      data={data}
      pagination={pagination}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      customStyles={customStyles || defaultStyles}
    />
  );
};

export default CustomDataTable;
