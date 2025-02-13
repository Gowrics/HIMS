import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaFileExcel, FaFileCsv, FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import logo from "../assets/logo.jpeg"; // Ensure the correct path

const ReportComponent = ({ reportTitle, data, fileName }) => {
  const [showModal, setShowModal] = useState(false);

  if (!data || data.length === 0) {
    return <p className="text-center text-danger">No Data Available</p>;
  }

  const headers = Object.keys(data[0]);

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

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const downloadCSV = () => {
    const formattedData = data.map(({ policySubCode, policiesCharge, active, maternityCovered }) => ({
      policySubCode,
      chargeCode: policiesCharge?.chargeCode || "N/A",
      active: active ? "YES" : "NO",
      maternityCovered: maternityCovered ? "YES" : "NO"
    }));

    const csvData = Papa.unparse(formattedData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container page-content">
      <div className="text-center mt-4">
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" id="dropdownMenuButton1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              <button className="dropdown-item" onClick={() => setShowModal(true)}>
                <FaFilePdf color="red" className="me-2" /> PDF Preview
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bootstrap Modal */}
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

                  <h3 className="text-center">{reportTitle}</h3>

                  <table className="table table-bordered table-striped mt-3">
                    <thead className="table-dark text-center">
                      <tr>
                        {headers.map((header) => (
                          <th key={header}>{header.replace(/([A-Z])/g, " $1").trim()}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.length > 0 ? (
                        data.map(({ policySubCode, policiesCharge, active, maternityCovered }) => (
                          <tr key={policySubCode}>
                            <td className="text-center">{policySubCode || "N/A"}</td>
                            <td className="text-center">
                              {typeof policiesCharge === "object" && policiesCharge !== null
                                ? policiesCharge.chargeCode || "N/A"
                                : "N/A"}
                            </td>
                            <td className="text-center">{active ? "Yes" : "No"}</td>
                            <td className="text-center">{maternityCovered ? "Yes" : "No"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center text-danger">No Data Available</td>
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
    </div>
  );
};

export default ReportComponent;
