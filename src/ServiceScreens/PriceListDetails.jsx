import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import { priceListDetailsColumn } from "../assets/ArrayData";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
const PriceListDetails = () => {
  const { priceListData, serviceMasterData, priceListDetailsData,  setPriceListDeatilsData, setValidtationMessage, BASE_URL,  } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
  const [notEditMode, setNotEditMode] = useState(false);
  const [alert, setAlert] = useState(false);
  const initialFormData = {
    grossAmt: "",
    discountAmt: "",
    covered: "",
    coPaymentPercent: "",
    coPaymentAmt: "",
    serviceMaster: {
      serviceCode: "",
    },
    priceList: {
      priceListCode: "",
    }
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
    } else if (name === "priceListCode") {
      setFormData((prevData) => ({
        ...prevData,
        priceList: {
          ...prevData.priceList,
          priceListCode: value,
        },
      }));
    } else if (name === "discountAmt") {
      const discountPercent = prompt("Enter discount percentage:", "10"); // Ask user for discount %
  
      if (discountPercent !== null) { // Check if user didn't cancel
        const percentValue = parseFloat(discountPercent) || 0; // Convert to number
        const grossAmount = parseFloat(formData.grossAmt) || 0; // Get current gross amount
        const discountAmount = (grossAmount * percentValue) / 100; // Calculate discount
  
        setFormData((prevData) => ({
          ...prevData,
          discountAmt: discountAmount.toFixed(2), // Store calculated discount
        }));
      }
    } else if (name === "coPaymentPercent") {
      const grossAmount = parseFloat(formData.grossAmt) || 0; // Ensure grossAmt is valid
      const discountAmount = parseFloat(formData.discountAmt) || 0; // Ensure discountAmt is valid
      const coPaymentPercent = parseFloat(value) || 0; // Convert value to number
      const coPaymentAmt = ((grossAmount - discountAmount) * coPaymentPercent) / 100; // Calculate co-payment
  
      setFormData((prevData) => ({
        ...prevData,
        coPaymentPercent: value,
        coPaymentAmt: coPaymentAmt.toFixed(2), // Format to 2 decimal places
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      priceList: {
        ...formData.priceList,
        priceListCode: formData.priceList.priceListCode
          ? Number(formData.priceList.priceListCode)
          : null,
      },
      grossAmt: Number(formData.grossAmt),
      discountAmt: Number(formData.discountAmt),
      covered: formData.covered || null,
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}priceDetails/create`; // The URL for form submission
    submitForm(url, updatedFormData, setPriceListDeatilsData, setValidtationMessage, setAlert, clearForm);

    setIsEditMode(false)
  };
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}priceDetails/delete`,
      setValidtationMessage,
      data: priceListDetailsData,
      setAlert,
      setData: setPriceListDeatilsData,
      itemKey: "id", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)

    const itemToUpdate = priceListDetailsData.find(
      (item) => item.id === id
    );

    if (itemToUpdate) {
      setFormData({
        id: itemToUpdate.id,
        grossAmt: itemToUpdate.grossAmt,
        discountAmt: itemToUpdate.discountAmt,
        covered: itemToUpdate.covered,
        coPaymentAmt: itemToUpdate.coPaymentAmt,
        coPaymentPercent: itemToUpdate.coPaymentPercent,
        serviceMaster: {
          serviceCode: itemToUpdate.serviceMaster?.serviceCode || null
        },
        priceList: {
          priceListCode: itemToUpdate.priceList?.priceListCode || null,
        },
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = () => {
    const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);

    const {
      id,
      grossAmt,
      discountAmt,
      covered,
      coPaymentPercent,
      coPaymentAmt,
      serviceMaster,
      priceList,
      policiesCharge,  // Added this for consistency
    } = formData;

    const updatedData = {
      id: convertEmptyToNull(id),
      grossAmt: convertEmptyToNull(grossAmt),
      discountAmt: convertEmptyToNull(discountAmt),
      covered: convertEmptyToNull(covered),
      coPaymentPercent: convertEmptyToNull(coPaymentPercent),
      coPaymentAmt: convertEmptyToNull(coPaymentAmt),
      serviceMaster: { serviceCode: convertEmptyToNull(serviceMaster?.serviceCode) },
      priceList: { priceListCode: convertEmptyToNull(priceList?.priceListCode) },
      policiesCharge: { chargeCode: convertEmptyToNull(policiesCharge?.chargeCode) }, // Fixed consistency
    };

    console.log("Updated Data:", updatedData);
    const url = `${BASE_URL}priceDetails/update`;
    const ids = formData.id; // The URL for form submission
    updateForm(url, ids, updatedData, setPriceListDeatilsData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
  };


  return (
    <>
      <div className="container page-content">
        <h2>HOLDS THE PRICES FOR EACH SERVICE CODE FOR A PRICE LIST</h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit} >
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="grossAmt" className="form-label">
                Gross Amt
              </label>
              <input type="number" className="form-control" id="grossAmt" name="grossAmt" value={formData.grossAmt} onChange={handleChange} required  ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="discountAmt" className="form-label">
                Discount Amt (₹)
              </label>
              <input type="number" className="form-control" id="discountAmt" name="discountAmt" value={formData.discountAmt} onChange={handleChange} required  ></input>
            </div>
            {/* TPA head Type (priceListCode) Row */}
            <div className="col-md-4">
              <label htmlFor="priceListCode" className="form-label">
                Price List (priceListCode)
              </label>
              <CustomSelect
                id="priceListCode"
                name="priceListCode"
                valueKey="priceListCode"   // Dynamic value key
                labelKey="priceListName"
                data={priceListData}  // Pass the raw data, no need to map
                value={formData.priceList.priceListCode}
                onChange={handleChange}
                isDisabled={notEditMode}
                placeholder="Select an option"
              />

            </div>
          </div>

          {/* Patient Main Type (serviceCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="serviceCode" className="form-label">
                Service Master (serviceCode)
              </label>
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

            <div className="col-md-2">
              <label htmlFor="policyNo" className="form-label">
                Co Payment Percent (%)
              </label>
              <input type="number" className="form-control" id="coPaymentPercent" min="1" max="100" name="coPaymentPercent" value={formData.coPaymentPercent} onChange={handleChange} ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="coPaymentAmt" className="form-label">
                Co Payment Amt (₹)
              </label>
              <input type="number" className="form-control" id="coPaymentAmt" name="coPaymentAmt" value={formData.coPaymentAmt} onChange={handleChange} />
            </div>
            <div className="col-md-2">
              <label htmlFor="coverd" className="form-label">
                Coverd
              </label>
              <select
                className="form-control"
                id="covered"
                name="covered"
                value={formData.covered}
                onChange={handleChange}
              >
                <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
          </div>


          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">Create+</button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
              <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
            </>
          )}
        </form>
        <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />

        <CustomDataTable
          columns={priceListDetailsColumn(handleUpdateData, handleDelete)}
          data={filterData(priceListDetailsData, searchTerm, ["id"])}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
        <ExportData url={`${BASE_URL}priceDetails/export`} fileName="Price_list_details" previewData={priceListDetailsData} />
      </div>
    </>
  );
};

export default PriceListDetails;


