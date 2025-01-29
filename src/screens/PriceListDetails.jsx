import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { policiesSubPatientDataColumn, priceListDetailsColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";
const PriceListDetails = () => {
  const {
    policiesSubPatientData, priceListData,
    serviceMasterData, priceListDetailsData,
    setPriceListDeatilsData, setPoliciesSubPatient,
    thirdPartyHeadData, patientsSubTypeData,
    setIsEditMode,isEditMode,
    searchTerm, setSearchTerm,
  } = useContext(FormContext);
  const initialFormData = {
    grossAmt: null,
    discountAmt: null,
    covered: "",
    coPaymentPercent: null,
    coPaymentAmt: null,
    serviceMaster: {
      serviceCode: "",
    },
    priceList:{
      priceListCode:null,
    }
  };
  
  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  console.log(priceListDetailsData)
  const handleUpdateData = (id) => {
    console.log(id);

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
          serviceCode: itemToUpdate.serviceMaster?.serviceCode || "",
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
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        // serviceMaster: {
        //   ...formData.serviceMaster,
        //   serviceCode: Number(formData.serviceMaster.serviceCode),
        // },
        priceList: {
          ...formData.priceList,
          priceListCode: formData.priceList.priceListCode
          ? Number(formData.priceList.priceListCode)
          : null,
        
        },
        grossAmt:Number(formData.grossAmt),
        discountAmt:Number(formData.discountAmt),
        coPaymentAmt:Number(formData.coPaymentAmt),
        coPaymentPercent:Number(formData.coPaymentPercent)
      };

      console.log("Payload sent to API:", updatedFormData);

      const response = await axios.post(
        "http://192.168.91.201:8082/priceDetails/create",
        updatedFormData
      );
      clearForm();
      alert("Form submitted successfully");

      const { data } = await axios.get(
        "http://192.168.91.201:8082/priceDetails/getAll"
      );

      setPriceListDeatilsData(data);
      console.log(priceListDetailsData);

     
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
      url: "http://192.168.91.201:8082/priceDetails/delete",
      data: priceListDetailsData,
      setData: setPriceListDeatilsData,
      itemKey: "id", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {
    const {
      id,
      grossAmt,
      discountAmt,
      covered,
      coPaymentPercent,
      coPaymentAmt,
      serviceMaster: { serviceCode },
      priceList: { priceListCode },
    } = formData;
    const updatedData = {
      id,
      grossAmt,
      discountAmt,
      covered,
      coPaymentPercent,
      coPaymentAmt,
      serviceMaster: { serviceCode },
      priceList: { priceListCode },
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/priceDetails/update/${formData.id}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/priceDetails/getAll")
          .then((res) => {
            clearForm();
            setPriceListDeatilsData(res.data);
          
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
        <h2>HOLDS THE PRICES FOR EACH SERVICE CODE FOR A PRICE LIST</h2>
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="grossAmt" className="form-label">
              grossAmt
              </label>
              <input
              type="number"
                className="form-control"
                id="grossAmt"
                name="grossAmt"
                value={formData.grossAmt}
                onChange={handleChange}
                required
              ></input>
            </div>

            <div className="col-md-4">
            <label htmlFor="discountAmt" className="form-label">
            discountAmt
              </label>
              <input
               type="number"
                className="form-control"
                id="discountAmt"
                name="discountAmt"
                value={formData.discountAmt}
                onChange={handleChange}
                required
              ></input>
            </div>
            {/* TPA head Type (priceListCode) Row */}
              <div className="col-md-4">
                <label htmlFor="priceListCode" className="form-label">
                  Price List (priceListCode)
                </label>
                <select
                  className="form-control"
                  id="priceListCode"
                  name="priceListCode"
                  value={formData.priceList.priceListCode}
                  onChange={handlePatientTypeChange}
                >
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
               <select
                className="form-control"
                id="serviceCode"
                name="serviceCode"
                value={formData.serviceMaster.serviceCode}
                onChange={handlePatientTypeChange}
               //required
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
              <label htmlFor="policyNo" className="form-label">
              coPaymentPercent
              </label>
              <input
               type="number"
                className="form-control"
                id="coPaymentPercent"
                name="coPaymentPercent"
                value={formData.coPaymentPercent}
                onChange={handleChange}
                              ></input>
            </div>
            <div className="col-md-2">
              <label htmlFor="coPaymentAmt" className="form-label">
              coPaymentAmt
              </label>
              <input
                type="number" // Corrected here
                className="form-control"
                id="coPaymentAmt"
                name="coPaymentAmt"
                value={formData.coPaymentAmt}
                onChange={handleChange}
                
              />
            </div>
             <div className="col-md-2">
              <label htmlFor="coverd" className="form-label">
              coverd
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
