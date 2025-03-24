

import React, { useContext, useRef, useState } from "react";
import { AdvanceInvoiceContext, FormContext, UserContext } from "../../Context/Context";
import { Link } from "react-router";
import CustomSelect from "../../utils/CustomSelect";
import axios from "axios";

import { validateAdvanceInvoiceData } from "./ValidateForm";
import Services from "./ServicesForm";
import ServiceList from "./ServiceList";
import InvoiceModal from "./PaymentModal";

// import Services from './ServicesForm';
const AdvanceReceipts = () => {
    const { docterData, policiesSubPatientData, BASE_URL, patientChgDepData, patientDataMasterData } = useContext(FormContext);
    const { invoiceData, setInvoiceData, isInvoiceService, setIsInvoiceService, clearInvoice, packagesMasterData, enableInvoiceHeader, handleChange } = useContext(AdvanceInvoiceContext);

    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);


    const handleinvoiceHeader = (e) => {
        e.preventDefault(); // Prevent default Link behavior

        const errors = validateAdvanceInvoiceData(invoiceData);

        if (Object.keys(errors).length > 0) {
            console.log("Validation errors:", errors);
            alert("Please fill all required fields before proceeding.");
            return;
        }
        setIsInvoiceService(true);
        setNotEditMode(true); // Ensure state reflects the disabled mode

        // Disable standard inputs, selects, and textareas
        const headerFields = document.querySelectorAll(".invoice-main-details input, .invoice-main-details select, .invoice-main-details textarea");
        headerFields.forEach(field => {
            if (field.tagName === "SELECT") {
                field.disabled = true;
            } else {
                field.readOnly = true;
            }
        });

        console.log("Invoice header fields are now disabled.");
    };



    return (
        <div className=" invoice-container mt-5 container-fluid">
            {/* Invoice Title */}


            <form className='invoice-container'>
                {/* Invoice Header */}
                <div className="row invoice-header">
                    <div className="col-12">

                        <div className="invoice-main-details ">
                            <div className="row justify-content-between align-items-center text-center m-2">
                                {/* Column 1: Company Info */}
                                <div className="col-md-4 text-md-left text-center">
                                    <h5 className="mb-1">BasilHut Private Limited</h5>
                                    <address className="p-0 text-muted">123 Main Street, City, Country</address>
                                </div>

                                {/* Column 2: Title */}
                                <div className="col-md-4 text-center">
                                    <h3>Advance Invoice Data</h3>
                                </div>

                                {/* Column 3: Links */}
                                <div className="col-md-4 text-md-right text-center">
                                    <Link className='btn btn-secondary mx-1' to="billrules">Bill Rules</Link>
                                    <Link className='btn btn-secondary mx-1' to="advanceinvoices">Invoices</Link>
                                </div>
                            </div><hr className='mt-0' />

                            <div className=" row invoice-header-detail ">
                                <div className="row ">

                                    <div className="col-md-12 mb-1">
                                        <label >
                                        <b> Bill Date</b>
                                            <input type="date" className="form-control" id="billDate" name="billDate" value={new Date().toISOString().split("T")[0]} onChange={handleChange} required /></label>
                                        <label className="ms-3">
                                        <b> Bill Time Stamp</b>
                                            <input type="text" className="form-control" id="billTmStmp" name="billTmStmp" value={new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} onChange={handleChange} required  /></label>
                                        <label htmlFor='patientCode' className='ms-3'> <b>Patient Code:</b>
                                            <CustomSelect
                                                id="patientCode"
                                                name="patientCode"
                                                valueKey="patientCode"
                                                labelKey="patientName"
                                                data={patientDataMasterData}
                                                value={invoiceData.advanceReceiptsHeader.patientDataMaster.patientCode}
                                                onChange={handleChange}
                                                isDisabled={notEditMode}
                                                placeholder="Select Patient by Name,Ph no,Dob,Passport"
                                                additionalFields={["patientMobileNo", "patientDateOfBirth", "passportNo"]}
                                            /></label>
                                        <label htmlFor='drCode' className="ms-3"><b>Docter Code:</b>
                                            <CustomSelect
                                                id="doctorCode"
                                                name="doctorCode"
                                                valueKey="doctorCode"   // Dynamic value key
                                                labelKey="doctorName"
                                                data={docterData}  // Pass the raw data, no need to map
                                                value={invoiceData.advanceReceiptsHeader.doctor.doctorCode}
                                                onChange={handleChange}
                                                isDisabled={notEditMode}
                                                placeholder="Select docter by name and designation"
                                                additionalFields={["drDesignation"]}
                                            /></label>
                                    </div>
                                

                                <div className="col-md-2">
                                    <label htmlFor='patientName'>Patient Name:</label>
                                    <input type='text' className="form-control" id="patientName" name="patientName" value={invoiceData.advanceReceiptsHeader.patientDataMasterName} onChange={handleChange} required />
                                </div>

                                <div className="col-md-2">
                                    <label htmlFor='chargeCode'>Chg Code:</label>
                                    <CustomSelect
                                        id="chargeCode"
                                        name="chargeCode"
                                        valueKey="chargeCode"   // Dynamic value key
                                        labelKey="chargeName"
                                        data={policiesSubPatientData}  // Pass the raw data, no need to map
                                        value={invoiceData.advanceReceiptsHeader.policiesCharge.chargeCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select an option"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor='createdBy'>Created By:</label>
                                    <input type='text' className="form-control" id="createdBy" name="createdBy" value={invoiceData.advanceReceiptsHeader.createdBy} onChange={handleChange} required /></div>
                                {/* <div className="col-md-2">   <label htmlFor='ccld'>Ccld:</label>
                                    <select className="form-control" id="ccld" name="ccld" value={invoiceData.advanceReceiptsHeader.ccld} onChange={handleChange}  >
                                        <option value="">Select an Option</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select></div>
                                <div className="col-md-2">
                                    <label htmlFor='ccldBy'>Ccld By:</label>
                                    <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={invoiceData.advanceReceiptsHeader.ccldBy} onChange={handleChange} required /></div>
                            </div>
                            <div className=" row  ">
                                <div className="col-md-2">
                                    <label htmlFor='ccldAt'>Ccld At:</label>
                                    <input type='time' className="form-control" id="ccldAt" name="ccldAt" value={new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" })} onChange={handleChange} required /></div>
                                <div className="col-md-2">
                                    <label htmlFor='ccldDt'>Ccld Dt:</label>
                                    <input type='date' className="form-control" id="ccldDt" name="ccldDt" value={invoiceData.advanceReceiptsHeader.ccldDt} onChange={handleChange} required /></div> */}
                                <div className="col-md-2 mt-2">
                                    <button className=' m-3 btn btn-primary btn-sm' onClick={handleinvoiceHeader}>Add Services</button>
                                </div>
                            </div>
<hr/>
                            {/* <button className='m-3 btn btn-primary btn-sm' onClick={handleRegister} type='button'>Register</button> */}
                            <Services />
                        </div>
                        </div>
                        <div className="table-responsive">
                            <ServiceList />
                        </div>
                    </div>
                </div>

                {/* Invoice Details */}
                {isInvoiceService && (

                    <InvoiceModal
                        handleChange={handleChange}
                    />


                )}
            </form>

        </div>
    );

};


export default AdvanceReceipts;

