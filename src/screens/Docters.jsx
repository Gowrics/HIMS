import React, { useContext, useState } from "react";
import DocterFormComponent from "../Component/DocterFormComponent";
import { FormContext } from "../FormContext";
import Breadcrumbs from "../Component/BreadCrumbs";
import { docterColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem } from "../ReusableComponent/Actions";
// import { docterData } from "../assets/ArrayData";
const DoctorForm = () => {
  const { docterData,  setDocterData,  formData,  searchTerm, setSearchTerm, setFormData,   isEditMode,   setIsEditMode, } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
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
   handleDeleteItem({
          id,
          url: "http://192.168.91.201:8082/doctor/delete",
          data: docterData,
          setData: setDocterData,
          itemKey: "doctorCode", // Key to identify the item in the dataset
        });
      };
  
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
                  <input  type="text"  placeholder="Search docter"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2"  />
                    <CustomDataTable
                    columns={docterColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
                    data={filterData(docterData, searchTerm, ["doctorName","drDesignation"],)}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
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
