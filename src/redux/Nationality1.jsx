import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData,setSearchTerm,  setEditMode, clearForm, setValidationMessage, hideModal, fetchData,} from "../redux/slices/FormSlices";
import axios from "axios";
import { CustomDataTable, filterData } from "../ReusableComponent/Actions";
import { nationalityColumn } from "../assets/ArrayData";

const BASE_URL = "http://192.168.91.201:8082/";

const NationalityFile = () => {
  const dispatch = useDispatch();
  const {
    nationalityData,
    formData,
    isEditMode,
    searchTerm,
    validationMessage,
    showModal,
  } = useSelector((state) => state.form);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
    dispatch(hideModal());
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}nationality/delete/${id}`);
      dispatch(fetchData(`${BASE_URL}nationality/getAll`));
         } catch (error) {
      dispatch(setValidationMessage("Error deleting item."));
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}nationality/update/${formData.nationalityCode}`, formData);
      dispatch(fetchData(`${BASE_URL}nationality/getAll`));
      dispatch(clearForm());
    } catch (error) {
      dispatch(setValidationMessage("Error updating item."));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`${BASE_URL}nationality/getAll`);
    try {
      await axios.post(`${BASE_URL}nationality/create`, formData);
      dispatch(fetchData(`${BASE_URL}nationality/getAll`));
      dispatch(clearForm());
    } catch (error) {
      dispatch(setValidationMessage("Error creating item."));
    }
  };

  return (
    <div className="container page-content">
      <h2 className="mb-4">Nationality Form</h2>

      {showModal && <div className="alert alert-danger">{validationMessage}</div>}

      <form onSubmit={handleSubmit} onClick={() => dispatch(hideModal())}>
        <div className="row">
          <div className="col mb-3">
            <label htmlFor="nationality" className="form-label">Nationality</label>
            <input
              type="text"
              className="form-control"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col mb-3">
            <label htmlFor="nationalityFl" className="form-label">Nationality FL</label>
            <input
              type="text"
              className="form-control"
              id="nationalityFl"
              name="nationalityFl"
              value={formData.nationalityFl}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {!isEditMode ? (
          <button type="submit" className="btn btn-primary">Create+</button>
        ) : (
          <>
            <button type="button" onClick={handleUpdate} className="btn btn-success">Update</button>
            <button type="button" onClick={() => dispatch(clearForm())} className="ms-4 btn btn-secondary">
              Cancel
            </button>
          </>
        )}
      </form>

      <h1>Nationality Data</h1>
      <input
        type="text"
        placeholder="Search Nationality"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="form-control my-2"
      />

      <CustomDataTable
        columns={nationalityColumn(handleUpdate, handleDelete)}
        data={filterData(nationalityData, searchTerm, ["nationality"])}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default NationalityFile;
