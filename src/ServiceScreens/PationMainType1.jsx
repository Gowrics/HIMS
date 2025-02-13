import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, submitForm, updateForm, deleteItem, clearAlert } from '../redux/slices/dataSlice';
import { mainTypePatientColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData } from "../utils/Actions";
import { FormContext } from "../Context/Context";

const PatientMainType1 = () => {
  const dispatch = useDispatch();
  const { items, alert } = useSelector((state) => state.data);
  const { BASE_URL } = useContext(FormContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ hchgName: "", hchgCode: "" });

  useEffect(() => {
    dispatch(fetchData(`${BASE_URL}headcharge/getAll`));
  }, [dispatch, BASE_URL]);

  useEffect(() => {
    if (alert?.show) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({ hchgName: "", hchgCode: "" });
    setIsEditMode(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteItem({ url: `${BASE_URL}headcharge/delete`, id, key: "hchgCode" }));
  };
  

  const handleUpdateData = (id) => {
    const itemToUpdate = items.find((item) => item.hchgCode === id);
    if (itemToUpdate) {
      setFormData({ hchgName: itemToUpdate.hchgName, hchgCode: itemToUpdate.hchgCode });
      setIsEditMode(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm({ url: `${BASE_URL}headcharge/create`, formData }));
    clearForm();
  };

  const handleUpdate = () => {
    dispatch(updateForm({ url: `${BASE_URL}headcharge/update`, id: formData.hchgCode, formData }));
    clearForm();
  };

  return (
    <div className="container page-content">
      <h2 className="mb-4">MAIN CLASSIFICATION OF PATIENT TYPE</h2>
      {alert?.show && <div className={`alert alert-${alert.type}`} role="alert">{alert.message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="hchgName" className="form-label">Hchg Name</label>
            <input
              type="text"
              className={`form-control ${formData.hchgName ? "is-invalid" : ""}`}
              id="hchgName"
              name="hchgName"
              value={formData.hchgName}
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
            <button type="button" onClick={clearForm} className="ms-4 btn btn-secondary">Cancel</button>
          </>
        )}
      </form>
      
      <h4>Patient Type Data</h4>
      <input
        type="text"
        placeholder="Search hchgName"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-2"
      />
      
      <CustomDataTable
        columns={mainTypePatientColumn(handleUpdateData, handleDelete)}
        data={filterData(items, searchTerm, ["hchgName", "hchgCode"])}
        onRowSelect={(selectedRows) => console.log("Selected Rows:", selectedRows)}
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
      />
    </div>
  );
};

export default PatientMainType1;
