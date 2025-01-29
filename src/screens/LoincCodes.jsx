import { useContext, useState, useEffect } from "react";
import { FormContext } from "../FormContext";
import axios from "axios";
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import { loincCodesColumn } from "../assets/ArrayData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const LoincCodes = () => {
  const {
    setIsEditMode,   isEditMode,
    loincCodesData,    setLoincCodesData,
    validtationMessage,setValidtationMessage, showModal, setShowModal,
    searchTerm,    setSearchTerm,
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
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log("Form Data:", formData);
  
    axios
      .post("http://192.168.91.201:8082/loincCodes/create", formData)
      .then((response) => {
        console.log("API Response:", response.data);
        alert("LOINC Code created successfully!");
  
        // Fetch updated LOINC codes data
        fetchLoincCodesData();
  
        // Clear form
        clearForm();
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          console.log(err.response.data)
          setValidtationMessage("loinc code must be unique. This value already exists!"); // Custom message for 500 errors
          setShowModal(true);
        } else {
          console.log("Error submitting form:", err);
        }
      });
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
      <div  tabIndex="-1"  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none" }`} role="alert">
  <h6 className="m-0">{validtationMessage}</h6>
</div>
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
