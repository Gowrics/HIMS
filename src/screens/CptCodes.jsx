import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import { cptCodesColumn, priceListColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";

const CptCodes = () => {
  const {
    setIsEditMode, isEditMode,
    cptCodesData,   setCptCodesData,BASE_URL,
    validtationMessage,setValidtationMessage,
  } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);
  const initialFormData = {
    cptCode: "",
    cptName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     console.log("Payload sent to API:", formData);
          const url = `${BASE_URL}cptCodes/create`; // The URL for form submission
           submitForm(url, formData, setCptCodesData, setValidtationMessage, setShowModal, clearForm);
   
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
      url: `${BASE_URL}cptCodes/delete`,
      setValidtationMessage,setShowModal,
      data: cptCodesData,
      setData: setCptCodesData,
      itemKey: "cptCode",
   
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = cptCodesData.find((item) => item.cptCode === id);

    if (itemToUpdate) {
      setFormData({
        cptCode: itemToUpdate.cptCode,
        cptName: itemToUpdate.cptName,
      });
      setIsEditMode(true);
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = async () => {
    const { cptCode, cptName } = formData;
    const updatedData = { cptCode, cptName };
 console.log(formData);
    console.log(updatedData);

  const url = `${BASE_URL}cptCodes/update`;
        const id =formData.cptCode; // The URL for form submission
        updateForm( url,id,formData, setCptCodesData, setValidtationMessage, setShowModal, setIsEditMode,  setNotEditMode, clearForm );

  };

  return (
    <div className="container page-content">
      <h2>CPT CODES HANDLING</h2>
      <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
<form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Name
            </label>
            <input type="text"  className="form-control"  id="cptName"  name="cptName"  value={formData.cptName}  onChange={handleChange}  required    />
          </div>
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Code
            </label>
            <input    type="text"   className="form-control"    id="cptCode"   name="cptCode"  value={formData.cptCode}  onChange={handleChange}    required  disabled={notEditMode}   />
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
        columns={cptCodesColumn(handleUpdateData, handleDelete)}
        data={cptCodesData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default CptCodes;







    // try {
    //   const response = await axios.put(
    //     `http://192.168.91.201:8082/cptCodes/update/${cptCode}`,
    //     updatedData
    //   );

    //   console.log("Updated successfully:", response.data);
    //   fetchCptCodesData();
    //   clearForm();
    // } catch (error) {
    //   console.error("Error updating CPT Code:", error.response?.data || error.message);
    //   alert("The data is already present in another child table.");
    // }

 // axios
    //   .post("http://192.168.91.201:8082/cptCodes/create", formData)
    //   .then((response) => {
    //     console.log("API Response:", response.data);
    //     alert("CPT Code created successfully!");
  
    //     // Fetch updated CPT codes data
    //     fetchCptCodesData();
  
    //     // Clear form
    //     clearForm();
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.status === 500) {
    //       console.log(err.response.data)
    //       setValidtationMessage("Cpt code must be unique. This value already exists!"); // Custom message for 500 errors
    //       setShowModal(true);
    //     } else {
    //       console.log("Error submitting form:", err);
    //     }
    //   });