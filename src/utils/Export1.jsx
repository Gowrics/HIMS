
import React, { useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFileCsv, FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Modal from "react-modal";

const ExportData1 = ({ url, fileName, previewData }) => {
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const downloadExcel = async (data) => {
    const workbook = XLSX.read(data, { type: "array" });
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const downloadCSV = (data) => {
    const blob = new Blob([data], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const generatePDF = (data) => {
    try {
      const doc = new jsPDF();
      doc.text(`${fileName} Data`, 10, 10);
  
      const headers = Object.keys(data[0] || {});
      const recordsPerPage = 10; // ✅ Set records per page
      let yPosition = 20;
  
      for (let i = 0; i < data.length; i += recordsPerPage) {
        if (i !== 0) doc.addPage(); // ✅ Add a new page after the first one
  
        const body = data.slice(i, i + recordsPerPage).map((row) =>
          headers.map((key) => row[key])
        );
  
        doc.autoTable({
          startY: yPosition,
          head: [headers],
          body: body,
        });
      }
  
      return doc;
    } catch (error) {
      console.error("PDF Generation Failed:", error);
      alert("Error generating PDF file.");
      return null;
    }
  };
  

  const previewPDF = () => {
    if (!previewData || previewData.length === 0) {
      alert("No preview data available");
      return;
    }

    const doc = generatePDF(previewData);
    if (doc) {
      const pdfBlob = doc.output("blob");

      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfPreviewUrl(pdfUrl);
      setModalIsOpen(true);
    }
  };

  const handleDownload = async (type) => {
    try {
      const response = await axios.get(url, { responseType: "blob" });

      if (type === "excel") {
        const data = await response.data.arrayBuffer();
        downloadExcel(data);
      } else if (type === "csv") {
        const text = await response.data.text();
        downloadCSV(text);
      } else if (type === "pdf") {
        previewPDF(); // Show preview modal before downloading
      }
    } catch (error) {
      console.error(`Download failed for ${type}:`, error);
      alert(`Failed to download ${type.toUpperCase()} file.`);
    }
  };

  return (
    <div>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Download
        </button>
        <ul className="dropdown-menu">
          <li>
            <button className="dropdown-item" onClick={() => handleDownload("excel")}>
              <FaFileExcel color="green" className="me-2" /> Excel
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => handleDownload("csv")}>
              <FaFileCsv color="blue" className="me-2" /> CSV
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={previewPDF}>
              <FaFilePdf color="red" className="me-2" /> PDF Preview
            </button>
          </li>
        </ul>
      </div>

      {/* PDF Preview Modal */}
    {/* PDF Preview Modal */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={() => setModalIsOpen(false)}
  style={{
    content: {
      width: "50%",  // ✅ Adjust width (change as needed)
      height: "600px", // ✅ Adjust height
      margin: "auto", // ✅ Center the modal
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Dim background
    },
  }}
>
  <h2>PDF Preview</h2>
  {pdfPreviewUrl ? (
    <iframe
      src={pdfPreviewUrl}
      width="100%"
      height="400px"
      title="PDF Preview"
      style={{ border: "1px solid #ddd", borderRadius: "5px" }}
    ></iframe>
  ) : (
    <p>Loading preview...</p>
  )}
  <div className="mt-3 text-center">
    <button
      className="btn btn-success me-2"
      onClick={() => {
        const link = document.createElement("a");
        link.href = pdfPreviewUrl;
        link.download = `${fileName}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }}
    >
      Download PDF
    </button>
    <button className="btn btn-danger" onClick={() => setModalIsOpen(false)}>
      Close
    </button>
  </div>
</Modal>

    </div>
  );
};

export default ExportData1;