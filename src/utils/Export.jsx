import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.jpeg"; // Ensure the correct path
import html2canvas from "html2canvas"; //pdf
import jsPDF from "jspdf"; //pdf
import { FaFileExcel, FaFileCsv, FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";

import Papa from "papaparse";

const ExportData = ({ url, fileName,previewData }) => {
  //--------------------------
 const [showModal, setShowModal] = useState(false);  //pdf

 if (!previewData || previewData.length === 0) {
  return <p className="text-center text-danger">No Data Available</p>;
}

const headers = Object.keys(previewData[0]);

const downloadPDF = () => {
  const downloadElement = document.getElementById("report-container");
  if (!downloadElement) {
    console.error("Report container not found.");
    return;
  }

  html2canvas(downloadElement, { scale: 2 })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.save(`${fileName}.pdf`);
    })
    .catch((error) => console.error("Error generating PDF:", error));
};
const extractNestedValues = (obj) => {
  if (typeof obj === "object" && obj !== null) {
    return Object.values(obj)
      .map((value) => (typeof value === "object" ? extractNestedValues(value) : value)) // Recursively format nested objects
      .join(", ");
  }
  return obj;
};

//-----------------------


  // Download Excel File
  const downloadExcel = async () => {

    try {
      const response = await axios.get(url, { responseType: "arraybuffer" });
      const workbook = XLSX.read(response.data, { type: "array" });
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } catch (error) {
      console.error("Excel download failed:", error);
      alert("Failed to download Excel file.");
    }
  };



  // Download CSV File
  const downloadCSV = () => {
    if (!previewData || previewData.length === 0) {
      console.error("No data available for CSV export.");
      return;
    }
  
    // Extract headers dynamically from the first object
    const headers = Object.keys(previewData[0]);
  
    // Format data dynamically
    const formattedData = previewData.map((row) => {
      let formattedRow = {};
      headers.forEach((header) => {
        const value = row[header];
  
        // Handle nested objects, null, or undefined values
        if (typeof value === "object" && value !== null) {
          formattedRow[header] = JSON.stringify(value); // Convert nested objects to JSON string
        } else {
          formattedRow[header] = value !== undefined ? value : "N/A";
        }
      });
      return formattedRow;
      console.log(formattedRow);
    });
  
    // Convert to CSV format
    const csvData = Papa.unparse(formattedData);
  
    // Create and trigger CSV file download
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  

  return (
    <div>
      <div className="dropdown ">
        <button className="btn btn-primary dropdown-toggle " id="dropdownMenuButton1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Export
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button className="dropdown-item" onClick={downloadExcel}>
              <FaFileExcel color="green" className="me-2" /> Excel
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={downloadCSV}>
              <FaFileCsv color="blue" className="me-2" /> CSV
            </button>
          </li>
          <li>
            {/* <button className="dropdown-item">
              <FaFilePdf color="red" className="me-2" /> PDF Preview
            </button> */}
              <button className="dropdown-item" onClick={() => setShowModal(true)}>
                            <FaFilePdf color="red" className="me-2" /> PDF Preview
                          </button>
          </li>
        </ul>
      </div>
{/* pfd maodal  ============== */}

       {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">PDF Preview</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div id="report-container">
                  <div className="text-center my-4">
                    <img src={logo} alt="Company Logo" style={{ width: "120px", height: "auto" }} />
                    <h2 className="mt-2">MediCare Solutions</h2>
                    <hr />
                  </div>

                  <h3 className="text-center">{fileName}</h3>

                  <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark text-center">
                      <tr>
                        {headers.map((header) => (
                          <th key={header}>{header.replace(/([A-Z])/g, " $1").trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
  {previewData.length > 0 ? (
    previewData.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key) => (
          <td key={key} className="text-center">
            {typeof row[key] === "object" && row[key] !== null
              ? extractNestedValues(row[key]) // Call a function to format nested objects
              : row[key] !== undefined
              ? row[key]
              : "N/A"}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={Object.keys(previewData[0] || {}).length || 1} className="text-center text-danger">
        No Data Available
      </td>
    </tr>
  )}
</tbody>

                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-danger" onClick={downloadPDF}>
                  <FaFilePdf className="me-2" /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Background */}
      {showModal && <div className="modal-backdrop show" onClick={() => setShowModal(false)}></div>}
      {/* ------------------------------------------------- */}
    </div>
  );
};

export default ExportData;
