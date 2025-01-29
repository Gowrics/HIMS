import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const ReusableDataGrid = ({ columns, rows, pageSize = 5, checkboxSelection = false, onRowEditCommit }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        checkboxSelection={checkboxSelection}
        disableSelectionOnClick
        editMode="row"
        
        onRowEditCommit={onRowEditCommit}
      />
    </div>
  );
};

export default ReusableDataGrid;
