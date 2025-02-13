import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
//------------------------------------------------- Fetch Data Table ---------------------------------------------------

export const CustomDataTable = ({
  columns,
  data,
  pagination = true,
  paginationPerPage = 5,
  paginationRowsPerPageOptions = [5, 10, 15, 20],
  customStyles,
  onRowSelect, // Callback function for selected rows
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = (selected) => {
    setSelectedRows(selected.selectedRows);
    if (onRowSelect) {
      onRowSelect(selected.selectedRows); // Pass selected rows to parent
          }
          console.log(selected.selectedRows)
  };

  const defaultStyles = {
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
  };

  return (
    <DataTable
      className="table table-striped"
      columns={columns}
      data={data}
      pagination={pagination}
      paginationPerPage={paginationPerPage}
      paginationRowsPerPageOptions={paginationRowsPerPageOptions}
      customStyles={customStyles || defaultStyles}
      selectableRows
      onSelectedRowsChange={handleRowSelected}
    />
  );
};
 //------------------------------------------------- Fetch Data---------------------------------------------------

 
export const useFetchData = (url, setData) => {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(url);
          setData(response.data);
            } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, [url, setData]); // Ensure the hook re-fetches if URL or setData changes
  };
  
   //------------------------------------------------- Delete Data---------------------------------------------------
   export const handleDeleteItem = async ({   id,   url,   data,   setData,    itemKey,
                                             setValidtationMessage,    setAlert,    confirmationMessage = "Are you sure you want to delete?",  }) =>
       {
    const isConfirmed = window.confirm(confirmationMessage);
    if (!isConfirmed) return; // Exit if user cancels
  
    try {
      const response = await axios.delete(`${url}/${id}`);
      setValidtationMessage("Record deleted Successfully");
  
      console.log("Deleted successfully:", response.data);
  
      // Show success alert
      setAlert({ show: true, type: "danger", message: "Record deleted successfully!" });
      setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000); // Auto-hide alert
  
      // Update the dataset by filtering out the deleted item
      const updatedData = data.filter((item) => item[itemKey] !== id);
      setData(updatedData);
    } catch (err) {
      if (err.response && (err.response.status === 500 || err.response.status === 400)) {
        setValidtationMessage("Cannot delete: Value exists in child table!");
  
        // Show error alert
        setAlert({ show: true, type: "warning", message: "Cannot delete: Value exists in child table!" });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
      } else {
        console.log("Error deleting record:", err);
  
        // Show general error alert
        setAlert({ show: true, type: "danger", message: "Error deleting record!" });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
      }
    }
  };
  
   //------------------------------------------------- Filter Fuction---------------------------------------------------

  export const filterData = (data, searchTerm, filterKeys) => {
    if (!searchTerm) return data; // Return all data if no search term
  
    return data.filter((item) =>
      filterKeys.some((key) => {
        const value = item[key];
  
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (typeof value === "number") {
          return value.toString().includes(searchTerm);
        }
  
        return false;
      })
    );
  };
  
   //------------------------------------------------- Submit  Data---------------------------------------------------
   

   export const submitForm = (url, formData, setData, setValidationMessage,setAlert, clearForm) => {
    const showSuccessMessage = () => {
      setAlert({ show: true, type: "primary", message: "Form Submitted Successfully!" });
      setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
    };
  
    axios
      .post(url, formData)
      .then(() => {
        console.log("Form submitted successfully: ",formData);
        showSuccessMessage();
  
        // Fetch updated data after submission
        axios
          .get(url.replace("create", "getAll")) // Assuming the API follows the pattern
          .then((res) => setData(res.data))
          .catch((err) => console.log("Error fetching updated data:", err));
  
        clearForm();
      })
      .catch((err) => {
        console.log(err.response.config.data)
        const errorMessage = err.response ? "Error submitting form" : "Error submitting form";

        // const errorMessage =
        //   err.response && err.response.status === 500
        //     ? "This value already exists!"  
        //     : "Error submitting form";
        setValidationMessage(errorMessage);
        // Show error alert
        setAlert({ show: true, type: "danger", message: errorMessage });
        setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
      });
  };
  
  
   //------------------------------------------------- update  Data---------------------------------------------------
   export const updateForm = async (
    url,
    id,
    formData,
    setData,
    setValidationMessage,
        setIsEditMode,
    setNotEditMode,
    clearForm,
    setAlert // Added to show alerts
  ) => {
    try {
      await axios.put(`${url}/${id}`, formData);
      console.log("Form updated successfully");
  
      // Show success alert
      setAlert({ show: true, type: "primary", message: "Record updated successfully!" });
  
      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" }); // Hide alert after 3 seconds
      }, 3000);
  
      setValidationMessage("Record updated Successfully");
  
      try {
        const res = await axios.get(url.replace("update", "getAll"));
        setData(res.data);
        setIsEditMode(false);
        if (setNotEditMode) {
          setNotEditMode(false);
        }
        clearForm();
      } catch (fetchErr) {
        console.log("Error fetching data:", fetchErr);
      }
    } catch (err) {
      let errorMessage = "Error updating record!";
      if (err.response && (err.response.status === 500 || err.response.status === 400)) {
        console.log(err.response)
        errorMessage = "Update failed: This value already exists!";
        setValidationMessage(errorMessage);
      }
      
      // Show error alert
      setAlert({ show: true, type: "danger", message: errorMessage });
  
      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" }); // Hide alert after 3 seconds
      }, 3000);
      
      console.log(errorMessage, err.response);
    }
  };
  
//----------------------------------------------------------------------------------------------------
   