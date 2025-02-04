import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import {coPaymentCoverageDataColumn} from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const CoPaymentCoverage = () => {
  const {
    policiesSubPatientData, subPoliciesPatientData,BASE_URL,
    coPaymentCoverageData,setCoPaymentCoverageData,
    serviceCategoryData, setPoliciesSubPatient, validtationMessage, setValidtationMessage,
    searchTerm,setSearchTerm,
  } = useContext(FormContext);
   const [isEditMode, setIsEditMode] = useState(false); 
     const [showModal, setShowModal] = useState(false);
      const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    // policyCopayId: 0,
    covered: "",
    coPaymentPercent: "",
    coPaymentAmt: "",
    policiesCharge: {
      chargeCode: "",
    },
    policySubCharge: {
      policySubCode: "",
    },
    serviceCategory: {
      serviceCategoryCode: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "chargeCode") {
      // Update policiesCharge
      setFormData((prevData) => ({
        ...prevData,
        policiesCharge: {
          ...prevData.policiesCharge,
          chargeCode: value,
        },
      }));
    } else if (name === "policySubCode") {
      // Update policySubCharge
      setFormData((prevData) => ({
        ...prevData,
        policySubCharge: {
          ...prevData.policySubCharge,
          policySubCode: value,
        },
      }));
    } else if (name === "serviceCategoryCode") {
      // Update policySubCharge
      setFormData((prevData) => ({
        ...prevData,
        serviceCategory: {
          ...prevData.serviceCategory,
          serviceCategoryCode: value,
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
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

          const updatedFormData = {
        ...formData,
        policiesCharge: {
          ...formData.policiesCharge,
          chargeCode: Number(formData.policiesCharge.chargeCode),
        },
        policySubCharge: {
          ...formData.policySubCharge,
          policySubCode: Number(formData.policySubCharge.policySubCode),
        },
        serviceCategory: {
          ...formData.serviceCategory,
          serviceCategoryCode: Number(
            formData.serviceCategory.serviceCategoryCode
          ),
        },
        coPaymentPercent:Number(formData.coPaymentPercent)||null,
        coPaymentAmt:Number(formData.coPaymentAmt)||null,
        covered:formData.covered||null
      }
        
            console.log("Payload sent to API:", updatedFormData);
       const url = `${BASE_URL}policySubCopay/create`; // The URL for form submission
            submitForm(url, updatedFormData, setCoPaymentCoverageData, setValidtationMessage,setShowModal, clearForm);

  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = coPaymentCoverageData.find(
      (item) => item.policyCopayId === id
    );

    if (itemToUpdate) {
      setFormData({
        policyCopayId: itemToUpdate.policyCopayId,
        coPaymentAmt: itemToUpdate.coPaymentAmt,
        coPaymentPercent: itemToUpdate.coPaymentPercent,
        covered: itemToUpdate.covered,
      
        policiesCharge: {
          chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
        },
        policySubCharge: {
          policySubCode: itemToUpdate.policySubCharge?.policySubCode || null,
        },
        serviceCategory: {
          serviceCategoryCode:
            itemToUpdate.serviceCategory?.serviceCategoryCode || null,
        },
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}policySubCopay/delete`,
      setValidtationMessage,setShowModal,
      data: coPaymentCoverageData,
      setData: setCoPaymentCoverageData,
      itemKey: "policyCopayId", // Key to identify the item in the dataset
    });
  };
  

  const handleUpdate = () => {
    const convertEmptyToNull = (value) => (value === "" || value === undefined ? null : value);

    const updatedData = {

      covered: convertEmptyToNull(formData.covered),
      policyCopayId: convertEmptyToNull(formData.policyCopayId),
      coPaymentPercent: convertEmptyToNull (Number(formData.coPaymentPercent)),
      coPaymentAmt: convertEmptyToNull(Number(formData.coPaymentAmt)),
      policiesCharge: { chargeCode: convertEmptyToNull(Number(formData?.policiesCharge?.chargeCode)) },
      policySubCharge: { policySubCode: convertEmptyToNull(Number(formData?.policySubCharge?.policySubCode) )},
      serviceCategory:{serviceCategoryCode:convertEmptyToNull(Number(formData?.serviceCategory?.serviceCategoryCode))}
    };
    console.log(formData);
    console.log(updatedData);
    
      const url = `${BASE_URL}policySubCopay/update`;
            const id =formData.policyCopayId; // The URL for form submission
            updateForm( url,id,updatedData, setCoPaymentCoverageData, setValidtationMessage, setShowModal, setIsEditMode,  setNotEditMode, clearForm );

  };

  return (
    <>
      <div className="container page-content">
        <h2>CO PAYMENT AND COVERAGE FOR A SUB POLICY TYPE</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="coPaymentPercent" className="form-label">
                Co Payment Percent
              </label>
              <input   className="form-control"   type="number"   id="coPaymentPercent"    name="coPaymentPercent" 
               min="1"  max="100"  value={formData.coPaymentPercent}    onChange={handleChange}       ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="covered" className="form-label">
              Covered
              </label>
              <select  className="form-control"  id="covered"   name="covered"   value={formData.covered} onChange={handleChange}  >
                <option value="">Select an option </option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            {/* subPoliciesPatient  Type (policySubCode) Row */}
            <div className="col-md-4">
              <label htmlFor="policySubCode" className="form-label">
                Sub PoliciesPatient Type (policySubCode)
              </label>
              <select  className="form-control"  id="policySubCode"  name="policySubCode" value={formData.policySubCharge.policySubCode} 
              onChange={handleChange}  required  disabled={notEditMode}  >
                <option value="">Select an option</option>
                {subPoliciesPatientData.map((option) => (
                  <option
                    key={option.policySubCode}
                    value={option.policySubCode}
                  >
                    {option.policySubCode}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* patientsSubType (chargeCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="chargeCode" className="form-label">
              Policy sub Patient Type (chargeCode)
              </label>
              <select   className="form-control"   id="chargeCode"   name="chargeCode" value={formData.policiesCharge.chargeCode}  onChange={handleChange}  required  disabled={notEditMode}  >
                <option value="">Select an option</option>
                {policiesSubPatientData.map((option) => (
                  <option key={option.chargeCode} value={option.chargeCode}>
                    {option.chargeCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="" className="form-label">
              Service Category Type (serviceCategoryCode)
              </label>
              <select   className="form-control"   id="serviceCategoryCode"  name="serviceCategoryCode" 
               value={formData.serviceCategory.serviceCategoryCode} onChange={handleChange} required  disabled={notEditMode}  >
                <option value="">Select an option</option>
                {serviceCategoryData.map((option) => (
                  <option
                    key={option.serviceCategoryCode}
                    value={option.serviceCategoryCode}
                  >
                    {option.serviceCategoryCode}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="coPaymentAmt" className="form-label">
                Co Payment Amt
              </label>
              <input className="form-control"  id="coPaymentAmt" name="coPaymentAmt" value={formData.coPaymentAmt}  onChange={handleChange} ></input>
            </div>
          </div>

         
          {!isEditMode ? (
  <button type="submit" className="btn btn-primary">
    Create+
  </button>
) : (
  <>
    <button type="button" onClick={handleUpdate} className="btn btn-success">
      Update
    </button>
    <button type="button" onClick={() => { setIsEditMode(false); clearForm();setNotEditMode(false);}} className=" ms-4 btn btn-secondary">
                Cancel
              </button>
  </>
)}
        </form>
          <input
      type="text"
      placeholder="Search hchgName"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="form-control my-2"
    />
        <CustomDataTable
          columns={coPaymentCoverageDataColumn(handleUpdateData, handleDelete)}
          data={coPaymentCoverageData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        /> 
        
      </div>
    </>
  );
};

export default CoPaymentCoverage;


    //   const response = await axios.post(
    //     "http://192.168.91.201:8082/policySubCopay/create",
    //     updatedFormData
    //   );

    //   alert("Form submitted successfully");

    //   const { data } = await axios.get(
    //     "http://192.168.91.201:8082/policySubCopay/getAll"
    //   );

    //   setCoPaymentCoverageData(data);
    //   console.log(coPaymentCoverageData);

    //   clearForm();
    // } catch (err) {
    //   console.error("Error details:", err.response?.data || err.message);
    //   alert(
    //     "Error submitting form: " +
    //       (err.response?.data?.message || "Check console for details")
    //   );
     //}

     
    // axios
    //   .put(
    //     `http://192.168.91.201:8082/policySubCopay/update/${formData.policyCopayId}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/policySubCopay/getAll")
    //       .then((res) => {
    //         setCoPaymentCoverageData  (res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //         clearForm();
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     alert("The data is already present in another child table.", err)
    //   );