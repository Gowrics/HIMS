import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { subPoliciesPatientDataColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
const SubPoliciesPatient = () => {
  const {
    policiesSubPatientData,
    
    subPoliciesPatientData, setSubPoliciesPatientData,
    setIsEditMode,
    isEditMode,
    searchTerm,
    setSearchTerm,  
  } = useContext(FormContext);
  const initialFormData = {
    policySubCode: 0,
    policiesCharge: {
      chargeCode: "",
    },
    active: null,
    maternityCovered:null,
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = subPoliciesPatientData.find(
      (item) => item.policySubCode === id
    );

    if (itemToUpdate) {
      setFormData({
        policySubCode: itemToUpdate.policySubCode,
        active: itemToUpdate.active,
        policiesCharge: {
          chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
        },
        maternityCovered: itemToUpdate.maternityCovered,
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
    setFormData((prevData) => ({
      ...prevData,
      policiesCharge: {
        ...prevData.chargeCode,
        [name]: value,
      },
    }));
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
      policySubCode: Number(formData.policySubCode),
    };

    console.log("Payload sent to API:", updatedFormData);

    const response = await axios.post(
      "http://192.168.91.201:8082/policySubCharge/create",
      updatedFormData
    );

    alert("Form submitted successfully");

    const { data } = await axios.get(
      "http://192.168.91.201:8082/policySubCharge/getAll"
    );

    setSubPoliciesPatientData(data); // Make sure this is defined in the same component
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
      url: "http://192.168.91.201:8082/policySubCharge/delete",
      data: subPoliciesPatientData,
      setData: setSubPoliciesPatientData,
      itemKey: "policySubCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const {
      maternityCovered,
      policySubCode,
      active,
      policiesCharge: { chargeCode },
    } = formData;
    const updatedData = {
      maternityCovered,
      policySubCode,
      active,

      policiesCharge: { chargeCode },
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/policySubCharge/update/${formData.policySubCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/policySubCharge/getAll")
          .then((res) => {
            setSubPoliciesPatientData(res.data);
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
        <h2>SUB POLICY TYPES UNDER A SUB CLASSIFIED PATIENT TYPE</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="policySubCode" className="form-label">
                policySubCode
              </label>
              <input
                type="number"
                className="form-control"
                id="policySubCode"
                name="policySubCode"
                value={formData.policySubCode}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select
                className="form-control"
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                              >
                 <option value="">Select an option</option>
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
            </div>
            {/* TPA head Type (tpaCode) Row */}
          </div>

          {/* Patient Main Type (chargeCode) Row */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="chargeCode" className="form-label">
                Patient Sub Type (chargeCode)
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
              <label htmlFor="active" className="form-label">
                maternityCovered
              </label>
              <select
                className="form-control"
                id="maternityCovered"
                name="maternityCovered"
                value={formData.maternityCovered}
                onChange={handleChange}
                
              >
                <option value="YES">Y</option>
                <option value="NO">N</option>
              </select>
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
          columns={subPoliciesPatientDataColumn(handleUpdateData, handleDelete)}
          data={subPoliciesPatientData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default SubPoliciesPatient;
