import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext, UserContext } from "../FormContext";
import DataTable from "react-data-table-component";
import { mainTypePatient, mainTypePatientColumn } from "../assets/ArrayData"; //arraydata
import CustomDataTable from "../ReusableComponent/CustomDataTable";
import useFetchData from "../ReusableComponent/useFetchData";
import { handleDeleteItem } from "../ReusableComponent/UseHandleDelete";

const PationMainType = () => {
  const {
    patientsMainTypeData,setPatientMainTypeData,
    validtationMessage,setValidtationMessage, showModal, setShowModal,
    searchTerm,setSearchTerm,
    isEditMode, setIsEditMode,
  } = useContext(FormContext);

  const [formData, setFormData] = useState({
    // hchgCode: 0,
    hchgName: "",
  });
  const [errors, setErrors] = useState({
    hchgCode: false,
    hchgName: false,
  });

  useFetchData(
    "http://192.168.91.201:8082/headcharge/getAll",
    setPatientMainTypeData
  );

  console.log(patientsMainTypeData);

  const handleDelete = (id) => {
    handleDeleteItem({
      id,
      url: "http://192.168.91.201:8082/headcharge/delete",
      data: patientsMainTypeData,
      setData: setPatientMainTypeData,
      itemKey: "hchgCode", // Key to identify the item in the dataset
    });
  };

  const handleUpdateData = (id) => {
    console.log(id);
    const itemToUpdate = patientsMainTypeData.find(
      (item) => item.hchgCode === id
    );

    if (itemToUpdate) {
      setFormData({
        hchgName: itemToUpdate.hchgName,
        hchgCode: itemToUpdate.hchgCode,
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", formData);
  
    axios
      .post("http://192.168.91.201:8082/headcharge/create", formData)
      .then((res) => {
        console.log("Form submitted successfully:", res.data);
        alert("Form Submitted Successfully..");
  
        axios
          .get("http://192.168.91.201:8082/headcharge/getAll")
          .then((res) => {
            setPatientMainTypeData(res.data);
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) => {
        if (err.response && err.response.status === 500) {
          setValidtationMessage("Hchg Name must be unique. This value already exists!"); // Custom message for 500 errors
          setShowModal(true);
        } else {
          console.log("Error submitting form:", err);
        }
      });
  
    // Reset form fields
    setFormData({
      hchgName: "",
      hchgCode: 0,
    });
  };
  

  const handleUpdate = () => {
    const { hchgName, hchgCode } = formData;
    const updatedData = {
      hchgName,
      hchgCode,
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/headcharge/update/${formData.hchgCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/headcharge/getAll")
          .then((res) => {
            setPatientMainTypeData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            setFormData({
              hchgName: "",
            });
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) =>
        alert("The data is already present in another child table.", err)
      );
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  // Filter nationality data based on the search term
  const filteredNationalities = patientsMainTypeData.filter(
    (item) =>
      item.hchgName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container page-content ">
    
        <h2 className="mb-4">MAIN CLASSIFICATION OF PATIENT TYPE </h2>
        <div
  tabIndex="-1"
  className={`alert alert-danger border border-danger small p-2 mt-2 ${
    showModal ? "d-block" : "d-none"
  }`}
  role="alert"
>
  <h6 className="m-0">{validtationMessage}</h6>
</div>

        <form className="submit" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="hchgName" className="form-label">
                HchgName
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.hchgName ? "is-invalid" : ""
                }`}
                id="hchgName"
                name="hchgName"
                value={formData.hchgName}
                onChange={handleChange}
                required
              />
              {errors.hchgName && (
                <div className="invalid-feedback">hchgName is required</div>
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
        <h1>Main Classification of Patient type Data</h1>
        <input
          type="text"
          placeholder="Search hchgName"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control my-2"
        />
        {/* <DataTable
          className="table table-striped"
          columns={[
            {
              name: "hchgName",
              selector: (row) => row.hchgName,
              sortable: true,
            },
            {
              name: "hchgCode",
              selector: (row) => row.hchgCode,
              sortable: true,
            },
            {
              name: "Action",
              cell: (row) => (
                <>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdateData(row.hchgCode)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(row.hchgCode)}
                  >
                    Delete
                  </button>
                </>
              ),
              ignoreRowClick: true,
              allowOverflow: true,
              button: true,
            },
          ]}
          data={filteredNationalities}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        /> */}
        <CustomDataTable
          columns={mainTypePatientColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
          data={filteredNationalities}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </>
  );
};

export default PationMainType;
