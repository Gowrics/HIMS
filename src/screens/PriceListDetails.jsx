import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
import {priceListDetailsColumn } from "../assets/ArrayData";
const PriceListDetails = () => {
  const {priceListData,  serviceMasterData, priceListDetailsData, setPriceListDeatilsData, validtationMessage, setValidtationMessage,BASE_URL, searchTerm, setSearchTerm,  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
    const [notEditMode, setNotEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
  const initialFormData = {
    grossAmt: "",
    discountAmt: "",
    covered: "",
    coPaymentPercent: "",
    coPaymentAmt: "",
    serviceMaster: {
      serviceCode: "",
    },
    priceList:{
      priceListCode:"",
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
      // Update serviceMaster
      setFormData((prevData) => ({
        ...prevData,
        serviceMaster: {
          ...prevData.serviceMaster,
          serviceCode: value,
        },
      }));
    } else if (name === "priceListCode") {
      // Update priceList
      setFormData((prevData) => ({
        ...prevData,
        priceList: {
          ...prevData.priceList,
          priceListCode: value,
        },
      }));
    } else {
      // Update top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setShowModal(false);
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
                  submitForm(url, updatedFormData, setPriceListDeatilsData, setValidtationMessage,setShowModal, clearForm);
   
    setIsEditMode(false)
  };
    const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/priceDetails/delete",
      data: priceListDetailsData,
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
        id:itemToUpdate.id,
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
                const ids =formData.id; // The URL for form submission
                updateForm( url,ids,updatedData, setPriceListDeatilsData, setValidtationMessage, setShowModal, setIsEditMode,  null, clearForm );

  };
  

  return (
    <>
      <div className="container page-content">
        <h2>HOLDS THE PRICES FOR EACH SERVICE CODE FOR A PRICE LIST (not update)</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
        <h6 className="m-0">{validtationMessage}</h6>
      </div>
      <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="grossAmt" className="form-label">
              Gross Amt
              </label>
              <input type="number" className="form-control" id="grossAmt" name="grossAmt" value={formData.grossAmt} onChange={handleChange}  required  ></input>
            </div>

            <div className="col-md-4">
            <label htmlFor="discountAmt" className="form-label">
            Discount Amt
              </label>
              <input  type="number" className="form-control" id="discountAmt"  name="discountAmt" value={formData.discountAmt} onChange={handleChange} required  ></input>
            </div>
            {/* TPA head Type (priceListCode) Row */}
              <div className="col-md-4">
                <label htmlFor="priceListCode" className="form-label">
                  Price List (priceListCode)
                </label>
                <select  className="form-control"    id="priceListCode"   name="priceListCode"   value={formData.priceList.priceListCode} onChange={handleChange} required disabled={notEditMode} >
                  <option value="">Select an option</option>
                  {priceListData.map((option) => (
                    <option key={option.priceListCode} value={option.priceListCode}>
                      {option.priceListCode}
                    </option>
                  ))}
                </select>
              </div>
          </div>

          {/* Patient Main Type (serviceCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="serviceCode" className="form-label">
                Service Master (serviceCode)
              </label>
               <select  className="form-control"  id="serviceCode"   name="serviceCode" value={formData.serviceMaster.serviceCode} onChange={handleChange} required  disabled={notEditMode}  >
                <option value="">Select an option</option>
                {serviceMasterData.map((option) => (
                  <option key={option.serviceCode} value={option.serviceCode}>
                    {option.serviceCode}
                  </option>
                ))}
              </select>
            
            </div>

            <div className="col-md-2">
              <label htmlFor="policyNo" className="form-label">
              Co Payment Percent
              </label>
              <input type="number"  className="form-control" id="coPaymentPercent"  min="1"  max="100" name="coPaymentPercent" value={formData.coPaymentPercent} onChange={handleChange} ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="coPaymentAmt" className="form-label">
              Co Payment Amt
              </label>
              <input  type="number" className="form-control" id="coPaymentAmt"  name="coPaymentAmt" value={formData.coPaymentAmt}  onChange={handleChange} />
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setShowModal(false); setNotEditMode(false);}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
  </form>
        <CustomDataTable
          columns={priceListDetailsColumn(handleUpdateData, handleDelete)}
          data={priceListDetailsData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PriceListDetails;



 // axios
    //   .post("http://192.168.91.201:8082/priceDetails/create", updatedFormData)
    //   .then(() => {
    //     alert("Form submitted successfully");
    //     clearForm();
  
    //     return axios.get("http://192.168.91.201:8082/priceDetails/getAll");
    //   })
    //   .then((response) => {
    //     setPriceListDeatilsData(response.data);
    //     setIsEditMode(false)
    //     clearForm();
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.error("Error details:", err.response?.data || err.message);
    //     alert(
    //       "Error submitting form: " +
    //         (err.response?.data?.message || "Check console for details")
    //     );
    //   });


        
    // axios
    //   .put(
    //     `http://192.168.91.201:8082/priceDetails/update/${formData.id}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
  
    //     // Fetch updated list after the update
    //     axios
    //       .get("http://192.168.91.201:8082/priceDetails/getAll")
    //       .then((res) => {
    //         // Clear form and reset the state
    //         clearForm();
    //         setPriceListDeatilsData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //                     setNotEditMode(false)
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     alert("The data is already present in another child table.", err)
    //   );