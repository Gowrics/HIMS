export const validateInvoiceData = (data) => {
    let errors = {};

    const isValidString = (value) => typeof value === "string" && value.trim() !== "";


    // if (!isValidString(data?.patientBillingHeader?.patientDataMaster?.patientCode)) {
    //     errors.patientCode = "Patient code is required.";
    // }

    if (!isValidString(data?.patientBillingHeader?.patientDataMasterName)) {
        errors.patientName = "Patient name is required.";
    }

    if (!isValidString(data?.patientBillingHeader?.patientDataMasterNameAr)) {
        errors.patientNameAr = "Arabic patient name is required.";
    }
    if (typeof data?.patientBillingHeader?.doctor?.doctorCode !== "number" || data?.patientBillingHeader?.doctor?.doctorCode <= 0) {
        errors.doctorCode = "Doctor code is required and must be a valid number.";
    }
    
    if (typeof data?.patientBillingHeader?.policiesCharge?.chargeCode !== "number" || data?.patientBillingHeader?.policiesCharge?.chargeCode <= 0) {
        errors.chargeCode = "Charge code is required and must be a valid number.";
    }
    

    if (!isValidString(data?.patientBillingHeader?.createdBy)) {
        errors.createdBy = "Created by is required.";
        console.log(data?.patientBillingHeader.createdBy)
    }

    // if (typeof data?.patientBillingHeader?.cashPaid !== "number" || data?.patientBillingHeader?.cashPaid < 0) {
    //     errors.cashPaid = "Cash paid should be a non-negative number.";
    // }

    // if (typeof data?.patientBillingHeader?.cardPaid !== "number" || data?.patientBillingHeader?.cardPaid < 0) {
    //     errors.cardPaid = "Card paid should be a non-negative number.";
    // }

    // if (!isValidString(data?.patientBillingHeader?.cardNo)) {
    //     errors.cardNo = "Card number is required.";
    // }

    if (typeof data?.patientBillingHeader?.pointsUsed !== "number") {
        errors.pointsUsed = "Points used should be a number.";
    }

    if (typeof data?.patientBillingHeader?.paidFromAdvance !== "number") {
        errors.paidFromAdvance = "Paid from advance should be a number.";
    }

    if (!isValidString(data?.patientBillingHeader?.packageCode)) {
        errors.packageCode = "Package code is required.";
    }

    if (!isValidString(data?.patientBillingHeader?.emrNo)) {
        errors.emrNo = "EMR number is required.";
    }

    return errors;
};

export const validatePatientBillingDetails = (data) => {
    let errors = {};

    // ✅ Validate Service Code
    if (!data.serviceMaster.serviceCode.trim()) {
        errors.serviceCode = "Service code is required.";
    }

    // ✅ Validate Service Name
    if (!data.serviceMasterName) {
        errors.serviceName = "Service name is required.";
    }

    // ✅ Validate Quantity (Must be a number and > 0)
    if (!data.quantity || isNaN(data.quantity) || Number(data.quantity) <= 0) {
        errors.quantity = "Quantity must be a valid number greater than 0.";
    }

    // ✅ Validate Service Amount
    if (!data.serviceAmount || isNaN(data.serviceAmount) || Number(data.serviceAmount) < 0) {
        errors.serviceAmount = "Service amount must be a valid number greater than or equal to 0.";
    }

    // ✅ Validate Service Discount (Optional but must be a valid number)
    if (data.serviceDiscount && (isNaN(data.serviceDiscount) || Number(data.serviceDiscount) < 0)) {
        errors.serviceDiscount = "Service discount must be a valid number greater than or equal to 0.";
    }

    // ✅ Validate Service Paid (Optional but must be a valid number)
    if (data.servicePaid && (isNaN(data.servicePaid) || Number(data.servicePaid) < 0)) {
        errors.servicePaid = "Service paid must be a valid number greater than or equal to 0.";
    }

    // ✅ Validate Service Credit (Must be a valid number)
    if (data.serviceCredid && (isNaN(data.serviceCredid) || Number(data.serviceCredid) < 0)) {
        errors.serviceCredid = "Service credit must be a valid number greater than or equal to 0.";
    }

    // ✅ Validate Service Done (Required)
    if (!data.serviceDone.trim()) {
        errors.serviceDone = "Service done field is required.";
    }

    // ✅ Validate Service Cancelled (Required)
    if (!data.serviceCancelled.trim()) {
        errors.serviceCancelled = "Service cancelled field is required.";
    }

    // ✅ Validate Comments (Optional but should not exceed 200 characters)
    if (data.serviceComment1 && data.serviceComment1.length > 200) {
        errors.serviceComment1 = "Comment 1 should not exceed 200 characters.";
    }

    if (data.serviceComment2 && data.serviceComment2.length > 200) {
        errors.serviceComment2 = "Comment 2 should not exceed 200 characters.";
    }

    // ✅ Validate Serial Number (Required and must be a number)
    if (!data.slNo || isNaN(data.slNo) || Number(data.slNo) <= 0) {
        errors.slNo = "Serial number must be a valid number greater than 0.";
        console.log(data.slNo)
    }

    return errors; // Return errors object
};

export const validatePaymentFields = (data) => {
    let errors = {};

    if (typeof data?.patientBillingHeader?.cashPaid !== "number" || data.patientBillingHeader.cashPaid < 0) {
        errors.cashPaid = "Cash paid should be a non-negative number.";
    }
    
    if (typeof data?.patientBillingHeader?.cardPaid !== "number" || data.patientBillingHeader.cardPaid < 0) {
        errors.cardPaid = "Card paid should be a non-negative number.";
    }const cardNoStr = String(data?.patientBillingHeader?.cardNo).trim();
    if (cardNoStr.length !== 16) {
        errors.cardNo = "Card number must be 16 digits.";
    }
    
    

    return errors;
};
