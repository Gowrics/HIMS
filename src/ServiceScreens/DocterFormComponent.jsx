import axios from "axios";
import React, { act, useContext, useState } from "react";
import docs from "../assets/download copy.jpg";
import docsimg from "../assets/doctersimg.jpg";
import { submitForm, updateForm } from "../utils/Actions";
import { FormContext } from "../Context/Context";
import { setAlert } from "../redux/slices/dataSlice";
import CustomSelect from "../utils/CustomSelect";
const DocterFormComponent = (props) => {
  const { departmentData, BASE_URL, setValidtationMessage, validtationMessage, docterData, nationalityData, setDocterData, formData, clearForm,
    setFormData, isEditMode, setIsEditMode, } = useContext(FormContext);
  const [showModal, setShowModal] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);

  // const [errors, setErrors] = useState({
  //   doctorName: false,
  //   drNameFl: false,
  //   drImg: false,
  //   drActive: false,
  //   drLicNo: false,
  //   drDesignation: false,
  //   drDesignationFl: false,
  //   drQualifications: false,
  //   drQualificationsFl: false,
  //   drGender: false,
  //   drSrtOrd: false,
  //   costCenterCode: false,
  //   department: { deptCode: false },
  //   nationality: { nationalityCode: false },
  // });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "deptCode") {
      setFormData({
        ...formData,
        department: {
          ...formData.department,
          deptCode: value,
        },
      });
    } else if (name === "nationalityCode") {
      setFormData({
        ...formData,
        nationality: {
          ...formData.nationality,
          nationalityCode: value,
        },
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setShowModal(false);
  };

  const handleUpdate = () => {
    const {
      doctorCode,
      doctorName,
      drNameFl,
      drImg,
      drActive,
      drLicNo,
      drDesignation,
      drDesignationFl,
      drQualifications,
      drQualificationsFl,
      drGender,
      drSrtOrd,
      costCenterCode,
      department: { deptCode },
      nationality: { nationalityCode },
    } = formData;
    const updatedData = {
      doctorCode,
      doctorName,
      drNameFl,
      drImg,
      drActive,
      drLicNo,
      drDesignation,
      drDesignationFl,
      drQualifications,
      drQualificationsFl,
      drGender,
      drSrtOrd,
      costCenterCode,
      department: { deptCode },
      nationality: { nationalityCode },
    };
    console.log(updatedData);
    const url = `${BASE_URL}doctor/update`;
    const id = formData.doctorCode; // The URL for form submission
    updateForm(url, id, updatedData, setDocterData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, props.setAlert);
  };
  const handleSubmit = (e) => {
    console.log("real", formData);
    e.preventDefault();
  

    formData.nationalityCode = Number(formData.nationalityCode);
    formData.deptCode = Number(formData.deptCode);
    formData.sortOrder = Number(formData.sortOrder);
   
    console.log(formData)
    const url = `${BASE_URL}doctor/create`; // The URL for form submission
    submitForm(url, formData, setDocterData, setValidtationMessage, props.setAlert, clearForm);
     };

  return (
    <>
      <section className="h-100 ">
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card card-registration my-4">
                <div className="row g-0">
                  <div className="col-xl-6 d-none d-xl-block">
                    <img src={docsimg} alt="Sample photo" className="img-fluid" style={{ borderTopLeftRadius: ".25rem", width: "100%", height: "100%", borderBottomLeftRadius: ".25rem", }} />
                  </div>
                  <div className="col-xl-6">
                    <div className="card-body p-md-5 text-black">
                      <h3 className="mb-5 text-uppercase">Docters Form</h3>
                      {props.alert.show && (
                        <div className={`alert alert-${props.alert.type}`} role="alert">
                          {props.alert.message}
                        </div>
                      )}
                      <form onSubmit={handleSubmit}>
                        {/* Row 1 */}
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="deptCode" className="form-label">
                              Department Code
                            </label>
                            <CustomSelect
                              id="deptCode"
                              name="deptCode"
                              valueKey="deptCode"   // Dynamic value key
                              labelKey="deptName"
                              data={departmentData}  // Pass the raw data, no need to map
                              value={formData.department.deptCode}
                              onChange={handleChange}
                              isDisabled={props.notEditMode}
                              placeholder="Select an option"
                            />

                          </div>

                          <div className="col-md-4 mb-3">
                            <label htmlFor="doctorName" className="form-label">
                              Doctor Name
                            </label>
                            <input
                              type="text" className={`form-control `} id="doctorName" name="doctorName"
                              value={formData.doctorName} onChange={handleChange} required />
                           
                          </div>

                          <div className="col-md-4 mb-3">
                            <label htmlFor="drNameFl" className="form-label">
                              Doctor Name (FL)
                            </label>
                            <input type="text" className={`form-control `} id="drNameFl" name="drNameFl" value={formData.drNameFl}
                              onChange={handleChange} required />
                           
                          </div>
                        </div>

                        {/* Row 2 */}
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="drGender" className="form-label">
                              Gender
                            </label>
                            <select className={`form-control `} id="drGender" name="drGender"
                              value={formData.drGender} onChange={handleChange} required     >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                           
                          </div>

                          <div className="col-md-4 mb-3">
                            <label htmlFor="drLicNo" className="form-label">
                              License No
                            </label>
                            <input type="text" className={`form-control `}
                              id="drLicNo" name="drLicNo" value={formData.drLicNo} onChange={handleChange} required />
                           
                          </div>

                          <div className="col-md-4 mb-3">
                            <label
                              htmlFor="drDesignation"
                              className="form-label"
                            >
                              Doctor Designation
                            </label>
                            <input type="text" className={`form-control `} id="drDesignation"
                              name="drDesignation" value={formData.drDesignation} onChange={handleChange} required />
                            
                          </div>
                        </div>

                        {/* Row 3 */}
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label
                              htmlFor="doctorDesignationFl"
                              className="form-label"
                            >
                              Doctor Designation (FL)
                            </label>
                            <input type="text" className={`form-control `} id="drDesignationFl"
                              name="drDesignationFl" value={formData.drDesignationFl} onChange={handleChange} required />
                           
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="drQualifications" className="form-label"     >    Doctor Qualifications    </label>
                            <input type="text" className={`form-control `}
                              id="drQualifications" name="drQualifications" value={formData.drQualifications} onChange={handleChange} required />
                           
                          </div>

                          <div className="col-md-4 mb-3">
                            <label htmlFor="drQualificationsFl" className="form-label"  >  Doctor Qualifications (FL)  </label>
                            <input type="text" className={`form-control `} id="drQualificationsFl"
                              name="drQualificationsFl" value={formData.drQualificationsFl} onChange={handleChange} required />
                           
                          </div>
                        </div>

                        {/* Row 4 */}
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="drSrtOrd" className="form-label">
                              Sort Order
                            </label>
                            <input type="number" className={`form-control`} id="drSrtOrd"
                              name="drSrtOrd" value={formData.drSrtOrd} onChange={handleChange} required />
                           
                          </div>

                          <div className="col-md-4 mb-3">
                            <label htmlFor="nationalityCode" className="form-label"   >    Nationality Code           </label>
                            <CustomSelect
                              id="nationalityCode"
                              name="nationalityCode"
                              valueKey="nationalityCode"   // Dynamic value key
                              labelKey="nationality"
                              data={nationalityData}  // Pass the raw data, no need to map
                              value={formData.nationality.nationalityCode}
                              onChange={handleChange}
                              isDisabled={props.notEditMode}
                              placeholder="Select an option"
                            />
                         
                          </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="drImg" className="form-label">    Doctor Image (URL)        </label>
                            <input type="url" className={`form-control `} id="drImg"
                              name="drImg" value={formData.drImg} onChange={handleChange} required />
                             </div>
                        </div>

                        {/* Active Status */}
                        <div className="row">
                          <div className="col-md-4 mb-3">
                            <label htmlFor="costCenterCode" className="form-label" >  Cost Center Code         </label>
                            <input type="text" className={`form-control`} id="costCenterCode"
                              name="costCenterCode" value={formData.costCenterCode} onChange={handleChange} required />
                             </div>
                          <div className="col-md-4 mb-3">
                            <label htmlFor="drActive" className="form-label">     Active      </label>
                            <select className="form-control" id="drActive" name="drActive" value={formData.drActive} onChange={handleChange}  >
                              <option value="YES">Yes</option>
                              <option value="NO">No</option>
                            </select>
                          </div>
                        </div>
                        {!isEditMode ? (
                          <button type="submit" className="btn btn-primary">
                            Create+
                          </button>
                        ) : (
                          <>
                            <button type="button" onClick={handleUpdate} className="btn btn-success">
                              Update
                            </button>
                            <button type="button" onClick={() => { setIsEditMode(false); setShowModal(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">
                              Cancel
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          className="btn btn-primary ms-4"
                          onClick={props.handleShowModal}
                        >
                          Docters List
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DocterFormComponent;
