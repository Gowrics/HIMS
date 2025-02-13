import React, { useCallback, useContext, useState } from "react";
import Breadcrumbs from "../Component/BreadCrumbs";
import { docterColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem } from "../utils/Actions";
import DocterFormComponent from "./DocterFormComponent";
import { FormContext } from "../Context/Context";
import ExportData from "../utils/Export";
// import { docterData } from "../assets/ArrayData";
const DoctorForm = () => {
  const { docterData,  setDocterData,  formData,  searchTerm,BASE_URL,setValidtationMessage,setSearchTerm, setFormData,   isEditMode,   setIsEditMode, } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const handleCloseModal = () => setShowModal(false);
  const [notEditMode, setNotEditMode] = useState(false);

  const handleUpdateData = (id) => {
    setNotEditMode(true)

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

    const handleDelete = useCallback((id) => {
     handleDeleteItem({
          id,
          url: `${BASE_URL}doctor/delete`,
          setValidtationMessage,
          data: docterData,
          setAlert,
          setData: setDocterData,
          itemKey: "doctorCode", // Key to identify the item in the dataset
        });
      },[BASE_URL, docterData, setDocterData, setValidtationMessage]);
  
  return (
    <>
      <div className="container page-content">
        <h2>Doctor Form</h2>
       
        <DocterFormComponent handleShowModal={handleShowModal} alert={alert} setAlert={setAlert} notEditMode={notEditMode} />

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
                                       <ExportData   url={`${BASE_URL}doctor/export`}   fileName="doctor"   previewData={docterData} />
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
