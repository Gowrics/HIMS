import { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import axios from "axios";
import {  priceListDepRuleDataColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm, useFetchData } from "../ReusableComponent/Actions";
const PriceListDepRule = () => {
  const { validtationMessage,BASE_URL,setValidtationMessage,priceListDepRuleData, setPriceListDepRuleData, searchTerm,  setSearchTerm,  } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false); 
   const [showModal, setShowModal] = useState(false);
     const [notEditMode, setNotEditMode] = useState(false);
    const initialFormData = {
    depRuleNo:"",
    depRuleName: "",
     };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };

   
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Payload sent to API:", formData);
               const url = `${BASE_URL}priceListDependency/create`; // The URL for form submission
                    submitForm(url, formData, setPriceListDepRuleData, setValidtationMessage,setShowModal, clearForm);

  };  
 

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/priceListDependency/delete",
      data: priceListDepRuleData,
      setData: setPriceListDepRuleData,
      itemKey: "depRuleNo", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    setNotEditMode(true)
        const itemToUpdate = priceListDepRuleData.find(
      (item) => item.depRuleNo === id
    );
    if (itemToUpdate) {
      setFormData({
        depRuleNo:itemToUpdate.depRuleNo,
        depRuleName: itemToUpdate.depRuleName,
             
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
  const handleUpdate = () => {
    const {depRuleName ,depRuleNo} = formData;
    const updatedData = {
        depRuleName,depRuleNo
    };
    console.log(formData);
    console.log(updatedData);

        const url = `${BASE_URL}priceListDependency/update`;
                    const id =formData.depRuleNo; // The URL for form submission
                    updateForm( url,id,updatedData, setPriceListDepRuleData, setValidtationMessage, setShowModal, setIsEditMode,  null, clearForm );
  };

  return (
    <div className="container page-content">
      <h2>Price List Dependency Rules</h2>
      <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
<form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">
            Dep Rule Name
            </label>
            <input  type="text"   className="form-control"  id="depRuleName"  name="depRuleName" value={formData.depRuleName} onChange={handleChange} required   ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="depRuleNo" className="form-label">
            Dep Rule No
            </label>
            <input  type="number"  className="form-control"  id="depRuleNo"  name="depRuleNo" value={formData.depRuleNo}  onChange={handleChange} required  disabled={notEditMode}   ></input>
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
    <button type="button" onClick={() => {setIsEditMode(false);clearForm(); setNotEditMode(false);setShowModal(false)}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}

      </form>{" "}
      <CustomDataTable
        columns={priceListDepRuleDataColumn(handleUpdateData, handleDelete)}
        data={priceListDepRuleData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default PriceListDepRule;


//   axios
  //     .post("http://192.168.91.201:8082/priceListDependency/create", formData)
  //     .then((response) => {
  //       console.log("API Response:", response.data);
  //       alert("Price List created successfully!");
  
  //       // Fetch updated price list data
  //       return axios.get("http://192.168.91.201:8082/priceListDependency/getAll");
  //     })
  //     .then((res) => {
  //       setPriceListDepRuleData(res.data);
  //       setIsEditMode(false); // Hide update form after successful update
  //       clearForm();
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response.status === 500) {
  //         console.log(err.response.data)
  //         setValidtationMessage("depRuleno must be unique. This value already exists!"); // Custom message for 500 errors
  //         setShowModal(true);
  //       } else {
  //         console.log("Error submitting form:", err);
  //       }
  //     });

  
    // axios
    //   .put(
    //     `http://192.168.91.201:8082/priceListDependency/update/${formData.depRuleNo}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/priceListDependency/getAll")
    //       .then((res) => {
    //         setPriceListDepRuleData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setNotEditMode(false)
    //                     clearForm();
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) =>
    //     alert("The data is already present in another child table.", err)
    //   );