import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { policiesSubPatientDataColumn, priceDetailsDepRuleColumn, priceListDetailsColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
const PriceDetailsDepRule = () => {
  const {
        priceDetailsDepRuleData, setPriceDetailsDepRuleData,
    priceListDepRuleData,
        serviceMasterData,
    priceListDetailsData, setPriceListDeatilsData,
    setPoliciesSubPatient,
    thirdPartyHeadData,
    patientsSubTypeData,
    setIsEditMode,
    isEditMode,
    searchTerm,
    setSearchTerm,
  } = useContext(FormContext);
  const initialFormData = {
    numberOfDays:null,
    serviceMaster: {
      serviceCode: "",
    },
    dependencyServiceCode: {
      serviceCode: "",
    },
    priceListDependency:  {
      depRuleNo:null
    }
  };
  
  const [formData, setFormData] = useState(initialFormData);

  console.log(priceDetailsDepRuleData)
  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = priceDetailsDepRuleData.find(
      (item) => item.id === id
    );

    if (itemToUpdate) {
      setFormData({
      id:itemToUpdate.id,
       
        numberOfDays: itemToUpdate.numberOfDays,

        serviceMaster: {
          serviceCode: itemToUpdate.serviceMaster?.serviceCode || "",
        },
        dependencyServiceCode: {
          serviceCode: itemToUpdate.dependencyServiceCode?.serviceCode || "",
        },
        priceListDependency: {
          depRuleNo: itemToUpdate.priceListDependency?.depRuleNo || null,
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

    if (name === "serviceMaster") {
      // Update serviceMaster
      setFormData((prevData) => ({
        ...prevData,
        serviceMaster: {
          ...prevData.serviceMaster,
          serviceCode: value,
        },
      }));
          } 
    else if (name === "depRuleNo") {
      // Update priceListDependency
      setFormData((prevData) => ({
        ...prevData,
        priceListDependency: {
          ...prevData.priceListDependency,
          depRuleNo: value,
        },
      }));
    }
    else if (name === "dependencyServiceCode") {
      // Update priceListDependency
      setFormData((prevData) => ({
        ...prevData,
        dependencyServiceCode: {
          ...prevData.dependencyServiceCode,
          serviceCode: value,
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
               priceListDependency: {
          ...formData.priceListDependency,
          depRuleNo: formData.priceListDependency.depRuleNo
          ? Number(formData.priceListDependency.depRuleNo)
          : null,
              },
              numberOfDays:Number(formData.numberOfDays),
      
      };

      console.log("Payload sent to API:", updatedFormData);

      const response = await axios.post(
        "http://192.168.91.201:8082/detailsDependency/create",
        updatedFormData
      );

      alert("Form submitted successfully");

      const { data } = await axios.get(
        "http://192.168.91.201:8082/detailsDependency/getAll"
      );

      setPriceDetailsDepRuleData(data);
   

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
      url: "http://192.168.91.201:8082/detailsDependency/delete",
      data: priceDetailsDepRuleData,
      setData: setPriceDetailsDepRuleData,
      itemKey: "id", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const {
      id,
      numberOfDays,
      serviceMaster: { serviceCode: serviceMasterCode },
      dependencyServiceCode: { serviceCode: dependencyServiceCode },
      priceListDependency: { depRuleNo },
    } = formData;
  
    const updatedData = {
      id,
      numberOfDays,
      dependencyServiceCode: { serviceCode: dependencyServiceCode },
      serviceMaster: { serviceCode: serviceMasterCode },
      priceListDependency: { depRuleNo },
    };
    console.log(formData.id);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/detailsDependency/update/${formData.id}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/detailsDependency/getAll")
          .then((res) => {
            setPriceDetailsDepRuleData(res.data);
          
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
        <h2>Price List Details Dependency</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
           

           
            {/* TPA head Type (priceListCode) Row */}
            <div className="col-md-4">
              <label htmlFor="depRuleNo" className="form-label">
                Price List (depRuleNo)
              </label>
              <select
                className="form-control"
                id="depRuleNo"
                name="depRuleNo"
                value={formData.priceListDependency.depRuleNo}
                onChange={handlePatientTypeChange}
                required
              >
                <option value="">Select an option</option>
                {priceListDepRuleData.map((option) => (
                  <option key={option.depRuleNo} value={option.depRuleNo}>
                    {option.depRuleNo}
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
               <select
                className="form-control"
                id="serviceMaster"
                name="serviceMaster"
                value={formData.serviceMaster.serviceCode}
                onChange={handlePatientTypeChange}
               required
              >
                <option value="">Select an option</option>
                {serviceMasterData.map((option) => (
                  <option key={option.serviceCode} value={option.serviceCode}>
                    {option.serviceCode}
                  </option>
                ))}
              </select>
            
            </div>

            <div className="col-md-4">
              <label htmlFor="dependencyServiceCode" className="form-label">
                Service Master (serviceCode)
              </label>
               <select
                className="form-control"
                id="dependencyServiceCode"
                name="dependencyServiceCode"
                value={formData.dependencyServiceCode.serviceCode}
                onChange={handlePatientTypeChange}
              required
              >
                <option value="">Select an option</option>
                {serviceMasterData.map((option) => (
                  <option key={option.serviceCode} value={option.serviceCode}>
                    {option.serviceCode}
                  </option>
                ))}
              </select>
            
            </div>

            <div className="col-md-2">
              <label htmlFor="numberOfDays" className="form-label">
              numberOfDays
              </label>
              <input
                type="number" // Corrected here
                className="form-control"
                id="numberOfDays"
                name="numberOfDays"
                value={formData.numberOfDays}
                onChange={handleChange}
                
              />
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
          columns={priceDetailsDepRuleColumn(handleUpdateData, handleDelete)}
          data={priceDetailsDepRuleData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PriceDetailsDepRule;
