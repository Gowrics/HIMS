import React, { useContext, useState } from "react";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext, InvoiceContext } from "../Context/Context";
import { packagesDetailsDataColumn } from "../utils/ArrayData1";
const PackageDetails = () => {

  const { setValidtationMessage, BASE_URL, serviceMasterData, } = useContext(FormContext);

  const { packagesMasterData,  packagesDetailsData, setPackagesDetailsData } = useContext(InvoiceContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    packageMaster: { packageCode: "" },
    serviceMaster: { serviceCode: "" },// From Services_master (Not Null)
    packageRate: 0, // Number (Not Null)
    packagePaymentPortion: 0, // Number (Not Null)
    packageCreditPortion: 0, // Number (Not Null)
  };



  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "serviceCode") {
      setFormData((prevData) => ({
        ...prevData,
        serviceMaster: {
          ...prevData.serviceMaster,
          serviceCode: value,
        },
      }));
    }
    else  if (name === "packageCode") {
      setFormData((prevData) => ({
        ...prevData,
        packageMaster: {
          ...prevData.packageMaster,
          packageCode: value,
        },
      }));
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the payload matches the API's expected format
    const updatedFormData = { ...formData, };

    console.log("Payload sent to API:", updatedFormData);
    const url = `http://localhost:8005/packagesDetailsData`; // The URL for form submission
    // const url = `${BASE_URL}packageDetails/create`; // The URL for form submission
    submitForm(url, updatedFormData, setPackagesDetailsData, setValidtationMessage, setAlert, clearForm);

  };
  const handleUpdateData = (id) => {
    setNotEditMode(true);
    
    const itemToUpdate = packagesDetailsData.find((item) => item.id === id);
  
    if (itemToUpdate) {
      setFormData({
        id:itemToUpdate.id,
        packageMaster: { packageCode: itemToUpdate.packageMaster.packageCode },
        serviceMaster: { serviceCode: itemToUpdate.serviceMaster.serviceCode },
        packageRate: itemToUpdate.packageRate,
        packagePaymentPortion: itemToUpdate.packagePaymentPortion,
        packageCreditPortion: itemToUpdate.packageCreditPortion,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
  
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `http://localhost:8005/packagesDetailsData`, setValidtationMessage, setAlert,
      // url: `${BASE_URL}packageDetails/delete`, setValidtationMessage, setAlert,
      data: packagesDetailsData,
      setData: setPackagesDetailsData,
      itemKey: "packageCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const updatedData = {
      id: formData.id,
      packageMaster: {
        packageCode: formData.packageMaster.packageCode
      },
      serviceMaster: {
        serviceCode: formData.serviceMaster.serviceCode
      },
      packageRate: formData.packageRate,
      packagePaymentPortion: formData.packagePaymentPortion,
      packageCreditPortion: formData.packageCreditPortion
    };
    
    console.log("Updated Payload:", updatedData);
  
    const url = `http://localhost:8005/packagesDetailsData`;
    updateForm(
      url,
      formData.id,
      updatedData,
      setPackagesDetailsData,
      setValidtationMessage,
      setIsEditMode,
      setNotEditMode,
      clearForm,
      setAlert
    );
  };
  

  return (
    <>
      <div className="container page-content">
        <h2>Package Details  </h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor='packageCode '>Package Code:</label>
              <CustomSelect
                id="packageCode"
                name="packageCode"
                valueKey="packageCode"   // Dynamic value key
                labelKey="packageName"
                data={packagesMasterData}  // Pass the raw data, no need to map
                value={formData.packageMaster.packageCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor='serviceCode'>Service  Code:</label>
              {/* <input type='text' className="form-control" id="drCode" name="drCode" value={invoiceData.docterMaster.drCode} onChange={handleChange} required /> */}
              <CustomSelect
                id="serviceCode"
                name="serviceCode"
                valueKey="serviceCode"   // Dynamic value key
                labelKey="serviceName"
                data={serviceMasterData}  // Pass the raw data, no need to map
                value={formData.serviceMaster.serviceCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="packageRate" className="form-label">    Package Rate   </label>
              <input type="number" className="form-control" id="packageRate" name="packageRate" value={formData.packageRate} onChange={handleChange} required />
            </div>
          </div>


          <div className="row mb-3">
                       <div className="col-md-4">
              <label htmlFor="packageCreditPortion" className="form-label">  Package Credit Portion  </label>
              <input type="number" className="form-control" id="packageCreditPortion" name="packageCreditPortion" value={formData.packageCreditPortion} onChange={handleChange} required />
            </div>
            <div className="col-md-4">
              <label htmlFor="packagePaymentPortion" className="form-label">     Package Payment Portion   </label>
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
          columns={packagesDetailsDataColumn(handleUpdateData, handleDelete)}
          data={filterData(packagesDetailsData, searchTerm, ["tpaName", "tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        <ExportData url={`${BASE_URL}tpahead/export`} fileName="TPA_head" previewData={packagesDetailsData} />
      </div>
    </>
  );
};

export default PackageDetails;

