import React, { useContext } from 'react';
import { AdvanceInvoiceContext, FormContext } from '../../Context/Context';

const InvoiceModal = ({ handleChange }) => {


    const { docterData } = useContext(FormContext);
    const { invoiceData, totals, handleCloseModal, showModal, handleSubmit } = useContext(AdvanceInvoiceContext);

    if (!showModal) return null;
    console.log("show   :", showModal)

    const getDoctorName = () => {
        console.log(docterData)
        return docterData.find(
            (doc) => doc.doctorCode === invoiceData.advanceReceiptsHeader.doctor.doctorCode
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
                                {invoiceData?.advanceReceiptsHeader?.patientDataMasterName || "N/A"}
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
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Discount</th>
                                        <th>Net Amount</th>

                                    </tr>



                                </thead>
                                <tbody>
                                    {invoiceData.advanceReceiptsDetails.map((service, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{service?.serviceMaster?.serviceCode || "N/A"}</td>
                                            <td>{service?.serviceMasterName || "N/A"}</td>
                                            <td>{service?.quantity || "N/A"}</td>
                                            <td>${(service?.serviceAmount || 0) * service.quantity}</td>
                                            <td>${(service?.serviceDiscount || 0) * service.quantity}</td>
                                            <td>${((service?.serviceAmount || 0) * service.quantity) - ((service?.serviceDiscount || 0) * service.quantity)}</td>
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
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Discount:</strong> ${totals.totalDiscount}</p>
                                <hr />
                                <p><strong style={{ width: "90px", display: "inline-block" }}>Net Amount:</strong> ${totals.totalNetamount}</p>
                                <hr />
                            </div>
                        </div>
                        {/* Payment Inputs */}
                        <div className="payment">
                            <div >
                                <label htmlFor='cashPaid'>Cash Paid:</label>
                                <input type='number' className="form-control " id="cashPaid" name="cashPaid" value={invoiceData.cashPaid} onChange={handleChange} required />
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
