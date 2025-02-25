import React, { useContext, useState } from 'react';
import { FormContext, InvoiceContext } from '../Context/Context';
import CustomSelect from '../utils/CustomSelect';
import ServiceList from './ServiceList';
const InvoiceForm1 = () => {

    const { setValidtationMessage, BASE_URL, thirdPartyHeadData, patientDataMasterData, patientsSubTypeData, serviceMasterData, setServiceMasterData } = useContext(FormContext);
    const {  handleAddItem, invoiceData, setInvoiceData, serviceData, setServiceData, handleSubmit } = useContext(InvoiceContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);
    console.log(serviceData)

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "patientCode") {
            setInvoiceData((prevData) => ({
                ...prevData,
                patientDataMasterCode: {
                    ...prevData.patientDataMasterCode,
                    patientCode: value,
                },
            }));
        } else if (name === "chgCode") {
            setInvoiceData((prevData) => ({
                ...prevData,
                policiesCharge: {
                    ...prevData.policiesCharge,
                    chgCode: value,
                },
            }));
        }
        else if (name === "patientName") {
            setInvoiceData((prevData) => ({
                ...prevData,
                patientDataMasterName: {
                    ...prevData.patientDataMasterName,
                    patientName: value,
                },
            }));
        }
        else if (name === "patientNameAr") {
            setInvoiceData((prevData) => ({
                ...prevData,
                patientDataMasterNameAr: {
                    ...prevData.patientDataMasterNameAr,
                    patientNameAr: value,
                },
            }));
        }

        else {
            setInvoiceData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

        }
    };
    const handleServiceChange = (e) => {
        const { name, value } = e.target;
        if (name === "serviceCode") {
            setServiceData((prevData) => ({
                ...prevData,
                serviceMaster: {
                    ...prevData.serviceMaster,
                    serviceCode: value,
                },
            }));
        } else {
            setServiceData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    return (
        <div className=" page-content container-fluid invoice-container">
            {/* Invoice Title */}
            <div className="row invoice-title text-center">
                <h2>Invoice</h2>
            </div>
            <form>
                {/* Invoice Header */}
                <div className="row invoice-header d-flex align-items-center">
                    <div className="col-12">

                        {/* Row 1 */}
                        <div className="row invoice-header-detail ">
                            <div className="col-md-3">
                                <label htmlFor="billNo" className="form-label">
                                    Bill No
                                </label>
                                <input type="text" className="form-control" id="billNo" name="billNo" value={invoiceData.billNo} onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="billDate" className="form-label">
                                    Bill Date
                                </label>
                                <input type="date" className="form-control" id="billDate" name="billDate" value={invoiceData.billDate} onChange={handleChange} required />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="billTmStmp" className="form-label">
                                    Bill Time Stamp
                                </label>
                                <input type="time" className="form-control" id="billTmStmp" name="billTmStmp" value={invoiceData.billTmStmp} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="invoice-main-details">
                            <div className=" row ">
                                <div className="col-md-3">
                                    <label htmlFor='patientCode'>Patient Code:</label>
                                    <input type='text' className="form-control" id="patientCode" name="patientCode" value={invoiceData.patientDataMasterCode.patientCode} onChange={handleChange} required />
                               
                                    {/* <CustomSelect
                                        id="patientCode"
                                        name="patientCode"
                                        valueKey="patientCode"   // Dynamic value key
                                        labelKey="patientName"
                                        data={patientDataMasterData}  // Pass the raw data, no need to map
                                        value={invoiceData.patientDataMasterCode.patientCode}
                                        onChange={handleChange}
                                        isDisabled={notEditMode}
                                        placeholder="Select an option"
                                    /> */}
                                    {/* <input type='text' className="form-control" id="patientCode" name="patientCode" value={invoiceData.patientCode} onChange={handleChange} required /> */}
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor='patientName'>Patient Name:</label>
                                    <input type='text' className="form-control" id="patientName" name="patientName" value={invoiceData.patientDataMasterName.patientName} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3">   <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
                                    <input type='text' className="form-control" id="patientNameAr" name="patientNameAr" value={invoiceData.patientDataMasterNameAr.patientNameAr} onChange={handleChange} required /></div>
                                <div className="col-md-3"> <label htmlFor='coCode'>Co Code:</label>
                                    <input type='text' className="form-control" id="coCode" name="coCode" value={invoiceData.coCode} onChange={handleChange} required /></div>
                            </div>

                            {/* Row 2 */}
                            <div className=" row  mb-3">
                                <div className="col-md-3">  <label htmlFor='coCodeBr'>Co Code Br:</label>
                                    <input type='text' className="form-control" id="coCodeBr" name="coCodeBr" value={invoiceData.coCodeBr} onChange={handleChange} required /></div>

                                <div className="col-md-3">
                                    <label htmlFor='refDeptCode'>Ref Dept Code:</label>
                                    <input type='text' className="form-control" id="refDeptCode" name="refDeptCode" value={invoiceData.refDeptCode} onChange={handleChange} required /></div>
                                <div className="col-md-3">
                                    <label htmlFor='chargeCode'>Chg Code:</label>
                                    <input type='text' className="form-control" id="chgCode" name="chgCode" value={invoiceData.policiesCharge.chgCode} onChange={handleChange} required /></div>
                                <div className="col-md-3">
                                    <label htmlFor='createdBy'>Created By:</label>
                                    <input type='text' className="form-control" id="createdBy" name="createdBy" value={invoiceData.createdBy} onChange={handleChange} required /></div>

                            </div>

                            {/* Row 3 */}
                            <div className="row  ">

                                <div className="col-md-3">   <label htmlFor='cvcld'>Ccld:</label>
                                    <select className="form-control" id="cvcld" name="cvcld" value={invoiceData.cvcld} onChange={handleChange}  >
                                        <option value="">Select an Option</option>
                                        <option value="YES">YES</option>
                                        <option value="NO">NO</option>
                                    </select></div>
                                <div className="col-md-3">
                                    <label htmlFor='ccldBy'>Ccld By:</label>
                                    <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={invoiceData.ccldBy} onChange={handleChange} required /></div>
                                <div className="col-md-3">
                                    <label htmlFor='ccldAt'>Ccld At:</label>
                                    <input type='text' className="form-control" id="ccldAt" name="ccldAt" value={invoiceData.ccldAt} onChange={handleChange} required /></div>

                                <div className="col-md-3">
                                    <label htmlFor='ccldDt'>Ccld Dt:</label>
                                    <input type='text' className="form-control" id="ccldDt" name="ccldDt" value={invoiceData.ccldDt} onChange={handleChange} required /></div>

                            </div>
                            <div className="row p-2">
                                <div className="col-md-3">   <label htmlFor='pointsUsed'>Points Used:</label>
                                    <input type='text' className="form-control" id="pointsUsed" name="pointsUsed" value={invoiceData.pointsUsed} onChange={handleChange} required /></div>
                                <div className="col-md-3"> <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
                                    <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={invoiceData.paidFromAdvance} onChange={handleChange} required /></div>
                                <div className="col-md-3"> <label htmlFor='packageCode'>Package Code:</label>
                                    <input type='text' className="form-control" id="packageCode" name="packageCode" value={invoiceData.packageCode} onChange={handleChange} required /></div>
                                <div className="col-md-3"> <label htmlFor='emrNo'>Emr No:</label>
                                    <input type='text' className="form-control" id="emrNo" name="emrNo" value={invoiceData.emrNo} onChange={handleChange} required /></div>
                            </div>
                            <div className='row mb-3 invoice-payment'>
                                <div className="col-md-3">
                                    <label htmlFor='cashPaid'>Cash Paid:</label>
                                    <input type='number' className="form-control" id="cashPaid" name="cashPaid" value={invoiceData.cashPaid} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor='cardPaid'>Card Paid:</label>
                                    <input type='number' className="form-control" id="cardPaid" name="cardPaid" value={invoiceData.cardPaid} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor='cardNo'>Card No:</label>
                                    <input type='text' className="form-control" id="cardNo" name="cardNo" value={invoiceData.cardNo} onChange={handleChange} required />   </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Invoice Details */}
                <div className="row invoice-details">
                    <div className="col-12">
                        <div className=" row p-2 ">
                            <div className="col-md-3">
                                <label htmlFor='serviceCode'>Service Code:</label>
                                <input type='number' className="form-control" id="serviceCode" name="serviceCode" value={serviceData.serviceMaster.serviceCode} onChange={handleServiceChange} required />
                  
                                {/* <CustomSelect
                                    id="serviceCode"
                                    name="serviceCode"
                                    valueKey="serviceCode"   // Dynamic value key
                                    labelKey="serviceCode"
                                    data={serviceMasterData}  // Pass the raw data, no need to map
                                    value={serviceData.serviceMaster.serviceCode}
                                    onChange={handleServiceChange}
                                    isDisabled={notEditMode}
                                    placeholder="Select an option"
                                /> */}
                            </div>
                            <div className="col-md-3">
                                <label htmlFor='quantity'>Quantity:</label>
                                <input type='number' className="form-control" id="quantity" name="quantity" value={serviceData.quantity} onChange={handleServiceChange} required />
                            </div>
                            <div className="col-md-3">   <label htmlFor='serviceAmount'>Service Amount:</label>
                                <input type='number' className="form-control" id="serviceAmount" name="serviceAmount" value={serviceData.serviceAmount} onChange={handleServiceChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='serviceDiscount'>Service Discount:</label>
                                <input type='number' className="form-control" id="serviceDiscount" name="serviceDiscount" value={serviceData.serviceDiscount} onChange={handleServiceChange} required /></div>
                        </div>
                        <div className=" row p-2">

                            <div className="col-md-3">
                                <label htmlFor='quantity'>Service Special Discount:</label>
                                <input type='number' className="form-control" id="serviceSpecialDiscount" name="serviceSpecialDiscount" value={serviceData.serviceSpecialDiscount} onChange={handleServiceChange} required />
                            </div>
                            <div className="col-md-3">   <label htmlFor='servicePaid'>Service Paid:</label>
                                <input type='number' className="form-control" id="servicePaid" name="servicePaid" value={serviceData.servicePaid} onChange={handleServiceChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='serviceCredid'>Service Credid:</label>
                                <input type='number' className="form-control" id="serviceCredid" name="serviceCredid" value={serviceData.serviceCredid} onChange={handleServiceChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='serviceDone'>Service Done:</label>
                                <select className="form-control" id="serviceDone" name="serviceDone" value={serviceData.serviceDone} onChange={handleServiceChange}  >
                                    <option value="">Select an Option</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select></div>

                        </div>
                        <div className=" row p-2 ">

                            <div className="col-md-3">
                                <label htmlFor='serviceCancelled'>Service Cancelled:</label>
                                <select className="form-control" id="serviceCancelled" name="serviceCancelled" value={serviceData.serviceCancelled} onChange={handleServiceChange}  >
                                    <option value="">Select an Option</option>
                                    <option value="YES">YES</option>
                                    <option value="NO">NO</option>
                                </select>
                            </div>
                            <div className="col-md-3">   <label htmlFor='ReturnNumber'>Return Number:</label>
                                <input type='text' className="form-control" id="ReturnNumber" name="ReturnNumber" value={serviceData.ReturnNumber} onChange={handleServiceChange} required /></div>
                            <div className="col-md-3"> <label htmlFor='returnQuantity'>Return Quantity:</label>
                                <input type='number' className="form-control" id="returnQuantity" name="returnQuantity" value={serviceData.returnQuantity} onChange={handleServiceChange} required /></div>
                                <div className='row mb-3 invoice-payment'>
                                <div className="col-md-3">
                                    <label htmlFor='cashPaid'>Cash Paid:</label>
                                    <input type='number' className="form-control" id="cashPaid" name="cashPaid" value={invoiceData.cashPaid} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor='cardPaid'>Card Paid:</label>
                                    <input type='number' className="form-control" id="cardPaid" name="cardPaid" value={invoiceData.cardPaid} onChange={handleChange} required />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor='cardNo'>Card No:</label>
                                    <input type='text' className="form-control" id="cardNo" name="cardNo" value={invoiceData.cardNo} onChange={handleChange} required />   </div>
                            </div>
                            <div className="col-md-3">
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    className="btn m-1 btn-primary"
                                >
                                    Add Item
                                </button>
                                <button     onClick={handleSubmit}     type="button" className="btn m-1 btn-primary"    >
                                submit                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </form>
            <div className="table-responsive">
                <ServiceList />
            </div>
            {/* Invoice Footer */}
            {/* <div className="row invoice-footer text-center">
                <div className="col-12">
                    <p>Footer Information</p>
                </div>
            </div> */}
        </div>
    );
};

export default InvoiceForm1;
