import React, { useContext } from 'react';
import { FormContext, InvoiceContext } from '../Context/Context';

const InvoiceModal = ({ handleChange }) => {


    const { docterData} = useContext(FormContext);
    const {  invoiceData, totals, handleCloseModal, showModal, handleSubmit } = useContext(InvoiceContext);

    if (!showModal) return null;

    const getDoctorName = () => {
        return docterData.find(
            (doc) => doc.doctorCode === invoiceData.patientBillingHeader.doctor.doctorCode
        )?.doctorName || "N/A";
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Invoice Payment</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">

                        {/* Invoice Header */}
                        <div className="header mb-4">
                            <p><strong>Date:</strong><br /> {new Date().toISOString().split("T")[0] || "N/A"}</p>
                            <p><strong>Time:</strong><br /> {new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) || "N/A"}</p>
                            <p><strong>Patient:</strong><br />
                                {invoiceData?.patientBillingHeader?.patientDataMasterName || "N/A"} ({invoiceData.patientBillingHeader.patientDataMasterNameAr})
                            </p>
                            <p><strong>Doctor Name:</strong><br /> {getDoctorName()}</p>
                        </div>

                        {/* Service Table */}
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered text-center">
                                <thead className="table-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Service Code</th>
                                        <th>Service Name</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Paid Amount</th>
                                        <th>Credit</th>
                                        <th>Service Done</th>
                                        <th>Comments</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.patientBillingDetails.map((service, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{service?.serviceMaster?.serviceCode || "N/A"}</td>
                                            <td>{service?.serviceMasterName || "N/A"}</td>
                                            <td>${service?.serviceAmount || 0}</td>
                                            <td>${service?.serviceDiscount || 0}</td>
                                            <td>${service?.servicePaid || 0}</td>
                                            <td>${service?.serviceCredit || 0}</td>
                                            <td>{service?.serviceDone || "No"}</td>
                                            <td>{service?.serviceComment1 || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Invoice Summary */}
                        <div className="invoice-summary">
                            <div>
                                <h4>Invoice Summary</h4>
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Total:</strong> ${totals.totalAmount}</p>
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Credit:</strong> ${totals.totalCredit}</p>
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Discount:</strong> ${totals.totalDiscount}</p>
                                <hr />
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Paid:</strong> ${totals.totalPaid}</p>
                                <hr />
                            </div>
                        </div>
                        {/* Payment Inputs */}
                        <div className="payment">
                            <div >
                                <label htmlFor='cashPaid'>Cash Paid:</label>
                                <input type='number' className="form-control" id="cashPaid" name="cashPaid" value={invoiceData.cashPaid} onChange={handleChange} required />
                            </div>
                            <div>
                                <label htmlFor='cardPaid'>Card Paid:</label>
                                <input type='number' className="form-control" id="cardPaid" name="cardPaid" value={invoiceData.cardPaid} onChange={handleChange} required />
                            </div>
                            <div >
                                <label htmlFor='cardNo'>Card No:</label>
                                <input type='text' className="form-control" id="cardNo" name="cardNo" value={invoiceData.cardNo} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;
