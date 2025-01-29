import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { serviceMasterColumn } from "../assets/ArrayData";
import { FormContext } from "../FormContext";

const ServiceMasterTable = () => {
  const location = useLocation();
  const { handleUpdateData, handleDelete } = location.state || {};

  const { serviceMasterData } = useContext(FormContext);

  console.log("handleUpdateData:", handleUpdateData);
  console.log("handleDelete:", handleDelete);

  return (
    <div className="container page-content">
      <h2>PRICE LIST HANDLING</h2>
      <CustomDataTable
        columns={serviceMasterColumn(handleUpdateData, handleDelete)}
        data={serviceMasterData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default ServiceMasterTable;
