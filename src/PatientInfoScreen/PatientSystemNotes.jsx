import React, { useContext, useState } from "react";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext } from "../Context/Context";
import { patientSystemNotesDataColumn } from "../utils/ArrayData1";
const PatientSystemNotes = () => {
  
  const {
    setValidtationMessage, patientDataMasterData,BASE_URL,patientSystemNotesData, setPatientSystemNotesData,
     patientsSubTypeData, } = useContext(FormContext);
  const [isEditMode, setIsEditMode] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const initialFormData = {
    //id
    patientDataMaster: {
      patientCode: null,
    },
    notesAddedBy: "",
    active: "",
    notesAddedDatetime:""
  };

  const [formData, setFormData] = useState(initialFormData);

  // Clear the form
  const clearForm = () => {
    setFormData(initialFormData);
  };
  // Handle patientMainTypeData changes (for select input)
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      if (name === "patientCode") {
        return {
          ...prevData,
          patientDataMaster: {
            ...prevData.patientDataMaster,
            patientCode: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Payload sent to API:", formData);
    const url = `${BASE_URL}patientSystemNotes/create`; // The URL for form submission
    submitForm(url, formData, setPatientSystemNotesData, setValidtationMessage, setAlert, clearForm);

  };
  
  const handleUpdateData = (id) => {
    setNotEditMode(true)
    const itemToUpdate = patientSystemNotesData.find((item) => item.tpaCode === id);

    if (itemToUpdate) {
      setFormData({
        notesAddedBy: itemToUpdate.notesAddedBy,
        notesAddedDatetime: itemToUpdate.notesAddedDatetime,
        active: itemToUpdate.active,
        patientDataMaster: {
          patientCode: itemToUpdate.patientDataMaster?.patientCode || 0,
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
      url: `${BASE_URL}patientSystemNotes/delete`, setValidtationMessage, setAlert,
      data: patientSystemNotesData,
      setData: setPatientSystemNotesData,
      itemKey: "id", // Key to identify the item in the dataset
    });
  };

  const handleUpdate = () => {

    const {
    
      notesAddedBy,
      notesAddedDatetime,
      active,
      patientDataMaster: { patientCode },
    } = formData;
    const updatedData = {
      notesAddedBy,
      notesAddedDatetime,
      active,
      patientDataMaster: { patientCode },
    };
    console.log(formData);
    console.log(updatedData);
    const url = `${BASE_URL}patientSystemNotes/update`;
    const id = formData.tpaCode; // The URL for form submission
    updateForm(url, id, updatedData, setPatientSystemNotesData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
  };
  return (
    <>
      <div className="container page-content">
        <h2>Patient_System_notes </h2>
        {alert.show && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="notesAddedBy" className="form-label">
              notesAddedBy Name
              </label>
              <input className="form-control" id="notesAddedBy" name="notesAddedBy" value={formData.notesAddedBy} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label htmlFor="active" className="form-label">
                Active
              </label>
              <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange}  >
                <option value="">Select an Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
              </select>
            </div>
          </div>


          <div className="row mb-3">
            <div className="col-md-4">
    <label htmlFor="schgCode" className="form-label">
      Patient Sub Type (schgCode)
    </label>
            <CustomSelect
              id="patientCode"
              name="patientCode"
               valueKey="patientCode"   // Dynamic value key
              labelKey="patientName"   
              data={patientDataMasterData}  // Pass the raw data, no need to map
              value={formData.patientDataMaster.patientCode}
              onChange={handleChange}
              isDisabled={notEditMode}
              placeholder="Select an option"
            />
</div>
          </div>
          {!isEditMode ? (
            <button type="submit" className="btn btn-primary">      Create+         </button>
          ) : (
            <>
              <button type="button" onClick={handleUpdate} className="btn btn-success">     Update        </button>
              <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">    Cancel       </button>
            </>
          )}
        </form>
        
        <input     type="text"      placeholder="Search hchgName"    value={searchTerm}    onChange={(e) => setSearchTerm(e.target.value)}     className="form-control my-2"     />
        <CustomDataTable
          columns={patientSystemNotesDataColumn(handleUpdateData, handleDelete)}
          data={filterData(patientSystemNotesData, searchTerm, ["tpaName", "tpaCode"],)}
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
       <ExportData   url={`${BASE_URL}patientSystemNotes/export`}   fileName="Patient_System_notes"   previewData={patientsSubTypeData} />
      </div>
    </>
  );
};
export default PatientSystemNotes
