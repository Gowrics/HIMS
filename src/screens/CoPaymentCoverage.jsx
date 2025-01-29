import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import {
  coPaymentCoverageDataColumn,
  policiesSubPatientDataColumn,
  subTypePatientColumn,
  thirdPartyHeadDataColumn,
} from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
const CoPaymentCoverage = () => {
  const {
    policiesSubPatientData, subPoliciesPatientData,
    coPaymentCoverageData,setCoPaymentCoverageData,
    serviceCategoryData, setPoliciesSubPatient,
    setIsEditMode,isEditMode,
    searchTerm,setSearchTerm,
  } = useContext(FormContext);

  const initialFormData = {
    // policyCopayId: 0,
    covered: "",
    coPaymentPercent: 0,
    coPaymentAmt: 0,
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

  console.log(serviceCategoryData);
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateData = (id) => {
    console.log(id);
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle patientMainTypeData changes (for select input)
  const handlePatientTypeChange = (e) => {
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
    }
  };
  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        coPaymentPercent:Number(formData.coPaymentPercent)
   ,
   coPaymentAmt:Number(formData.coPaymentAmt)
        
      };

      console.log("Payload sent to API:", updatedFormData);

      const response = await axios.post(
        "http://192.168.91.201:8082/policySubCopay/create",
        updatedFormData
      );

      alert("Form submitted successfully");

      const { data } = await axios.get(
        "http://192.168.91.201:8082/policySubCopay/getAll"
      );

      setCoPaymentCoverageData(data);
      console.log(coPaymentCoverageData);

      clearForm();
    } catch (err) {
      console.error("Error details:", err.response?.data || err.message);
      alert(
        "Error submitting form: " +
          (err.response?.data?.message || "Check console for details")
      );
    }
  };
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/policySubCopay/delete",
      data: coPaymentCoverageData,
      setData: setCoPaymentCoverageData,
      itemKey: "policyCopayId", // Key to identify the item in the dataset
    });
  };
  

  const handleUpdate = () => {
    const {
      covered,
      policyCopayId,
      coPaymentPercent,
    coPaymentAmt,
      policiesCharge: { chargeCode },
      policySubCharge: { policySubCode },
    } = formData;
    const updatedData = {
      covered,
      policyCopayId,
     coPaymentPercent,coPaymentAmt,
      policiesCharge: { chargeCode },
      policySubCharge: { policySubCode },
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/policySubCopay/update/${formData.policyCopayId}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/policySubCopay/getAll")
          .then((res) => {
            setPoliciesSubPatient(res.data);
            setIsEditMode(false); // Hide update form after successful update
            clearForm();
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) =>
        alert("The data is already present in another child table.", err)
      );
  };

  return (
    <>
      <div className="container page-content">
        <h2>CO PAYMENT AND COVERAGE FOR A SUB POLICY TYPE (not updatable)</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="coPaymentPercent" className="form-label">
                coPaymentPercent
              </label>
              <input
                className="form-control"
                type="number"
                id="coPaymentPercent"
                name="coPaymentPercent"
                min="0.1"
                max="100"
                value={formData.coPaymentPercent}
                onChange={handleChange}
                              ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="covered" className="form-label">
              covered
              </label>
              <select
                className="form-control"
                id="covered"
                name="covered"
                value={formData.covered}
                onChange={handleChange}
                            >
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
              <select
                className="form-control"
                id="policySubCode"
                name="policySubCode"
                value={formData.policySubCharge.policySubCode}
                onChange={handlePatientTypeChange}
                required
              >
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
                policies Sub Type (chargeCode)
              </label>
              <select
                className="form-control"
                id="chargeCode"
                name="chargeCode"
                value={formData.policiesCharge.chargeCode}
                onChange={handlePatientTypeChange}
                required
              >
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
              serviceCategory Type (policySubCode)
              </label>
              <select
                className="form-control"
                id="serviceCategoryCode"
                name="serviceCategoryCode"
                value={formData.serviceCategory.serviceCategoryCode}
                onChange={handlePatientTypeChange}
                required
              >
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
                coPaymentAmt
              </label>
              <input
                className="form-control"
                id="coPaymentAmt"
                name="coPaymentAmt"
                value={formData.coPaymentAmt}
                onChange={handleChange}
                
              ></input>
            </div>
          </div>

          {!isEditMode && (
            <button type="submit" className="btn btn-primary">
              Create+
            </button>
          )}
          {isEditMode && (
            <button
              type="button"
              onClick={handleUpdate}
              className="btn btn-success"
            >
              Update
            </button>
          )}
        </form>
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
