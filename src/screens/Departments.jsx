import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import DataTable from "react-data-table-component";
import { FormContext } from "../FormContext";
import { departmentData } from "../assets/ArrayData";

const Departments = () => {
  const {
    //  departmentData,
    setDepartmentData,
    isEditMode,
    setIsEditMode,
  } = useContext(FormContext);

  const [formData, setFormData] = useState({
    deptCode: 0,
    deptName: "", // Updated to deptName
    deptNameFl: "", // Updated to deptNameFl
    deptImage: "", // Updated to deptImg
    deptGeneral: "Y", // Default to "Y"
  });

  const [errors, setErrors] = useState({
    deptCode: false,
    deptName: false, // Updated to deptName
    deptNameFl: false, // Updated to deptNameFl
    deptImage: false, // Updated to deptImg
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateData = (id) => {
    const itemToUpdate = departmentData.find((item) => item.deptCode === id);
    if (itemToUpdate) {
      setFormData({
        deptCode: itemToUpdate.deptCode,
        deptName: itemToUpdate.deptName,
        deptNameFl: itemToUpdate.deptNameFl,
        deptImage: itemToUpdate.deptImage,
        deptGeneral: itemToUpdate.deptGeneral,
        // id: itemToUpdate.id, // Add the id to form data for updating
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleUpdate = () => {
    const { deptCode, deptName, deptNameFl, deptImage, deptGeneral } = formData;
    const updatedData = {
      deptCode,
      deptName,
      deptNameFl,
      deptImage,
      deptGeneral,
    };

    axios
      .put(
        `http://192.168.91.201:8082/department/update/${deptCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/department/getAll")
          .then((res) => {
            setDepartmentData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            setFormData({
              deptCode: 0,
              deptName: "",
              deptNameFl: "",
              deptImage: "",
              deptGeneral: "",
            });
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) => console.log("Error updating data:", err));
  };
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://192.168.91.201:8082/department/delete/${id}`)
        .then((res) => {
          console.log("Deleted successfully:", res.data);
          const updatedData = departmentData.filter(
            (item) => item.deptCode !== id
          );
          setDepartmentData(updatedData);
        })
        .catch((err) => console.log("Error deleting data:", err));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let validationErrors = { ...errors };
    validationErrors.deptCode = !formData.deptCode;
    validationErrors.deptName = !formData.deptName;
    validationErrors.deptNameFl = !formData.deptNameFl;
    validationErrors.deptImage = !formData.deptImage;
    setErrors(validationErrors);
    console.log(formData);
    // If no errors, you can submit the form data
    if (
      // !validationErrors.deptCode &&
      !validationErrors.deptName &&
      !validationErrors.deptNameFl &&
      !validationErrors.deptImage
    ) {
      axios
        .post("http://192.168.91.201:8082/department/create", formData)
        .then((res) => {
          console.log("Form submitted successfully:", res.data);
          console.log("//////////////////");

          alert("Form Submitted Successfully..");
        });
      axios.get("http://192.168.91.201:8082/department/getAll").then((res) => {
        setDepartmentData(res.data); // Set the nationality data as an array
        console.log(departmentData);
      });
    }
    setFormData({
      deptCode: 0,
      deptName: "",
      deptNameFl: "",
      deptImage: "",
      deptGeneral: "",
    });
  };

  return (
    <div className="container mt-5 page-content">
      <h2>Department Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Dept Name */}
          <div className="col-md-3 mb-3">
            <label htmlFor="deptName" className="form-label">
              Department Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.deptName ? "is-invalid" : ""}`}
              id="deptName"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              required
            />
            {errors.deptName && (
              <div className="invalid-feedback">
                Department Name is required.
              </div>
            )}
          </div>

          {/* Dept Name (FL) */}
          <div className="col-md-3 mb-3">
            <label htmlFor="deptNameFl" className="form-label">
              Department Name (FL)
            </label>
            <input
              type="text"
              className={`form-control ${
                errors.deptNameFl ? "is-invalid" : ""
              }`}
              id="deptNameFl"
              name="deptNameFl"
              value={formData.deptNameFl}
              onChange={handleChange}
              required
            />
            {errors.deptNameFl && (
              <div className="invalid-feedback">
                Department Name (FL) is required.
              </div>
            )}
          </div>
        </div>

        <div className="row">
          {/* Dept Img */}
          <div className="col-md-4 mb-3">
            <label htmlFor="deptImage" className="form-label">
              Department Image (URL)
            </label>
            <input
              type="url"
              className={`form-control ${errors.deptImage ? "is-invalid" : ""}`}
              id="deptImage"
              name="deptImage"
              value={formData.deptImage}
              onChange={handleChange}
              required
            />
            {errors.deptImage && (
              <div className="invalid-feedback">
                Department Image URL is required.
              </div>
            )}
          </div>

          {/* Dept General */}
          <div className="col-md-4 mb-3">
            <label htmlFor="deptGeneral" className="form-label">
              Department General
            </label>
            <select
              className="form-control"
              id="deptGeneral"
              name="deptGeneral"
              value={formData.deptGeneral}
              onChange={handleChange}
            >
              <option value="YES">Yes</option>
              <option value="NO">No</option>
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
            onClick={() => handleUpdate()}
            className="btn btn-success"
          >
            Update
          </button>
        )}
      </form>

      <DataTable
        className="table table-striped"
        columns={[
          {
            name: "Department Code",
            selector: (row) => row.deptCode,
            sortable: true,
          },
          {
            name: "Department Name",
            selector: (row) => row.deptName,
            sortable: true,
          },
          {
            name: "Department Name (FL)",
            selector: (row) => row.deptNameFl,
            sortable: true,
          },
          {
            name: ",Department Image",
            selector: (row) => row.deptImage,
            sortable: true,
          },
          {
            name: ",Department General",
            selector: (row) => row.deptGeneral,
            sortable: true,
          },
          {
            name: "Action",
            cell: (row) => (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUpdateData(row.deptCode)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(row.deptCode)}
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
        data={departmentData}
        pagination
        paginationPerPage={5}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        customStyles={{
          header: {
            style: {
              backgroundColor: "#343a40",
              color: "#ffffff",
            },
          },
          headCells: {
            style: {
              fontWeight: "bold",
              backgroundColor: "#6c757d",
              color: "#ffffff",
            },
          },
          cells: {
            style: {
              paddingLeft: "8px",
              paddingRight: "8px",
            },
          },
        }}
      />

      {/* 
      <table className="table table-striped border">
        <thead>
          <tr>
            <th className="bg-secondary text-white">Department Code</th>
            <th className="bg-secondary text-white">Department Name</th>
            <th className="bg-secondary text-white">Department Name (FL)</th>
            <th className="bg-secondary text-white"> Department Image</th>
            <th className="bg-secondary text-white">Department General</th>
            <th className="bg-secondary text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.length > 0 ? (
            departmentData.map((item) => (
              <tr key={item.id}>
                <td>{item.deptCode}</td>
                <td>{item.deptName}</td>
                <td>{item.deptNameFl}</td>
                <td>{item.deptImage}</td>
                <td>{item.deptGeneral}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => handleUpdateData(item.deptCode)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.deptCode)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No user found</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
};

export default Departments;
