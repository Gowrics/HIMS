

import React, { useContext, useEffect, useState } from "react";
import { FormContext, AdvanceInvoiceContext, UserContext } from "../../Context/Context";
import CustomSelect from "../../utils/CustomSelect";
import ServiceList from "../ServiceList";
import { UserProvider } from "../../Context/UserProvider";
import { Link } from "react-router";


const Services = () => {
    const { priceListDetailsData, BASE_URL, serviceMasterData, } = useContext(FormContext);
    const { handleCloseModal,handleAddItem, handleShowModal,inputRef,handleServiceChange, showModal,isInvoiceService, setIsInvoiceService, advanceReceiptsDetails, setAdvanceReceiptsDetails, } = useContext(AdvanceInvoiceContext);
    const { singleUser } = useContext(UserContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);


// // Auto-update serviceCredit whenever serviceAmount, serviceDiscount, or servicePaid changes
// useEffect(() => {
//     setAdvanceReceiptsDetails((prevData) => ({
//         ...prevData,
//         serviceCredit: prevData.serviceAmount - prevData.serviceDiscount - prevData.servicePaid
//     }));
// }, [advanceReceiptsDetails.serviceAmount, advanceReceiptsDetails.serviceDiscount, advanceReceiptsDetails.servicePaid]);



    return (
        <>
        { isInvoiceService && (
            <div className="row invoice-details">
                <div className="col-12">
                    <div className=" row p-2 ">
                        <div className="col-md-3">
                            <label htmlFor='serviceCode'>Service Code:</label>
                            {/* <input type='number' className="form-control" id="serviceCode" name="serviceCode" value={serviceData.serviceMaster.serviceCode} onChange={handleServiceChange} required /> */}

                            <CustomSelect
                                id="serviceCode"
                                ref={inputRef}
                                name="serviceCode"
                                valueKey="serviceCode"   // Dynamic value key
                                labelKey="serviceName"
                                data={serviceMasterData}  // Pass the raw data, no need to map
                                value={advanceReceiptsDetails.serviceMaster.serviceCode}
                                onChange={handleServiceChange}
                                isDisabled={notEditMode}
                                placeholder="Select an option"
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor='serviceName'>Service Name:</label>
                            <input
                                type='text'
                                className="form-control"
                                id="serviceName"
                                name="serviceName"
                                value={advanceReceiptsDetails.serviceMasterName}
                                onChange={handleServiceChange}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor='quantity'>Quantity:</label>
                            <input type='number' className="form-control" id="quantity" name="quantity" value={advanceReceiptsDetails.quantity} onChange={handleServiceChange} required />
                        </div>
                        <div className="col-md-3">   <label htmlFor='serviceAmount'>Service Amount: </label>
                            <input type='number' className="form-control" id="serviceAmount" name="serviceAmount" value={advanceReceiptsDetails.serviceAmount} onChange={handleServiceChange} required /></div>
                        <div className="col-md-3"> <label htmlFor='serviceDiscount'>Service Discount (₹):</label>
                            <input type='number' className="form-control" id="serviceDiscount" name="serviceDiscount" value={advanceReceiptsDetails.serviceDiscount} onChange={handleServiceChange} required /></div>
                                                  <div className="col-md-6 d-flex justify-content-center align-items-center ">
                                <button
                                    type="button"
                                    onClick={handleAddItem}
                                    className="btn m-1 btn-primary"
                                >
                                    Add Item
                                </button>
                                <button type="button" className="btn m-1 btn-primary" onClick={handleShowModal}>
                                    Payment
                                </button>
                            </div>
                        {/* <div className="col-md-3">   <label htmlFor='slNo'>Sl  No:</label>
                            <input type='number' className="form-control" id="slNo" name="slNo" value={advanceReceiptsDetails.slNo} onChange={handleServiceChange} required /></div> */}

                        {/* <div className="col-md-3">
                            <label htmlFor='serviceCancelled'>Service Cancelled:</label>
                            <select className="form-control" id="serviceCancelled" name="serviceCancelled" value={advanceReceiptsDetails.serviceCancelled} onChange={handleServiceChange}  >
                                <option value="">Select an Option</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                        </div> */}
                    </div></div>
                 
                    
                    </div>
                    
        )}</>


        );
};

export default Services;
