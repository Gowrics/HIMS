import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DocterFormComponent from "../Component/DocterFormComponent";
import { FormContext } from "../FormContext";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Breadcrumbs from "../Component/BreadCrumbs";
// import { docterData } from "../assets/ArrayData";
const DoctorForm = () => {
  const {
    docterData,
    setDocterData,
    formData,
    searchTerm,
    setSearchTerm,
    setFormData,
    isEditMode,
    setIsEditMode,
  } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // useEffect(() => {
  //   axios
  //     .get("http://192.168.91.201:8082/doctor/getAll")
  //     .then((res) => {
  //       setDocterData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching data:", err);
  //     });
  // }, []);

  const handleUpdateData = (id) => {
    handleCloseModal(); //when i am edit the button it go to update form

    const itemToUpdate = docterData.find((item) => item.doctorCode === id);
    if (itemToUpdate) {
      setFormData({
        doctorCode: itemToUpdate.doctorCode,
        doctorName: itemToUpdate.doctorName,
        drNameFl: itemToUpdate.drNameFl,
        drImg: itemToUpdate.drImg,
        drActive: itemToUpdate.drActive,
        drLicNo: itemToUpdate.drLicNo,
        drDesignation: itemToUpdate.drDesignation,
        drDesignationFl: itemToUpdate.drDesignationFl,
        drQualifications: itemToUpdate.drQualifications,
        drQualificationsFl: itemToUpdate.drQualificationsFl,
        drGender: itemToUpdate.drGender,
        drSrtOrd: itemToUpdate.drSrtOrd,
        costCenterCode: itemToUpdate.costCenterCode,
        department: { deptCode: itemToUpdate.department?.deptCode || 0 },
        nationality: {
          nationalityCode: itemToUpdate.nationality?.nationalityCode || 0,
        },
      });
      setIsEditMode(true); // Show update form
    } else {
      console.log("Item not found!");
    }
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      axios
        .delete(`http://192.168.91.201:8082/doctor/delete/${id}`)
        .then((res) => {
          console.log("Deleted successfully:", res.data);
          const updatedData = docterData.filter(
            (item) => item.doctorCode !== id
          );
          setDocterData(updatedData);
        })
        .catch((err) => console.log("Error deleting data:", err));
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter nationality data based on the search term
  const filteredDocter = docterData.filter(
    (item) =>
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.drNameFl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.drDesignation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container page-content">
        <h2>Doctor Form</h2>
        <DocterFormComponent handleShowModal={handleShowModal} />

        {/* Modal */}
        <div
          className={`modal fade ${showModal ? "show" : ""}`}
          tabIndex="-1"
          style={{ display: showModal ? "block" : "none" }}
        >
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              {/* Modal Header */}
              <div className="modal-header">
                <h5 className="modal-title">Doctors Information</h5>
                <button
                  type="button"
                  className="btn-close btn-danger"
                  onClick={handleCloseModal}
                ></button>
              </div>
              {/* Modal Body */}
              <div className="modal-body">
                <div className="table-responsive">
                  <h1>Docters Data</h1>
                  <input
                    type="text"
                    placeholder="Search docter by docter name, docter designation"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control my-2"
                  />
                  <DataTable
                    className="table table-striped"
                    columns={[
                      {
                        name: "  Doctor Code",
                        selector: (row) => row.doctorCode,
                        sortable: true,
                      },
                      {
                        name: " Department Code",
                        selector: (row) => row.department.deptCode,
                        sortable: true,
                      },
                      {
                        name: " Doctor Name",
                        selector: (row) => row.doctorName,
                        sortable: true,
                      },
                      {
                        name: "  Doctor Name (FL)",
                        selector: (row) => row.drNameFl,
                        sortable: true,
                      },
                      {
                        name: " Gender",
                        selector: (row) => row.drGender,
                        sortable: true,
                      },
                      {
                        name: "  License No",
                        selector: (row) => row.drLicNo,
                        sortable: true,
                      },
                      {
                        name: " Doctor Designation",
                        selector: (row) => row.drDesignation,
                        sortable: true,
                      },
                      {
                        name: "   Doctor Designation (FL)",
                        selector: (row) => row.drDesignationFl,
                        sortable: true,
                      },
                      {
                        name: "   Doctor Qualifications",
                        selector: (row) => row.drQualifications,
                        sortable: true,
                      },
                      {
                        name: " Doctor Qualifications (FL)",
                        selector: (row) => row.drQualificationsFl,
                        sortable: true,
                      },
                      {
                        name: " Sort Order",
                        selector: (row) => row.drSrtOrd,
                        sortable: true,
                      },
                      {
                        name: "   Nationality Code",
                        selector: (row) => row.nationality.nationalityCode,
                        sortable: true,
                      },
                      {
                        name: " Doctor Image (URL)",
                        selector: (row) => row.drImg,
                        sortable: true,
                      },
                      {
                        name: "     Cost Center Code",
                        selector: (row) => row.costCenterCode,
                        sortable: true,
                      },
                      {
                        name: " Docter Active",
                        selector: (row) => row.drActive,
                        sortable: true,
                      },
                      {
                        name: "Action",
                        cell: (row) => (
                          <>
                            <button
                              className="btn btn-primary  btn-sm"
                              onClick={() => handleUpdateData(row.doctorCode)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(row.doctorCode)}
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
                    data={filteredDocter}
                    pagination
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[3, 5, 10, 15, 20]}
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
              </div>
              {/* Modal Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorForm;
