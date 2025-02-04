import React, { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import Breadcrumbs from "../Component/BreadCrumbs";
import { departmentColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../ReusableComponent/Actions";
// import { departmentData } from "../assets/ArrayData";

const Departments = () => {
  const {
    departmentData,BASE_URL,validtationMessage, setValidtationMessage,
    setDepartmentData, searchTerm, setSearchTerm,isEditMode, setIsEditMode,
  } = useContext(FormContext);
 const [showModal, setShowModal] = useState(false);
  const initialFormData ={
    deptCode: 0,
    deptName: "", // Updated to deptName
    deptNameFl: "", // Updated to deptNameFl
    deptImage: "", // Updated to deptImg
    deptGeneral: "", // Default to "Y"
  }
  const [formData, setFormData] =useState(initialFormData);
  const clearForm = () => {
    setFormData(initialFormData);
  };
 
  const [errors, setErrors] = useState({
    deptCode: false,
    deptName: false, // Updated to deptName
    deptNameFl: false, // Updated to deptNameFl
    deptImage: false, // Updated to deptImg
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setShowModal(false);
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
      console.log(formData)
       const url = `${BASE_URL}department/create`; // The URL for form submission
        submitForm(url, formData, setDepartmentData, setValidtationMessage, setShowModal, clearForm);
         }
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
 console.log(updatedData);
      const url = `${BASE_URL}department/update`;
      const id =formData.deptCode; // The URL for form submission
      updateForm( url,id,updatedData, setDepartmentData, setValidtationMessage,  setShowModal, setIsEditMode, false, clearForm );
  
  };
  
const handleDelete = (id) => {
   handleDeleteItem({
          id,
          url: `${BASE_URL}department/delete`,
          setValidtationMessage,setShowModal,
          data: departmentData,
          setData: setDepartmentData,
          itemKey: "deptCode", // Key to identify the item in the dataset
        });
      };
  

  return (
    <>
      <div className="container  page-content">
        <h2>Department Form</h2>
        <div tabIndex="-1" className={`alert alert-danger border border-danger small p-2 mt-2 ${showModal ? "d-block" : "d-none"}`} role="alert">
          <h6 className="m-0">{validtationMessage}</h6>
        </div>
        <form   onSubmit={handleSubmit}   onClick={() => {setShowModal(false);}}>
          <div className="row">
            {/* Dept Name */}
            <div className="col-md-3 mb-3">
              <label htmlFor="deptName" className="form-label">
                Department Name
              </label>
              <input   type="text"    className={`form-control ${errors.deptName ? "is-invalid" : ""    }`}  id="deptName"
                name="deptName"    value={formData.deptName}   onChange={handleChange}      required    />
              {errors.deptName && ( <div className="invalid-feedback">  Department Name is required.   </div> )}
            </div>

            {/* Dept Name (FL) */}
            <div className="col-md-3 mb-3">
              <label htmlFor="deptNameFl" className="form-label">
                Department Name (FL)
              </label>
              <input   type="text" className={`form-control ${errors.deptNameFl ? "is-invalid" : ""  }`} id="deptNameFl"
                name="deptNameFl" value={formData.deptNameFl} onChange={handleChange}   required     />
              {errors.deptNameFl && (<div className="invalid-feedback"> Department Name (FL) is required.  </div>   )}
            </div>
          </div>

          <div className="row">
            {/* Dept Img */}
            <div className="col-md-4 mb-3">
              <label htmlFor="deptImage" className="form-label">
                Department Image (URL)
              </label>
              <input type="url"  className={`form-control ${errors.deptImage ? "is-invalid" : ""  }`}
                id="deptImage"   name="deptImage"  value={formData.deptImage} onChange={handleChange}  required  />
              {errors.deptImage && (<div className="invalid-feedback"> Department Image URL is required.    </div>  )}
            </div>

            {/* Dept General */}
            <div className="col-md-4 mb-3">
              <label htmlFor="deptGeneral" className="form-label">
                Department General
              </label>
              <select  className="form-control"  id="deptGeneral" name="deptGeneral"  value={formData.deptGeneral}  onChange={handleChange}  >
                  <option value="">Select an Option</option>
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
    <button type="button" onClick={() => {setIsEditMode(false); setShowModal(false);clearForm();}} className=" ms-4 btn btn-secondary">
      Cancel
    </button>
  </>
)}
        </form>
        <h1>Department Data</h1>
        <input  type="text"  placeholder="Search department"  value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2"  />
          <CustomDataTable
            columns={departmentColumn(handleUpdateData, handleDelete)} // Pass functions as arguments
            data={filterData(departmentData, searchTerm, ["deptName","deptNameFl"],)}
            paginationPerPage={5}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
                />
                     </div>
    </>
  );
};
export default Departments;









 // const handleDelete = (id) => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete?");
  //   if (isConfirmed) {
  //     axios
  //       .delete(`http://192.168.91.201:8082/department/delete/${id}`)
  //       .then((res) => {
  //         console.log("Deleted successfully:", res.data);
  //         const updatedData = departmentData.filter(
  //           (item) => item.deptCode !== id
  //         );
  //         setDepartmentData(updatedData);
  //       })
  //       .catch((err) => console.log("Error deleting data:", err));
  //   }
  // };
 // axios
      //   .post("http://192.168.91.201:8082/department/create", formData)
      //   .then((res) => {
      //     console.log("Form submitted successfully:", res.data);
      //     console.log("//////////////////");

      //     alert("Form Submitted Successfully..");
      //   });
      // axios.get("http://192.168.91.201:8082/department/getAll").then((res) => {
      //   setDepartmentData(res.data); // Set the nationality data as an array
      //   console.log(departmentData);
      // });

        // axios
    //   .put(
    //     `http://192.168.91.201:8082/department/update/${deptCode}`,
    //     updatedData
    //   )
    //   .then((res) => {
    //     console.log("Updated successfully:", res.data);
    //     axios
    //       .get("http://192.168.91.201:8082/department/getAll")
    //       .then((res) => {
    //         setDepartmentData(res.data);
    //         setIsEditMode(false); // Hide update form after successful update
    //         setFormData({
    //           deptCode: 0,
    //           deptName: "",
    //           deptNameFl: "",
    //           deptImage: "",
    //           deptGeneral: "",
    //         });
    //       })
    //       .catch((err) => console.log("Error fetching data:", err));
    //   })
    //   .catch((err) => console.log("Error updating data:", err));