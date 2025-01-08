import axios from "axios";
import React, { act, useContext, useState } from "react";
import { FormContext } from "../FormContext";
import docs from "../assets/download copy.jpg";
const DocterFormComponent = (props) => {
  const {
    departmentData,
    docterData,
    nationalityData,
    setDocterData,
    formData,
    setFormData,
    isEditMode,
    setIsEditMode,
  } = useContext(FormContext);
  const [errors, setErrors] = useState({
    doctorName: false,
    drNameFl: false,
    drImg: false,
    drActive: false,
    drLicNo: false,
    drDesignation: false,
    drDesignationFl: false,
    drQualifications: false,
    drQualificationsFl: false,
    drGender: false,
    drSrtOrd: false,
    costCenterCode: false,
    department: { deptCode: false },
    nationality: { nationalityCode: false },
  });
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
      setFormData({ ...formData, [name]: value });
    }
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
    console.log("ddddd", formData);
    axios
      .put(
        `http://192.168.91.201:8082/doctor/update/${formData.doctorCode}`,
        updatedData
      )
      .then((res) => {
        console.log("Updated successfully:", res.data);
        axios
          .get("http://192.168.91.201:8082/doctor/getAll")
          .then((res) => {
            setDocterData(res.data);
            setIsEditMode(false); // Hide update form after successful update
            setFormData({
              doctorName: "",
              drNameFl: "",
              drImg: "",
              drActive: "",
              drLicNo: "",
              drDesignation: "",
              drDesignationFl: "",
              drQualifications: "",
              drQualificationsFl: "",
              drGender: "",
              drSrtOrd: 0,
              costCenterCode: "",
              department: { deptCode: 0 },
              nationality: { nationalityCode: 0 },
            });
          })
          .catch((err) => console.log("Error fetching data:", err));
      })
      .catch((err) => console.log("Error updating data:", err));
  };
  const handleSubmit = (e) => {
    console.log("real", formData);
    e.preventDefault();
    // Validation
    let validationErrors = { ...errors };
    validationErrors.doctorName = !formData.doctorName;
    validationErrors.drNameFl = !formData.drNameFl;
    validationErrors.drImg = !formData.drImg;
    validationErrors.drActive = !formData.drActive;
    validationErrors.drLicNo = !formData.drLicNo;
    validationErrors.drDesignation = !formData.drDesignation;
    validationErrors.drDesignationFl = !formData.drDesignationFl;
    validationErrors.drQualifications = !formData.drQualifications;
    validationErrors.drQualificationsFl = !formData.drQualificationsFl;
    validationErrors.drGender = !formData.drGender;
    validationErrors.drSrtOrd = !formData.drSrtOrd;
    validationErrors.costCenterCode = !formData.costCenterCode;
    validationErrors.department = {
      deptCode: !formData.department.deptCode,
    };
    validationErrors.nationality = {
      nationalityCode: !formData.nationality.nationalityCode,
    };

    setErrors(validationErrors);

    formData.nationalityCode = Number(formData.nationalityCode);
    formData.deptCode = Number(formData.deptCode);
    formData.sortOrder = Number(formData.sortOrder);
    // If no errors, you can submit the form data
    if (!Object.values(validationErrors).includes(true)) {
      axios
        .post("http://192.168.91.201:8082/doctor/create", formData)
        .then(() => {
          alert("Form Submitted Successfully.");
          return axios.get("http://192.168.91.201:8082/doctor/getAll");
        })
        .then((res) => {
          setDocterData(res.data);
        })
        .catch((err) => console.log("Error submitting form:", err));

      // Reset form data
      setFormData({
        doctorName: "",
        drNameFl: "",
        drImg: "",
        drActive: "",
        drLicNo: "",
        drDesignation: "",
        drDesignationFl: "",
        drQualifications: "",
        drQualificationsFl: "",
        drGender: "",
        drSrtOrd: 0,
        costCenterCode: "",
        department: { deptCode: 0 },
        nationality: { nationalityCode: 0 },
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="row docterfrom">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="deptCode" className="form-label">
                    Department Code
                  </label>
                  <select
                    className={`form-control ${
                      errors.deptCode ? "is-invalid" : ""
                    }`}
                    id="deptCode"
                    name="deptCode"
                    value={formData.deptCode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentData.map((dept) => (
                      <option key={dept.id} value={dept.deptCode}>
                        {dept.deptCode}
                      </option>
                    ))}
                  </select>
                  {errors.deptCode && (
                    <div className="invalid-feedback">{errors.deptCode}</div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="doctorName" className="form-label">
                    Doctor Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.doctorName ? "is-invalid" : ""
                    }`}
                    id="doctorName"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                  />
                  {errors.doctorName && (
                    <div className="invalid-feedback">
                      Doctor Name is required.
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="drNameFl" className="form-label">
                    Doctor Name (FL)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drNameFl ? "is-invalid" : ""
                    }`}
                    id="drNameFl"
                    name="drNameFl"
                    value={formData.drNameFl}
                    onChange={handleChange}
                    required
                  />
                  {errors.drNameFl && (
                    <div className="invalid-feedback">
                      Doctor Name (FL) is required.
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="drGender" className="form-label">
                    Gender
                  </label>
                  <select
                    className={`form-control ${
                      errors.drGender ? "is-invalid" : ""
                    }`}
                    id="drGender"
                    name="drGender"
                    value={formData.drGender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.drGender && (
                    <div className="invalid-feedback">Gender is required.</div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="drLicNo" className="form-label">
                    License No
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drLicNo ? "is-invalid" : ""
                    }`}
                    id="drLicNo"
                    name="drLicNo"
                    value={formData.drLicNo}
                    onChange={handleChange}
                    required
                  />
                  {errors.drLicNo && (
                    <div className="invalid-feedback">
                      License No is required.
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="drDesignation" className="form-label">
                    Doctor Designation
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drDesignation ? "is-invalid" : ""
                    }`}
                    id="drDesignation"
                    name="drDesignation"
                    value={formData.drDesignation}
                    onChange={handleChange}
                    required
                  />
                  {errors.drDesignation && (
                    <div className="invalid-feedback">
                      Doctor Designation is required.
                    </div>
                  )}
                </div>
              </div>

              {/* Row 3 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="doctorDesignationFl" className="form-label">
                    Doctor Designation (FL)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drDesignationFl ? "is-invalid" : ""
                    }`}
                    id="drDesignationFl"
                    name="drDesignationFl"
                    value={formData.drDesignationFl}
                    onChange={handleChange}
                    required
                  />
                  {errors.drDesignationFl && (
                    <div className="invalid-feedback">
                      Doctor Name (FL) is required.
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="drQualifications" className="form-label">
                    Doctor Qualifications
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drQualifications ? "is-invalid" : ""
                    }`}
                    id="drQualifications"
                    name="drQualifications"
                    value={formData.drQualifications}
                    onChange={handleChange}
                    required
                  />
                  {errors.drQualifications && (
                    <div className="invalid-feedback">
                      Doctor Qualifications are required.
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="drQualificationsFl" className="form-label">
                    Doctor Qualifications (FL)
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.drQualificationsFl ? "is-invalid" : ""
                    }`}
                    id="drQualificationsFl"
                    name="drQualificationsFl"
                    value={formData.drQualificationsFl}
                    onChange={handleChange}
                    required
                  />
                  {errors.drQualificationsFl && (
                    <div className="invalid-feedback">
                      Doctor Qualifications (FL) are required.
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4 */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="drSrtOrd" className="form-label">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    className={`form-control ${
                      errors.drSrtOrd ? "is-invalid" : ""
                    }`}
                    id="drSrtOrd"
                    name="drSrtOrd"
                    value={formData.drSrtOrd}
                    onChange={handleChange}
                    required
                  />
                  {errors.drSrtOrd && (
                    <div className="invalid-feedback">
                      Sort Order is required.
                    </div>
                  )}
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="nationalityCode" className="form-label">
                    Nationality Code
                  </label>
                  <select
                    type="number"
                    className={`form-control ${
                      errors.nationalityCode ? "is-invalid" : ""
                    }`}
                    id="nationalityCode"
                    name="nationalityCode"
                    value={formData.nationalityCode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Nationality Code</option>
                    {nationalityData.map((nationality) => (
                      <option
                        key={nationality.id}
                        value={nationality.nationalityCode}
                      >
                        {nationality.nationalityCode}
                      </option>
                    ))}
                  </select>
                  {errors.nationality.nationalityCode && (
                    <div className="invalid-feedback">
                      Nationality Code is required.
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="drImg" className="form-label">
                    Doctor Image (URL)
                  </label>
                  <input
                    type="url"
                    className={`form-control ${
                      errors.drImg ? "is-invalid" : ""
                    }`}
                    id="drImg"
                    name="drImg"
                    value={formData.drImg}
                    onChange={handleChange}
                    required
                  />
                  {errors.drImg && (
                    <div className="invalid-feedback">
                      Doctor Image URL is required.
                    </div>
                  )}
                </div>
              </div>

              {/* Active Status */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="costCenterCode" className="form-label">
                    Cost Center Code
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.costCenterCode ? "is-invalid" : ""
                    }`}
                    id="costCenterCode"
                    name="costCenterCode"
                    value={formData.costCenterCode}
                    onChange={handleChange}
                    required
                  />
                  {errors.costCenterCode && (
                    <div className="invalid-feedback">
                      Cost Center Code is required.
                    </div>
                  )}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="drActive" className="form-label">
                    Active
                  </label>
                  <select
                    className="form-control"
                    id="drActive"
                    name="drActive"
                    value={formData.drActive}
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
              <button
                type="button"
                className="btn btn-primary ms-4"
                onClick={props.handleShowModal}
              >
                Docters List
              </button>
            </form>
          </div>
          <div className="col-md-6 col-sm-12 image-column">
            <img src={docs} alt="Description of Image" />{" "}
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default DocterFormComponent;
