import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { cptCodesColumn, priceListColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const CptCodes = () => {
  const {
    setIsEditMode,
    isEditMode,
    cptCodesData,
    setCptCodesData,
  } = useContext(FormContext);

  const initialFormData = {
    cptCode: "",
    cptName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  useEffect(() => {
    fetchCptCodesData();
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      clearForm();
    }
  }, [isEditMode]);

  const fetchCptCodesData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/cptCodes/getAll");
      setCptCodesData(response.data);
    } catch (error) {
      console.error("Error fetching CPT codes data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "http://192.168.91.201:8082/cptCodes/create",
        formData
      );

      console.log("API Response:", response.data);
      alert("CPT Code created successfully!");
      fetchCptCodesData();
      clearForm();
    } catch (error) {
      console.error(
        "Error creating CPT Code:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create CPT Code. Please check the console for more details."
      );
    }
  };

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
      url: "http://192.168.91.201:8082/cptCodes/delete",
      data: cptCodesData,
      setData: setCptCodesData,
      itemKey: "cptCode",
    });
  };

  const handleUpdateData = (id) => {
    console.log(id);
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

    console.log("Updating CPT Code:", updatedData);

    try {
      const response = await axios.put(
        `http://192.168.91.201:8082/cptCodes/update/${cptCode}`,
        updatedData
      );

      console.log("Updated successfully:", response.data);
      fetchCptCodesData();
      clearForm();
    } catch (error) {
      console.error("Error updating CPT Code:", error.response?.data || error.message);
      alert("The data is already present in another child table.");
    }
  };

  return (
    <div className="container page-content">
      <h2>CPT CODES HANDLING</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Name
            </label>
            <input
              type="text"
              className="form-control"
              id="cptName"
              name="cptName"
              value={formData.cptName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="cptName" className="form-label">
              CPT Code
            </label>
            <input
              type="text"
              className="form-control"
              id="cptCode"
              name="cptCode"
              value={formData.cptCode}
              onChange={handleChange}
              required
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
        columns={cptCodesColumn(handleUpdateData, handleDelete)}
        data={cptCodesData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default CptCodes;
