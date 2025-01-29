import { useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FormContext } from "../FormContext";
import axios from "axios";
import useFetchData from "../ReusableComponent/useFetchData";
import { priceListColumn, priceListDepRuleDataColumn } from "../assets/ArrayData";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const PriceListDepRule = () => {
  const {
    setIsEditMode,
    priceListDepRuleData, setPriceListDepRuleData,
    isEditMode,
    priceListData,
    setPriceListData,
    searchTerm,
    setSearchTerm,
  } = useContext(FormContext);
  const initialFormData = {
    depRuleNo:null,
    depRuleName: "",
   
  };
  const [formData, setFormData] = useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "http://192.168.91.201:8082/priceListDependency/create",
        formData
      );

      console.log("API Response:", response.data);
      axios
        .get("http://192.168.91.201:8082/priceListDependency/getAll")
        .then((res) => {
          setPriceListDepRuleData(res.data);
          setIsEditMode(false); // Hide update form after successful update
          clearForm();
        })
        .catch((err) => console.log("Error fetching data:", err));
      alert("Price List created successfully!");
      clearForm();
    } catch (error) {
      console.error(
        "Error creating price list:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create price list. Please check the console for more details."
      );
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
    console.log(id);
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

    axios
      .put(
        `http://192.168.91.201:8082/priceListDependency/update/${formData.depRuleNo}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/priceListDependency/getAll")
          .then((res) => {
            setPriceListDepRuleData(res.data);
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
      <h2>Price List Dependency Rules</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="priceListName" className="form-label">
              priceListName
            </label>
            <input
              type="text"
              className="form-control"
              id="depRuleName"
              name="depRuleName"
              value={formData.depRuleName}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="col-md-4">
            <label htmlFor="depRuleNo" className="form-label">
            depRuleNo
            </label>
            <input
              type="number"
              className="form-control"
              id="depRuleNo"
              name="depRuleNo"
              value={formData.depRuleNo}
              onChange={handleChange}
              required
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
