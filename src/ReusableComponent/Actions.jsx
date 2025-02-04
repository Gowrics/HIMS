import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { FormContext } from "../FormContext";


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

export const handleDeleteItem = async ({
    id,
    url,
    data,
    setData,
    itemKey,setValidtationMessage,setShowModal,  
    confirmationMessage = "Are you sure you want to delete?",
  }) => {
    const isConfirmed = window.confirm(confirmationMessage);
    if (!isConfirmed) return; // Exit if user cancels
      try {
      const response = await axios.delete(`${url}/${id}`);
      console.log("Deleted successfully:", response.data);
  
      // Update the dataset by filtering out the deleted item
      const updatedData = data.filter((item) => item[itemKey] !== id);
      setData(updatedData);
    } catch (err) {
    //  const message = error.response?.data || "";
      if (err.response && err.response.status === 500||400) {
        setValidtationMessage("This value is present in the child table, so we cannot delete it from the parent table.");

        setShowModal(true);
      } else {
        console.log("Error submitting form:", err);
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
   

   export const submitForm = (url, formData, setData, setValidationMessage, setShowModal, clearForm) => {
    const showSuccessMessage = () => {
      setValidationMessage("Form Submitted Successfully");
      setShowModal(true);
    };
  
    axios
      .post(url, formData)
      .then(() => {
        console.log("Form submitted successfully");
        showSuccessMessage();
  
        // Fetch updated data after submission
        axios
          .get(url.replace("create", "getAll")) // Assuming the API follows the pattern
          .then((res) => setData(res.data))
          .catch((err) => console.log("Error fetching updated data:", err));
  
        clearForm();
      })
      .catch((err) => {
        const errorMessage =
          err.response && err.response.status === 500
            ? "This value already exists!"  
            : "Error submitting form";
        setValidationMessage(errorMessage);
        setShowModal(true);
        console.log(errorMessage, err.response);
      });
  };
  
  
   //------------------------------------------------- update  Data---------------------------------------------------
   
  
   export const updateForm = async (url,id, formData, setData, setValidationMessage, setShowModal, setIsEditMode, setNotEditMode, clearForm) => {
     try {
       await axios.put(`${url}/${id}`, formData);
       console.log("Form updated successfully");
      // console.log(url);
       setValidationMessage("Form updated Successfully");
       setShowModal(true);
   
       try {
         const res = await axios.get(url.replace("update", "getAll"));
        // console.log(url.replace("update", "getAll"));
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
       if (err.response && err.response.status === 500||400) {
         setValidationMessage("This value already exists!");
         setShowModal(true);
       } else {
         console.log("Error submitting form:", err);
       }
     }
   };
//----------------------------------------------------------------------------------------------------
   