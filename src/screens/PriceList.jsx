import { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import axios from "axios";
import { priceListColumn } from "../assets/ArrayData";
import { CustomDataTable, handleDeleteItem, submitForm, updateForm, useFetchData } from "../ReusableComponent/Actions";

const PriceList = () => {
  const {  priceListData, setPriceListData,BASE_URL, validtationMessage, setValidtationMessage, searchTerm, setSearchTerm } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); 
  
    const initialFormData = { priceListName: "", active: "" };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => setFormData(initialFormData);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      priceListName:(formData.priceListName).trim()
    };
          console.log("Payload sent to API:", updatedFormData);
           const url = `${BASE_URL}priceList/create`; // The URL for form submission
                submitForm(url, updatedFormData, setPriceListData, setValidtationMessage,setShowModal, clearForm);
  };

  const handleDelete = (id) => {
     handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/priceList/delete",
      data: priceListData,
      setData: setPriceListData,
      itemKey: "priceListCode",
    });
      };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = priceListData.find((item) => item.priceListCode === id);
    if (itemToUpdate) {
      setFormData({ priceListCode: itemToUpdate.priceListCode, active: itemToUpdate.active, priceListName: itemToUpdate.priceListName });
      setIsEditMode(true);
    } else console.log("Item not found!");
  };

  const handleUpdate = () => {
    const updatedData = { priceListCode: formData.priceListCode, priceListName: (formData.priceListName).trim(), active: formData.active };
    console.log(formData, updatedData);
  
        const url = `${BASE_URL}priceList/update`;
              const id =formData.priceListCode; // The URL for form submission
              updateForm( url,id,updatedData, setPriceListData, setValidtationMessage, setShowModal, setIsEditMode,  null, clearForm );
    };

  return (
    <div className="container page-content">
      <h2>PRICE LIST HANDLING</h2>
      <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
        <h6 className="m-0">{validtationMessage}</h6>
      </div>
      <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">Price List Name</label>
            <input type="text" className="form-control" id="priceListName" name="priceListName" value={formData.priceListName} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label htmlFor="Active" className="form-label">Active</label>
            <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange} required>
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
    <button type="button" onClick={() => { setIsEditMode(false);setShowModal(false); clearForm(); }} className="ms-4 btn btn-secondary">Cancel</button>
  </>
)}
 </form>
      <CustomDataTable columns={priceListColumn(handleUpdateData, handleDelete)} data={priceListData} paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15, 20]} />
    </div>
  );
};

export default PriceList;


  
    // axios.put(`http://192.168.91.201:8082/priceList/update/${formData.priceListCode}`, updatedData).then((res) => {
    //   console.log("Updated successfully:", res.data);
    //   axios.get("http://192.168.91.201:8082/priceList/getAll").then((res) => {
    //     setPriceListData(res.data);
    //     setIsEditMode(false);
    //     clearForm();
    //   }).catch((err) => console.log("Error fetching data:", err));
    // }).catch((err) => {
    //   if (err.response?.status === 400) {
    //     console.log(err.response.data);
    //     setValidtationMessage("Price List name must be unique. This value already exists!");
    //     setShowModal(true);
    //   } else console.log("Error submitting form:", err);
    // });

    
    // axios.post("http://192.168.91.201:8082/priceList/create", updatedFormData).then((response) => {
    //   console.log("API Response:", response.data);
    //   axios.get("http://192.168.91.201:8082/priceList/getAll").then((res) => {
    //     setPriceListData(res.data);
    //     setIsEditMode(false);
    //     clearForm();
    //   }).catch((err) => console.log("Error fetching data:", err));
    //   alert("Price List created successfully!");
    //   clearForm();
    // }).catch((err) => {
    //   if (err.response?.status === 500) {
    //     setValidtationMessage("Price List Name must be unique. This value already exists!");
    //     setShowModal(true);
    //   } else console.log("Error submitting form:", err);
    // });