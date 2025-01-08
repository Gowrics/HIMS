import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FormContext } from "../FormContext";
import DataTable from "react-data-table-component";

const Nationality = () => {
  const { nationalityData, setNationalityData, isEditMode, setIsEditMode } =
    useContext(FormContext);
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

  useEffect(() => {
    // Fetch data from a mock API or your backend
    axios
      .get("http://192.168.91.201:8082/nationality/getAll")
      .then((response) => setNationalityData(response.data))
      .catch((err) => console.log("Error fetching data:", err));
  }, []);

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

  const handleUpdate = () => {
    const { nationality, nationalityFl, nationalityCode } = formData;
    const updatedData = {
      nationality,
      nationalityFl,
      nationalityCode,
    };
    console.log(formData);
    console.log(updatedData);

    axios
      .put(
        `http://192.168.91.201:8082/nationality/update/${formData.nationalityCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/nationality/getAll")
          .then((res) => {
            setNationalityData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            setFormData({
              nationality: "",
              nationalityFl: "",
            });
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) =>
        alert("The data is already present in another child table.", err)
      );
  };

  return (
    <div className="container page-content mt-5">
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
              <div className="invalid-feedback">Nationality FL is required</div>
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
      <DataTable
        className="table table-striped"
        columns={[
          {
            name: "Nationality",
            selector: (row) => row.nationality,
            sortable: true,
          },
          {
            name: "Nationality (FL)",
            selector: (row) => row.nationalityFl,
            sortable: true,
          },
          {
            name: "Nationality Code",
            selector: (row) => row.nationalityCode,
            sortable: true,
          },
          {
            name: "Action",
            cell: (row) => (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleUpdateData(row.nationalityCode)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(row.nationalityCode)}
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
        data={nationalityData}
        pagination
        paginationPerPage={10}
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
    </div>
  );
};

export default Nationality;
