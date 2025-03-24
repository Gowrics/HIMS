import React, { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { thirdPartyHeadDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext, InvoiceContext } from "../Context/Context";
import { packageMasterDataColumn } from "../utils/ArrayData1";
const PackageMaster = () => {

  const { setValidtationMessage, BASE_URL, thirdPartyHeadData, setThirdPartyHead, patientsSubTypeData, } = useContext(FormContext);

  const { packagesMasterData, setPackagesMasterData } = useContext(InvoiceContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    packageCode: "", // Primary Key
    packageName: "",
    packageActive: "", // Y/N
    packageStDate: "", // Date
    packageEnDate: "", // Date
    packageRate: 0, // Number (Not Null)
    packagePaymentPortion: 0, // Number (Not Null)
    packageCreditPortion: 0, // Assuming it's also a number
  };


  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));


  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the payload matches the API's expected format
    const updatedFormData = { ...formData, };

    console.log("Payload sent to API:", updatedFormData);
    const url = `http://localhost:8005/packagesMasterData`; // The URL for form submission
    submitForm(url, updatedFormData, setPackagesMasterData, setValidtationMessage, setAlert, clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = packagesMasterData.find((item) => item.packageCode === id);

    if (itemToUpdate) {
      setFormData({
        packageCode: itemToUpdate.packageCode,
        packageName: itemToUpdate.packageName,
        packageActive: itemToUpdate.packageActive,
        packageCreditPortion: itemToUpdate.packageCreditPortion,
        packageEnDate: itemToUpdate.packageEnDate,
        packageStDate: itemToUpdate.packageStDate,
        packagePaymentPortion: itemToUpdate.packagePaymentPortion,
        packageRate: itemToUpdate.packageRate
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}packageMaster/delete`, setValidtationMessage, setAlert,
      data: packagesMasterData,
      setData: setPackagesMasterData,
      itemKey: "packageCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {

    const { packageCode, packageName, packageActive, packageStDate, packageEnDate, packageCreditPortion, packagePaymentPortion, packageRate } = formData;
    const updatedData = { packageCode, packageName, packageActive, packageStDate, packageEnDate, packageCreditPortion, packagePaymentPortion, packageRate };
    console.log(formData);
    console.log(updatedData);
    const url = `${BASE_URL}packagemaster/update`;
    const id = formData.packageCode; // The URL for form submission
    updateForm(url, id, updatedData, setPackagesMasterData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);

  };

  return (
    <>
      <div className="container page-content">
        <h2>Package Master  </h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="packageName" className="form-label">
                Package Name
              </label>
              <input className="form-control" id="packageName" name="packageName" value={formData.packageName} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label htmlFor="packageActive" className="form-label">
                Package Active
              </label>
              <select className="form-control" id="packageActive" name="packageActive" value={formData.packageActive} onChange={handleChange}  >
                <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="packageRate" className="form-label">    Package Rate   </label>
              <input type="number" className="form-control" id="packageRate" name="packageRate" value={formData.packageRate} onChange={handleChange} required />
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="packageStDate" className="form-label">  Package Start Date  </label>
              <input type="date" className="form-control" id="packageStDate" name="packageStDate" value={formData.packageStDate} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="packageEnDate" className="form-label">    Package End Date   </label>
              <input type="date" className="form-control" id="packageEnDate" name="packageEnDate" value={formData.packageEnDate} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="packageCreditPortion" className="form-label">  Package Credit Portion  </label>
              <input type="number" className="form-control" id="packageCreditPortion" name="packageCreditPortion" value={formData.packageCreditPortion} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="packagePaymentPortion" className="form-label">   Package Payment Portion   </label>
              <input type="number" className="form-control" id="packagePaymentPortion" name="packagePaymentPortion" value={formData.packagePaymentPortion} onChange={handleChange} required />
            </div>
          </div>  
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">      Create+         </button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">     Update        </button>
              <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">    Cancel       </button>
            </>
          )}
        </form>

         <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
        <CustomDataTable
          columns={packageMasterDataColumn(handleUpdateData, handleDelete)}
          data={filterData(packagesMasterData, searchTerm, ["tpaName", "tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        {/* <ExportData url={`${BASE_URL}tpahead/export`} fileName="TPA_head" previewData={patientsSubTypeData} /> */}
      </div>
    </>
  );
};

export default PackageMaster;

