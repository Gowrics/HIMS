import { useContext, useState, useEffect } from "react";
import { FormContext } from "../FormContext";
import axios from "axios";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { loincCodesColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const LoincCodes = () => {
  const {
    setIsEditMode,
    isEditMode,
    loincCodesData,
    setLoincCodesData,
    searchTerm,
    setSearchTerm,
  } = useContext(FormContext);

  const initialFormData = {
    loincCode: "",
    loincName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const clearForm = () => {
    setFormData(initialFormData);
    setIsEditMode(false);
  };

  useEffect(() => {
    fetchLoincCodesData();
  }, []);

  useEffect(() => {
    if (!isEditMode) {
      clearForm();
    }
  }, [isEditMode]);

  const fetchLoincCodesData = async () => {
    try {
      const response = await axios.get("http://192.168.91.201:8082/loincCodes/getAll");
      setLoincCodesData(response.data);
    } catch (error) {
      console.error("Error fetching LOINC codes data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Form Data:", formData);
      const response = await axios.post(
        "http://192.168.91.201:8082/loincCodes/create",
        formData
      );

      console.log("API Response:", response.data);
      alert("LOINC Code created successfully!");
      fetchLoincCodesData();
      clearForm();
    } catch (error) {
      console.error(
        "Error creating LOINC Code:",
        error.response?.data || error.message
      );
      alert(
        "Failed to create LOINC Code. Please check the console for more details."
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
      url: "http://192.168.91.201:8082/loincCodes/delete",
      data: loincCodesData,
      setData: setLoincCodesData,
      itemKey: "loincCode",
    });
  };

  const handleUpdateData = (id) => {
    console.log(id);
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

    console.log("Updating LOINC Code:", updatedData);

    try {
      const response = await axios.put(
        `http://192.168.91.201:8082/loincCodes/update/${loincCode}`,
        updatedData
      );

      console.log("Updated successfully:", response.data);
      fetchLoincCodesData();
      clearForm();
    } catch (error) {
      console.error("Error updating LOINC Code:", error.response?.data || error.message);
      alert("The data is already present in another child table.");
    }
  };

  return (
    <div className="container page-content">
      <h2>LOINC CODES HANDLING</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="loincName" className="form-label">
              LOINC Name
            </label>
            <input
              type="text"
              className="form-control"
              id="loincName"
              name="loincName"
              value={formData.loincName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="loincCode" className="form-label">
              LOINC loincCode
            </label>
            <input
              type="text"
              className="form-control"
              id="loincCode"
              name="loincCode"
              value={formData.loincCode}
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
        columns={loincCodesColumn(handleUpdateData, handleDelete)}
        data={loincCodesData}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default LoincCodes;
