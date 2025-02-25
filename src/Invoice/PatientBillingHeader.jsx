import React, { useContext, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { thirdPartyHeadDataColumn } from "../assets/ArrayData";
import { CustomDataTable, filterData, handleDeleteItem, submitForm, updateForm } from "../utils/Actions";
import CustomSelect from "../utils/CustomSelect";
import ExportData from "../utils/Export";
import { FormContext, InvoiceContext } from "../Context/Context";
const PatientBillingHeader = () => {

    const { setValidtationMessage, BASE_URL, thirdPartyHeadData, patientDataMasterData, patientsSubTypeData, } = useContext(FormContext);
    const { generateInvoiceNo, patientBillingHeaderData, setPatientBillingHeaderData } = useContext(InvoiceContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });

    const initialFormData = {
        billNo: generateInvoiceNo(),
        billDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
        billTmStmp: new Date().toTimeString().split(" ")[0].slice(0, 5), // Format as HH:MM
        patientDataMaster: {
            patientCode: null,
          },
        patientName: "",
        patientNameAr: "",
        coCode: "",
        coCodeBr: "",
        refDeptCode: "",
        policiesCharge: {
            chargeCode: "",
          },
        createdBy: "",
        cvcld: "NO",     // (Y/N) not null default is N
        ccldBy: "",// string not null
        ccldAt: "",  // datetime not null
        ccldDt: "", //date not null
        cashPaid: "", //number not null >=0
        cardPaid: "", //number not null >=0
        cardNo: "", //string not null
        pointsUsed: "", //number not null -can accept 0 and negative values
        paidFromAdvance: "", //number not null
        packageCode: "",  // string (50)
        emrNo: ""   // string(100)
    };

    const [formData, setFormData] = useState(initialFormData);

    // Clear the form
    const clearForm = () => {
        setFormData(initialFormData);
    };
    // Handle patientMainTypeData changes (for select input)
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "patientCode") {
          setFormData((prevData) => ({
            ...prevData,
            patientDataMaster: {
              ...prevData.patientDataMaster,
              patientCode: value,
            },
          }));
        }  else if (name === "chargeCode") {
            setFormData((prevData) => ({
              ...prevData,
              policiesCharge: {
                ...prevData.policiesCharge,
                chargeCode: value,
              },
            }));
          }
         else {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure the payload matches the API's expected format
        const updatedFormData = {
          ...formData,
          patientDataMaster: {
            ...formData.patientDataMaster,
            patientCode: (formData.patientDataMaster.patientCode), // Convert schgCode to a number
          },
          policiesCharge: {
            ...formData.policiesCharge,
            chargeCode: (formData.policiesCharge.chargeCode), // Convert schgCode to a number
          },
        //   active: formData.active || null,
        //   tpaName: (formData.tpaName).trim()
        };

        console.log("Payload sent to API:", updatedFormData);
        const url = `${BASE_URL}billHead/create`; // The URL for form submission
        submitForm(url, updatedFormData, setPatientBillingHeaderData, setValidtationMessage, setAlert, clearForm);

    };

    const handleUpdateData = (id) => {
        setNotEditMode(true);
        const itemToUpdate = patientBillingHeaderData.find((item) => item.billNo === id);

        if (itemToUpdate) {
            setFormData({
                billNo: itemToUpdate.billNo || "",
                billDate: itemToUpdate.billDate || new Date().toLocaleDateString(),
                billTmStmp: itemToUpdate.billTmStmp || "",
                patientDataMaster: {
                    patientCode: itemToUpdate.patientDataMaster?.patientCode || 0,
                  },
             
                patientName: itemToUpdate.patientName || "",
                patientNameAr: itemToUpdate.patientNameAr || "",
                coCode: itemToUpdate.coCode || "",
                coCodeBr: itemToUpdate.coCodeBr || "",
                refDeptCode: itemToUpdate.refDeptCode || "",
                policiesCharge: {
                    chargeCode: itemToUpdate.policiesCharge?.chargeCode || 0,
                  },
                createdBy: itemToUpdate.createdBy || "",
                cvcld: itemToUpdate.cvcld || "N", // Default is "N"
                ccldBy: itemToUpdate.ccldBy || "",
                ccldAt: itemToUpdate.ccldAt || "",
                ccldDt: itemToUpdate.ccldDt || "",
                cashPaid: itemToUpdate.cashPaid ?? "", // Ensures 0 values are not replaced with empty strings
                cardPaid: itemToUpdate.cardPaid ?? "",
                cardNo: itemToUpdate.cardNo || "",
                pointsUsed: itemToUpdate.pointsUsed ?? "", // Can accept 0 and negative values
                paidFromAdvance: itemToUpdate.paidFromAdvance ?? "",
                packageCode: itemToUpdate.packageCode || "",
                emrNo: itemToUpdate.emrNo || "",
            });
            setIsEditMode(true); // Show update form
        } else {
            console.log("Item not found!");
        }
    };


    const handleDelete = (id) => {
        handleDeleteItem({
            id,
            url: `${BASE_URL}bilHead/delete`, setValidtationMessage, setAlert,
            data: patientBillingHeaderData,
            setData: setPatientBillingHeaderData,
            itemKey: "billNo", // Key to identify the item in the dataset
        });
    };
    const handleUpdate = () => {
        const {
            billNo, billDate, billTmStmp,   patientDataMaster: { patientCode }, patientName, patientNameAr,
            coCode, coCodeBr, refDeptCode,   policiesCharge: { chargeCode }, createdBy, cvcld, ccldBy,
            ccldAt, ccldDt, cashPaid, cardPaid, cardNo, pointsUsed, paidFromAdvance,
            packageCode, emrNo, } = formData;

        const updatedData = {
            billNo, billDate: billDate.trim(), billTmStmp,
            patientDataMaster: { patientCode },patientName: patientName.trim(),
            patientNameAr: patientNameAr.trim(), coCode,
            coCodeBr, refDeptCode,  policiesCharge: { chargeCode },
            createdBy, cvcld: cvcld || "N", // Ensure default is 'N'
            ccldBy, ccldAt, ccldDt,
            cashPaid: cashPaid ?? 0, // Ensure number fields are not null
            cardPaid: cardPaid ?? 0,
            cardNo, pointsUsed: pointsUsed ?? 0, // Can accept 0 and negative values
            paidFromAdvance: paidFromAdvance ?? 0,
            packageCode: packageCode.trim(),
            emrNo: emrNo.trim(),
        };

        console.log(formData);
        console.log(updatedData);

        const url = `${BASE_URL}patientBillingHeader/update`;
        const id = formData.billNo; // The URL for form submission
        updateForm(url, id, updatedData, setPatientBillingHeaderData, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);
    };

    const matchedPatients = patientDataMasterData.filter(patient => patient.patientCode === "P12345");
    console.log(matchedPatients);

    return (
        <>
            <div className="container invoice page-content">
                <div className="invoiceHead invoice-header">
                    <h1>Patient Billing Header </h1>
                </div>
                {alert.show && (
                    <div className={`alert alert-${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Row 1 */}

                    <div className="row invoice-header-detail mb-3">
                        <div className="col-md-4">
                            <label htmlFor="billNo" className="form-label">
                                billNo
                            </label>
                            <input type="text" className="form-control" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="billDate" className="form-label">
                                billDate
                            </label>
                            <input type="date" className="form-control" id="billDate" name="billDate" value={formData.billDate} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="billTmStmp" className="form-label">
                                billTmStmp
                            </label>
                            <input type="time" className="form-control" id="billTmStmp" name="billTmStmp" value={formData.billTmStmp} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="invoice-main-details">
                        <div className=" row mb-3">
                            <div className="col-md-3">
                                <label htmlFor='patientCode'>Patient Code:</label>
                                <CustomSelect
                                    id="patientCode"
                                    name="patientCode"
                                    valueKey="patientCode"   // Dynamic value key
                                    labelKey="patientName"
                                    data={patientDataMasterData}  // Pass the raw data, no need to map
                                    value={formData.patientDataMaster.patientCode}
                                    onChange={handleChange}
                                    isDisabled={notEditMode}
                                    placeholder="Select an option"
                                />
                                {/* <input type='text' className="form-control" id="patientCode" name="patientCode" value={formData.patientCode} onChange={handleChange} required /> */}
                            </div>
                            <div className="col-md-3">
                                <label htmlFor='patientName'>Patient Name:</label>
                                <input type='text' className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">   <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
                                <input type='text' className="form-control" id="patientNameAr" name="patientNameAr" value={formData.patientNameAr} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='coCode'>Co Code:</label>
                                <input type='text' className="form-control" id="coCode" name="coCode" value={formData.coCode} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 2 */}
                        <div className=" row  mb-3">
                            <div className="col-md-3">  <label htmlFor='coCodeBr'>Co Code Br:</label>
                                <input type='text' className="form-control" id="coCodeBr" name="coCodeBr" value={formData.coCodeBr} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='refDeptCode'>Ref Dept Code:</label>
                                <input type='text' className="form-control" id="refDeptCode" name="refDeptCode" value={formData.refDeptCode} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ChgCode'>Chg Code:</label>
                                <input type='text' className="form-control" id="ChgCode" name="ChgCode" value={formData.ChgCode} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='createdBy'>Created By:</label>
                                <input type='text' className="form-control" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 3 */}
                        <div className="row  mb-3">
                            <div className="col-md-3">   <label htmlFor='cvcld'>Ccld:</label>
                                <select className="form-control" id="cvcld" name="cvcld" value={formData.cvcld} onChange={handleChange}  >
                                    <option value="">Select an Option</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldBy'>Ccld By:</label>
                                <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={formData.ccldBy} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldAt'>Ccld At:</label>
                                <input type='text' className="form-control" id="ccldAt" name="ccldAt" value={formData.ccldAt} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldDt'>Ccld Dt:</label>
                                <input type='text' className="form-control" id="ccldDt" name="ccldDt" value={formData.ccldDt} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 4 */}
                        <div className="row  mb-3">
                            <div className="col-md-3">   <label htmlFor='pointsUsed'>Points Used:</label>
                                <input type='text' className="form-control" id="pointsUsed" name="pointsUsed" value={formData.pointsUsed} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
                                <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={formData.paidFromAdvance} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='packageCode'>Package Code:</label>
                                <input type='text' className="form-control" id="packageCode" name="packageCode" value={formData.packageCode} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='emrNo'>Emr No:</label>
                                <input type='text' className="form-control" id="emrNo" name="emrNo" value={formData.emrNo} onChange={handleChange} required /></div>
                        </div>
                    </div>
                    <div className="invoice-payment"><div className="row  mb-3">
                        <div className="col-md-4">
                            <label htmlFor='cashPaid'>Cash Paid:</label>
                            <input type='number' className="form-control" id="cashPaid" name="cashPaid" value={formData.cashPaid} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor='cardPaid'>Card Paid:</label>
                            <input type='number' className="form-control" id="cardPaid" name="cardPaid" value={formData.cardPaid} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor='cardNo'>Card No:</label>
                            <input type='text' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />   </div>
                    </div>
                    </div>
                                       {!isEditMode ? (
                        <button type="submit" className="btn btn-primary">      Create+         </button>
                    ) : (
                        <>
                            <button type="button" onClick={handleUpdate} className="btn btn-success">     Update        </button>
                            <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">    Cancel       </button>
                        </>
                    )}
                </form>
                
<div className="invoiceDetails">
<form onSubmit={handleSubmit}>
                    {/* Row 1 */}

                    <div className="row invoice-header-detail mb-3">
                        <div className="col-md-4">
                            <label htmlFor="billNo" className="form-label">
                                billNo
                            </label>
                            <input type="text" className="form-control" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="billDate" className="form-label">
                                billDate
                            </label>
                            <input type="date" className="form-control" id="billDate" name="billDate" value={formData.billDate} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="billTmStmp" className="form-label">
                                billTmStmp
                            </label>
                            <input type="time" className="form-control" id="billTmStmp" name="billTmStmp" value={formData.billTmStmp} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="invoice-main-details">
                        <div className=" row mb-3">
                            <div className="col-md-3">
                                <label htmlFor='patientCode'>Patient Code:</label>
                                <CustomSelect
                                    id="patientCode"
                                    name="patientCode"
                                    valueKey="patientCode"   // Dynamic value key
                                    labelKey="patientName"
                                    data={patientDataMasterData}  // Pass the raw data, no need to map
                                    value={formData.patientDataMaster.patientCode}
                                    onChange={handleChange}
                                    isDisabled={notEditMode}
                                    placeholder="Select an option"
                                />
                                {/* <input type='text' className="form-control" id="patientCode" name="patientCode" value={formData.patientCode} onChange={handleChange} required /> */}
                            </div>
                            <div className="col-md-3">
                                <label htmlFor='patientName'>Patient Name:</label>
                                <input type='text' className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">   <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
                                <input type='text' className="form-control" id="patientNameAr" name="patientNameAr" value={formData.patientNameAr} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='coCode'>Co Code:</label>
                                <input type='text' className="form-control" id="coCode" name="coCode" value={formData.coCode} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 2 */}
                        <div className=" row  mb-3">
                            <div className="col-md-3">  <label htmlFor='coCodeBr'>Co Code Br:</label>
                                <input type='text' className="form-control" id="coCodeBr" name="coCodeBr" value={formData.coCodeBr} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='refDeptCode'>Ref Dept Code:</label>
                                <input type='text' className="form-control" id="refDeptCode" name="refDeptCode" value={formData.refDeptCode} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ChgCode'>Chg Code:</label>
                                <input type='text' className="form-control" id="ChgCode" name="ChgCode" value={formData.ChgCode} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='createdBy'>Created By:</label>
                                <input type='text' className="form-control" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 3 */}
                        <div className="row  mb-3">
                            <div className="col-md-3">   <label htmlFor='cvcld'>Ccld:</label>
                                <select className="form-control" id="cvcld" name="cvcld" value={formData.cvcld} onChange={handleChange}  >
                                    <option value="">Select an Option</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldBy'>Ccld By:</label>
                                <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={formData.ccldBy} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldAt'>Ccld At:</label>
                                <input type='text' className="form-control" id="ccldAt" name="ccldAt" value={formData.ccldAt} onChange={handleChange} required /></div>
                            <div className="col-md-3">
                                <label htmlFor='ccldDt'>Ccld Dt:</label>
                                <input type='text' className="form-control" id="ccldDt" name="ccldDt" value={formData.ccldDt} onChange={handleChange} required /></div>
                        </div>

                        {/* Row 4 */}
                        <div className="row  mb-3">
                            <div className="col-md-3">   <label htmlFor='pointsUsed'>Points Used:</label>
                                <input type='text' className="form-control" id="pointsUsed" name="pointsUsed" value={formData.pointsUsed} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
                                <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={formData.paidFromAdvance} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='packageCode'>Package Code:</label>
                                <input type='text' className="form-control" id="packageCode" name="packageCode" value={formData.packageCode} onChange={handleChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='emrNo'>Emr No:</label>
                                <input type='text' className="form-control" id="emrNo" name="emrNo" value={formData.emrNo} onChange={handleChange} required /></div>
                        </div>
                    </div>
                    <div className="invoice-payment"><div className="row  mb-3">
                        <div className="col-md-4">
                            <label htmlFor='cashPaid'>Cash Paid:</label>
                            <input type='number' className="form-control" id="cashPaid" name="cashPaid" value={formData.cashPaid} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor='cardPaid'>Card Paid:</label>
                            <input type='number' className="form-control" id="cardPaid" name="cardPaid" value={formData.cardPaid} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor='cardNo'>Card No:</label>
                            <input type='text' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />   </div>
                    </div>
                    </div>

                  
                    {!isEditMode ? (
                        <button type="submit" className="btn btn-primary">      Create+         </button>
                    ) : (
                        <>
                            <button type="button" onClick={handleUpdate} className="btn btn-success">     Update        </button>
                            <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className=" ms-4 btn btn-secondary">    Cancel       </button>
                        </>
                    )}
                </form>

</div>
                <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
                <CustomDataTable
                    columns={thirdPartyHeadDataColumn(handleUpdateData, handleDelete)}
                    data={filterData(thirdPartyHeadData, searchTerm, ["tpaName", "tpaCode"],)}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20]}
                />
                <ExportData url={`${BASE_URL}tpahead/export`} fileName="TPA_head" previewData={patientsSubTypeData} />
            </div>
        </>
    );
};

export default PatientBillingHeader;

