import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormContext } from "../FormContext";
import axios from "axios";
import useFetchData from "../ReusableComponent/useFetchData";
import { priceListColumn } from "../assets/ArrayData";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const PriceList = () => {
  const {
    setIsEditMode,isEditMode,
    priceListData, setPriceListData,
    validtationMessage,setValidtationMessage, 
    showModal, setShowModal,
    searchTerm, setSearchTerm,
  } = useContext(FormContext);
  const initialFormData = {
    // priceListCode
    priceListName: "",
    active: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Form Data:", formData);
    
    // Make the POST request without async/await
    axios
      .post("http://192.168.91.201:8082/priceList/create", formData)
      .then((response) => {
        console.log("API Response:", response.data);
  
        // Fetch the updated price list after creating the price list
        axios
          .get("http://192.168.91.201:8082/priceList/getAll")
          .then((res) => {
            setPriceListData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            clearForm();
          })
          .catch((err) => {
            console.log("Error fetching data:", err);
          });
  
        alert("Price List created successfully!");
        clearForm();
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          setValidtationMessage("Tpa Name must be unique. This value already exists!"); // Custom message for 500 errors
          setShowModal(true);
        } else {
          console.log("Error submitting form:", err);
        }
      });
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

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/priceList/delete",
      data: priceListData,
      setData: setPriceListData,
      itemKey: "priceListCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = priceListData.find(
      (item) => item.priceListCode === id
    );

    if (itemToUpdate) {
      setFormData({
        priceListCode: itemToUpdate.priceListCode,
        active: itemToUpdate.active,

        priceListName: itemToUpdate.priceListName,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };
  const handleUpdate = () => {
    const { priceListCode, priceListName, active } = formData;
    const updatedData = {
      priceListCode,
      priceListName,
      active,
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/priceList/update/${formData.priceListCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/priceList/getAll")
          .then((res) => {
            setPriceListData(res.data);
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
    <div className="container page-content">
      <h2>PRICE LIST HANDLING</h2>
      <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">
              priceListName
            </label>
            <input
              type="text"
              className="form-control"
              id="priceListName"
              name="priceListName"
              value={formData.priceListName}
              onChange={handleChange}
            
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="Active" className="form-label">
              Active
            </label>
            <select
              className="form-control"
              id="active"
              name="active"
              value={formData.active}
              onChange={handleChange}
              required
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
      </form>{" "}
      <CustomDataTable
        columns={priceListColumn(handleUpdateData, handleDelete)}
        data={priceListData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default PriceList;
