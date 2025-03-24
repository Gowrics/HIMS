import React, { useContext, useEffect, useState } from 'react';
import { FormContext, InvoiceContext, UserContext } from '../Context/Context';
import CustomSelect from '../utils/CustomSelect';
import ServiceList from './ServiceList';
import { UserProvider } from '../Context/UserProvider';
import { Link } from 'react-router';
const Services = () => {
    const { priceListDetailsData, BASE_URL, serviceMasterData, } = useContext(FormContext);
    const { handleCloseModal,handleAddItem, handleShowModal,inputRef,handleServiceChange, showModal,isInvoiceService, setIsInvoiceService, patientBillingDetails, setpatientBillingDetails, } = useContext(InvoiceContext);
    const { singleUser } = useContext(UserContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);


// Auto-update serviceCredit whenever serviceAmount, serviceDiscount, or servicePaid changes
useEffect(() => {
    setpatientBillingDetails((prevData) => ({
        ...prevData,
        serviceCredit: prevData.serviceAmount - prevData.serviceDiscount - prevData.servicePaid
    }));
}, [patientBillingDetails.serviceAmount, patientBillingDetails.serviceDiscount, patientBillingDetails.servicePaid]);
    return (
        <>
        { isInvoiceService && (
            <div className="row invoice-details">
                <div className="col-12">
                    <div className=" row p-2 ">
                        <div className="col-md-2">
                            <label htmlFor='serviceCode'>Service Code:</label>
                            {/* <input type='number' className="form-control" id="serviceCode" name="serviceCode" value={serviceData.serviceMaster.serviceCode} onChange={handleServiceChange} required /> */}

                            <CustomSelect
                                id="serviceCode"
                                ref={inputRef}
                                name="serviceCode"
                                valueKey="serviceCode"   // Dynamic value key
                                labelKey="serviceName"
                                data={serviceMasterData}  // Pass the raw data, no need to map
                                value={patientBillingDetails.serviceMaster.serviceCode}
                                onChange={handleServiceChange}
                                isDisabled={notEditMode}
                                placeholder="Select an option"
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor='serviceName'>Service Name:</label>
                            <input
                                type='text'
                                className="form-control"
                                id="serviceName"
                                name="serviceName"
                                value={patientBillingDetails.serviceMasterName}
                                onChange={handleServiceChange}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <label htmlFor='quantity'>Quantity:</label>
                            <input type='number' className="form-control" id="quantity" name="quantity" value={patientBillingDetails.quantity} onChange={handleServiceChange} required />
                        </div>
                        <div className="col-md-2">   <label htmlFor='serviceAmount'>Service Amount: </label>
                            <input type='number' className="form-control" id="serviceAmount" name="serviceAmount" value={patientBillingDetails.serviceAmount} onChange={handleServiceChange} required /></div>
                        <div className="col-md-2"> <label htmlFor='serviceDiscount'>Service Discount (₹):</label>
                            <input type='number' className="form-control" id="serviceDiscount" name="serviceDiscount" value={patientBillingDetails.serviceDiscount} onChange={handleServiceChange} required /></div>

                        <div className="col-md-2">   <label htmlFor='servicePaid'>Service Paid:</label>
                            <input type='number' className="form-control" id="servicePaid" name="servicePaid" value={patientBillingDetails.servicePaid} onChange={handleServiceChange} required /></div>
                        <div className="col-md-2"> <label htmlFor='serviceCredit'>Service Credid:</label>
                            <input type='number' className="form-control" id="serviceCredit" name="serviceCredit" value={patientBillingDetails.serviceCredit} onChange={handleServiceChange} required /></div>

                        <div className="col-md-2">   <label htmlFor='serviceComment1'>serviceComment1:</label>
                            <input type='text' className="form-control" id="serviceComment1" name="serviceComment1" value={patientBillingDetails.serviceComment1} onChange={handleServiceChange} required /></div>
                            <div className="col-md-2"> <label htmlFor='serviceDone'>Service Done:</label>
                            <select className="form-control" id="serviceDone" name="serviceDone" value={patientBillingDetails.serviceDone} onChange={handleServiceChange}  >
                                <option value="">Select an Option</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>
                            </div>
                            
                            <div className="col-md-6 mt-3 d-flex justify-content-center align-items-center ">
                                <button    type="button"   onClick={handleAddItem}  className="btn m-1 btn-primary"  > Add Item    </button>
                                <button    type="button" className="btn m-1 btn-primary" onClick={handleShowModal}>  Payment    </button>
                                  </div>
                    </div>
                  </div>
                 
                    
                    </div>
                    
        )}</>


        );
};

export default Services;
