import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext, UserContext } from "../FormContext";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../Component/BreadCrumbs";
import useFetchData from "../ReusableComponent/useFetchData";
import { nationalityColumn } from "../assets/ArrayData";
import CustomDataTable from "../ReusableComponent/CustomDataTable";

const Nationality = () => {
  const {
    nationalityData,
    searchTerm,
    setSearchTerm,
    setNationalityData,
    isEditMode,
    setIsEditMode,
  } = useContext(FormContext);
  const [formData, setFormData] = useState({
    nationality: "",
    nationalityFl: "",
    nationalityCode: 0,
  });
  const [errors, setErrors] = useState({
    nationality: false,
    nationalityFl: false,
    nationalityCode: false,
  });

  console.log(nationalityData);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://192.168.91.201:8082/nationality/delete/${id}`)
        .then((res) => {
          console.log("Deleted successfully:", res.data);
          const updatedData = nationalityData.filter(
            (item) => item.nationalityCode !== id
          );
          setNationalityData(updatedData);
        })
        .catch((err) => console.log("Error deleting data:", err));
    }
  };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = nationalityData.find(
      (item) => item.nationalityCode === id
    );

    if (itemToUpdate) {
      setFormData({
        nationality: itemToUpdate.nationality,
        nationalityFl: itemToUpdate.nationalityFl,
        nationalityCode: itemToUpdate.nationalityCode,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formData);
    axios
      .post("http://192.168.91.201:8082/nationality/create", formData)
      .then((res) => {
        console.log("Form submitted successfully:", res.data);
        alert("Form Submitted Successfully..");

        axios
          .get("http://192.168.91.201:8082/nationality/getAll")
          .then((res) => {
            setNationalityData(res.data);
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) => console.log("Error submitting form:", err));

    setFormData({
      nationality: "",
      nationalityFl: "",
      nationalityCode: "",
    });
  };

  const handleUpdate = async () => {
    const { nationality, nationalityFl, nationalityCode } = formData;

    const updatedData = {
      nationality,
      nationalityFl,
      nationalityCode,
    };
    try {
      console.log("Updating data:", updatedData);
      await axios.put(
        `http://192.168.91.201:8082/nationality/update/${formData.nationalityCode}`,
        updatedData
      );
      console.log("Update successful");
      setIsEditMode(false);
      setFormData({
        nationality: "",
        nationalityFl: "",
        nationalityCode: "",
      });
      axios
        .get("http://192.168.91.201:8082/nationality/getAll")
        .then((response) => {
          setNationalityData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching updated data:", error);
        });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter nationality data based on the search term
  const filteredNationalities = nationalityData.filter(
    (item) =>
      item.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nationalityFl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container page-content ">
        <h2 className="mb-4">Nationality Form</h2>
        <form className="submit" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="nationality" className="form-label">
                Nationality
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.nationality ? "is-invalid" : ""
                }`}
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
              {errors.nationality && (
                <div className="invalid-feedback">Nationality is required</div>
              )}
            </div>
            <div className="col mb-3">
              <label htmlFor="nationalityFl" className="form-label">
                Nationality FL
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.nationalityFl ? "is-invalid" : ""
                }`}
                id="nationalityFl"
                name="nationalityFl"
                value={formData.nationalityFl}
                onChange={handleChange}
                required
              />
              {errors.nationalityFl && (
                <div className="invalid-feedback">
                  Nationality FL is required
                </div>
              )}
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
        <h1>Nationality Data</h1>
        <input
          type="text"
          placeholder="Search Nationality"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control my-2"
        />
        <CustomDataTable
          columns={nationalityColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={nationalityData}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />{" "}
      </div>
    </>
  );
};

export default Nationality;
