import { useContext, useState, useEffect } from "react";
import { FormContext } from "../FormContext";
import axios from "axios";
import { loincCodesColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const LoincCodes = () => {
  const {
    setIsEditMode,   isEditMode,BASE_URL,
    loincCodesData,    setLoincCodesData,
    validtationMessage,setValidtationMessage,
    searchTerm,    setSearchTerm,
  } = useContext(FormContext);
    const [showModal, setShowModal] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    loincCode: "",
    loincName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
      console.log("Payload sent to API:", formData);
        const url = `${BASE_URL}loincCodes/create`; // The URL for form submission
         submitForm(url, formData, setLoincCodesData, setValidtationMessage, setShowModal, clearForm);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: `${BASE_URL}loincCodes/delete`,
      setValidtationMessage,setShowModal,
      data: loincCodesData,
      setData: setLoincCodesData,
      itemKey: "loincCode",
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = loincCodesData.find((item) => item.loincCode === id);

    if (itemToUpdate) {
      setFormData({
        loincCode: itemToUpdate.loincCode,
        loincName: itemToUpdate.loincName,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const { loincCode, loincName } = formData;
    const updatedData = { loincCode, loincName };
    console.log(formData);
    console.log(updatedData);

  const url = `${BASE_URL}loincCodes/update`;
        const id =formData.loincCode; // The URL for form submission
        updateForm( url,id,formData, setLoincCodesData, setValidtationMessage, setShowModal, setIsEditMode,  setNotEditMode, clearForm );

  };

  return (
    <div className="container page-content">
      <h2>LOINC CODES HANDLING</h2>
      <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
<form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="loincName" className="form-label">   LOINC Name     </label>
            <input    type="text"   className="form-control"   id="loincName" name="loincName"  value={formData.loincName} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label htmlFor="loincCode" className="form-label">     LOINC loincCode     </label>
            <input  type="text"   className="form-control"    id="loincCode"  name="loincCode"  value={formData.loincCode}   onChange={handleChange}  required    disabled={notEditMode}/>
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm();}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
      </form>
      <CustomDataTable
        columns={loincCodesColumn(handleUpdateData, handleDelete)}
        data={loincCodesData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default LoincCodes;






    // axios
    //   .post("http://192.168.91.201:8082/loincCodes/create", formData)
    //   .then((response) => {
    //     console.log("API Response:", response.data);
    //     alert("LOINC Code created successfully!");
  
    //     // Fetch updated LOINC codes data
    //     fetchLoincCodesData();
  
    //     // Clear form
    //     clearForm();
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 500) {
    //       console.log(err.response.data)
    //       setValidtationMessage("loinc code must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //   });

    // try {
    //   const response = await axios.put(
    //     `http://192.168.91.201:8082/loincCodes/update/${loincCode}`,
    //     updatedData
    //   );

    //   console.log("Updated successfully:", response.data);
    //   fetchLoincCodesData();
    //   clearForm();
    // } catch (error) {
    //   console.error("Error updating LOINC Code:", error.response?.data || error.message);
    //   alert("The data is already present in another child table.");
    // }