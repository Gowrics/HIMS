import React, { useContext, useState } from 'react';
import { FormContext, InvoiceContext, UserContext } from '../Context/Context';
import CustomSelect from '../utils/CustomSelect';
import ServiceList from './ServiceList';
import { UserProvider } from '../Context/UserProvider';
import { Link } from 'react-router';
import { validateInvoiceData } from './ValidateForm';
import axios from 'axios';
import InvoiceModal from './PaymentModal';
import Services from './ServicesForm';
const InvoiceForm1 = () => {
    const { docterData, policiesSubPatientData, BASE_URL, patientChgDepData, patientDataMasterData } = useContext(FormContext);
    const { invoiceData, setInvoiceData, isInvoiceService, notEditMode, setNotEditMode, setIsInvoiceService, clearInvoice,isPriceChange, setIsPriceChange, packagesMasterData, enableInvoiceHeader, handleChange } = useContext(InvoiceContext);
    const { singleUser } = useContext(UserContext);
    const [isEditMode, setIsEditMode] = useState(false);

    console.log(invoiceData.patientBillingHeader.createdBy);

    const handleinvoiceHeader = (e) => {
        e.preventDefault(); // Prevent default Link behavior

        const errors = validateInvoiceData(invoiceData);

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
                                    <h3> Patient Invoice Form </h3>
                                </div>

                                {/* Column 3: Links */}
                                <div className="col-md-4 text-md-right text-center">
                                    <Link className='btn btn-secondary mx-1' to="billrules">Bill Rules</Link>
                                    <Link className='btn btn-secondary mx-1' to="patientinvoices">Invoices</Link>
                                </div>
                            </div>
                            <hr className='mt-0' />
                            <div className=" row  mb-3 ">
                                <div className="row invoice-header-detail">

                                    <div className="col-md-12 mb-3">
                                        {/* <label htmlFor="billNo">  Bill No
                                     <input type="text" className="form-control" id="billNo" name="billNo" value={invoiceData.billNo} onChange={handleChange} required /></label> */}
                                        <label  >
                                            <b> Bill Date</b>
                                            <input type="date" className="form-control" id="billDate" name="billDate" value={new Date().toISOString().split("T")[0]} onChange={handleChange} required /></label>
                                        <label >
                                            <b> Bill Time Stamp</b>
                                            <input type="text" className="form-control" id="billTmStmp" name="billTmStmp" value={new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })} onChange={handleChange} required /></label>
                                        <label htmlFor='patientCode' className='ms-5'>  <b>Patient Code:</b>
                                            {/* <input type='text' className="form-control" id="patientCode" name="patientCode" value={invoiceData.patientDataMaster.patientCode} onChange={handleChange} required /> */}

                                            <CustomSelect
                                                id="patientCode"
                                                name="patientCode"
                                                valueKey="patientCode"
                                                labelKey="patientName"
                                                data={patientDataMasterData}
                                                value={invoiceData.patientBillingHeader.patientDataMaster.patientCode}
                                                onChange={handleChange}
                                                isDisabled={notEditMode}
                                                placeholder="Select Patient by Name,Ph no,Dob,Passport"
                                                additionalFields={[null]}
                                            />
                                        </label>
                                        <label htmlFor='drCode' className='ms-5'><b>Docter Code:</b>
                                            {/* <input type='text' className="form-control" id="drCode" name="drCode" value={invoiceData.doctor.drCode} onChange={handleChange} required /> */}

                                            <CustomSelect
                                                id="doctorCode"
                                                name="doctorCode"
                                                valueKey="doctorCode"   // Dynamic value key
                                                labelKey="doctorName"
                                                data={docterData}  // Pass the raw data, no need to map
                                                value={invoiceData.patientBillingHeader.doctor.doctorCode}
                                                onChange={handleChange}
                                                isDisabled={notEditMode}
                                                placeholder="Select docter by name and designation"
                                                additionalFields={["drDesignation"]}
                                            /></label>
                                    </div>
                                </div>
                                {/* <div className="col-md-2">
                                    <label htmlFor='patientCode'>Patient Code:</label>
                                    {/* <input type='text' className="form-control" id="patientCode" name="patientCode" value={invoiceData.patientDataMaster.patientCode} onChange={handleChange} required /> */}
                                {/* 
                                    <CustomSelect
                                        id="patientCode"
                                        name="patientCode"
                                        valueKey="patientCode"
                                        labelKey="patientName"
                                        data={patientDataMasterData}
                                        value={invoiceData.patientBillingHeader.patientDataMaster.patientCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select Patient by Name,Ph no,Dob,Passport"
                                        additionalFields={["patientMobileNo", "patientDateOfBirth", "passportNo"]}
                                    />

                                </div> */}
                                <div className="col-md-2">
                                    <label htmlFor='patientName'>Patient Name:</label>
                                    <input type='text' className="form-control" id="patientName" name="patientName" value={invoiceData.patientBillingHeader.patientDataMasterName} onChange={handleChange} required />
                                </div>
                                <div className="col-md-2">   <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
                                    <input type='text' className="form-control" id="patientDataMasterNameAr" name="patientDataMasterNameAr" value={invoiceData.patientBillingHeader.patientDataMasterNameAr} onChange={handleChange} required /></div>

                                <div className="col-md-2">
                                    <label htmlFor='chargeCode'>Chg Code:</label>
                                    {/* <input type='number' className="form-control" id="chargeCode" name="chargeCode" value={invoiceData.patientBillingHeader.policiesCharge.chargeCode} onChange={handleChange} required /></div> */}

                                    <CustomSelect
                                        id="chargeCode"
                                        name="chargeCode"
                                        valueKey="chargeCode"   // Dynamic value key
                                        labelKey="chargeName"
                                        data={policiesSubPatientData}  // Pass the raw data, no need to map
                                        value={invoiceData.patientBillingHeader.policiesCharge.chargeCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select an option"
                                    />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor='createdBy'>Created By:</label>
                                    <input type='text' className="form-control" id="createdBy" name="createdBy" value={invoiceData.patientBillingHeader.createdBy} onChange={handleChange} required /></div>

                                <div className="col-md-2">   <label htmlFor='pointsUsed'>Points Used:</label>
                                    <input type='number' className="form-control" id="pointsUsed" name="pointsUsed" value={invoiceData.patientBillingHeader.pointsUsed} onChange={handleChange} required /></div>

                                {/* <div className="col-md-4">
                                    <label htmlFor='drCode'>Docter Code:</label>
                                    {/* <input type='text' className="form-control" id="drCode" name="drCode" value={invoiceData.doctor.drCode} onChange={handleChange} required /> */}

                                {/* <CustomSelect
                                        id="doctorCode"
                                        name="doctorCode"
                                        valueKey="doctorCode"   // Dynamic value key
                                        labelKey="doctorName"
                                        data={docterData}  // Pass the raw data, no need to map
                                        value={invoiceData.patientBillingHeader.doctor.doctorCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select docter by name and designation"
                                        additionalFields={["drDesignation"]}
                                    />
                                </div> */}
                            </div>
                            <div className="row">

                                <div className="col-md-2"> <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
                                    <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={invoiceData.patientBillingHeader.paidFromAdvance} onChange={handleChange} required /></div>
                                <div className="col-md-2"> <label htmlFor='packageCode'>Package Code:</label>

                                    <CustomSelect
                                        id="packageCode"
                                        name="packageCode"
                                        valueKey="packageCode"   // Dynamic value key
                                        labelKey="packageName"
                                        data={packagesMasterData}  // Pass the raw data, no need to map
                                        value={invoiceData.patientBillingHeader.packageCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select an option"
                                    />
                                </div>


                                {/* <input type='text' className="form-control" id="packageCode" name="packageCode" value={invoiceData.patientBillingHeader.packageCode} onChange={handleChange} required /></div> */}
                                <div className="col-md-2"> <label htmlFor='emrNo'>Emr No:</label>
                                    <input type='text' className="form-control" id="emrNo" name="emrNo" value={invoiceData.patientBillingHeader.emrNo} onChange={handleChange} required /></div>
                                <div className="col-md-3 text-end"> <button className=' m-3 btn btn-primary btn-sm' onClick={handleinvoiceHeader}>Add Services</button> </div>
                            </div>
                            <hr></hr>
                            {/* <button className='m-3 btn btn-primary btn-sm' onClick={handleRegister} type='button'>Register</button> */}


                            <Services />
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


export default InvoiceForm1;

