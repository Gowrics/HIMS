import React, { useContext, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { priceDetailsDepRuleColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
import { faL } from "@fortawesome/free-solid-svg-icons";

const PriceDetailsDepRule = () => {
  const {
    priceDetailsDepRuleData, setPriceDetailsDepRuleData, BASE_URL, validtationMessage,
    priceListDepRuleData, serviceMasterData, setValidtationMessage
  } = useContext(FormContext);

  const [isEditMode, setIsEditMode] = useState(false); 
  const [notEditMode, setNotEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialFormData = {
    numberOfDays: null,
    serviceMaster: { serviceCode: "" },
    dependencyServiceCode: { serviceCode: "" },
    priceListDependency: { depRuleNo: null }
  };

  const [formData, setFormData] = useState(initialFormData);

  
  // Clear form data
  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
    setNotEditMode(false);
      };

  // Handle form field updates
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "serviceMaster") {
        return { ...prevData, serviceMaster: { serviceCode: value } };
      } else if (name === "depRuleNo") {
        return { ...prevData, priceListDependency: { depRuleNo: Number(value) || null } };
      } else if (name === "dependencyServiceCode") {
        return { ...prevData, dependencyServiceCode: { serviceCode: value } };
      } else {
        return { ...prevData, [name]: value };
      }
    });
    setShowModal(false);
  };


  // Handle form submission (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      numberOfDays: Number(formData.numberOfDays) || null,
      priceListDependency: {
        depRuleNo: formData.priceListDependency.depRuleNo 
          ? Number(formData.priceListDependency.depRuleNo) 
          : null,
      },
    };

    console.log("Payload sent to API:", updatedFormData);
    const url = `${BASE_URL}detailsDependency/create`;

    submitForm(url, updatedFormData, setPriceDetailsDepRuleData, setValidtationMessage, setShowModal, clearForm);
  };

  // Handle data update
  const handleUpdateData = (id) => {
    setNotEditMode(true);
    const itemToUpdate = priceDetailsDepRuleData.find((item) => item.id === id);

    if (itemToUpdate) {
      setFormData({
        id: itemToUpdate.id,
        numberOfDays: itemToUpdate.numberOfDays,
        serviceMaster: { serviceCode: itemToUpdate.serviceMaster?.serviceCode || "" },
        dependencyServiceCode: { serviceCode: itemToUpdate.dependencyServiceCode?.serviceCode || "" },
        priceListDependency: { depRuleNo: itemToUpdate.priceListDependency?.depRuleNo || null },
      });
      setIsEditMode(true);
    } else {
      console.error("Item not found!");
    }
  };

  // Handle Update
  const handleUpdate = () => {
    const { id, numberOfDays, serviceMaster, dependencyServiceCode, priceListDependency } = formData;

    const updatedData = {
      id,
      numberOfDays,
      serviceMaster: { serviceCode: serviceMaster.serviceCode },
      dependencyServiceCode: { serviceCode: dependencyServiceCode.serviceCode },
      priceListDependency: { depRuleNo: priceListDependency.depRuleNo },
    };
     const url = `${BASE_URL}detailsDependency/update`;
           const ids =formData.id; // The URL for form submission
           updateForm( url,ids,updatedData, setPriceDetailsDepRuleData, setValidtationMessage, setShowModal, setIsEditMode,  null, clearForm );
    };

  // Handle Delete
  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}detailsDependency/delete`,
      setValidtationMessage,setShowModal,
      data: priceDetailsDepRuleData,
      setData: setPriceDetailsDepRuleData,
      itemKey: "id",
    });
  };

  return (
    <div className="container page-content">
      <h2>Price List Details Dependency</h2>
      <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
        <h6 className="m-0">{validtationMessage}</h6>
      </div>
      <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="depRuleNo" className="form-label">Price List Detail Dep (depRuleNo)</label>
            <select className="form-control" id="depRuleNo"  name="depRuleNo" value={formData.priceListDependency.depRuleNo || ""} onChange={handleChange} required disabled={notEditMode}>
              <option value="">Select an option</option>
              {priceListDepRuleData.map((option) => (
                <option key={option.depRuleNo} value={option.depRuleNo}>{option.depRuleNo}</option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
    <label htmlFor="numberOfDays" className="form-label">Number of Days</label>
    <input  type="number"  className="form-control" id="numberOfDays" name="numberOfDays"  value={formData.numberOfDays || ""} onChange={handleChange} required />
  </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="serviceMaster" className="form-label">Service Master (serviceCode)</label>
            <select className="form-control"   id="serviceMaster"  name="serviceMaster"  value={formData.serviceMaster.serviceCode} onChange={handleChange} required  disabled={notEditMode}  >
              <option value="">Select an option</option>
              {serviceMasterData.map((option) => (
                <option key={option.serviceCode} value={option.serviceCode}>{option.serviceCode}</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <label htmlFor="dependencyServiceCode" className="form-label">Dependency Service Code (serviceCode)</label>
            <select   className="form-control"  id="dependencyServiceCode"   name="dependencyServiceCode" value={formData.dependencyServiceCode.serviceCode}
             onChange={handleChange}    required   disabled={notEditMode}       >
              <option value="">Select an option</option>
              {serviceMasterData.map((option) => (
                <option key={option.serviceCode} value={option.serviceCode}>{option.serviceCode}</option>
              ))}
            </select>
          </div>
        </div>

        {!isEditMode ? (
          <button type="submit" className="btn btn-primary">Create+</button>
        ) : (
          <>
            <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
            <button type="button" onClick={clearForm} className="ms-4 btn btn-secondary">Cancel</button>
          </>
        )}
      </form>

      <CustomDataTable columns={priceDetailsDepRuleColumn(handleUpdateData, handleDelete)} data={priceDetailsDepRuleData} paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15, 20]} />
    </div>
  );
};

export default PriceDetailsDepRule;



    //   const response = await axios.post(
    //     "http://192.168.91.201:8082/detailsDependency/create",
    //     updatedFormData
    //   );

    //   alert("Form submitted successfully");

    //   const { data } = await axios.get(
    //     "http://192.168.91.201:8082/detailsDependency/getAll"
    //   );

    //   setPriceDetailsDepRuleData(data);
   

    //   clearForm();
    // } catch (err) {
    //   console.error("Error details:", err.response?.data || err.message);
    //   alert(
    //     "Error submitting form: " +
    //       (err.response?.data?.message || "Check console for details")
    //   );
    // }


      // axios.put(`${BASE_URL}detailsDependency/update/${id}`, updatedData)
    //   .then(() => {
    //     axios.get(`${BASE_URL}detailsDependency/getAll`)
    //       .then((res) => {
    //         setPriceDetailsDepRuleData(res.data);
    //         clearForm();
    //       })
    //       .catch((err) => console.error("Error fetching data:", err));
    //   })
    //   .catch((err) => alert("The data is already present in another child table.", err));