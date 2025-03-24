import React, { useContext, useEffect, useRef, useState } from "react";
import { FormContext, InvoiceContext, UserContext } from "./Context";
import { submitForm, useFetchData } from "../utils/Actions";
import axios from "axios";
import { validatePatientBillingDetails, validatePaymentFields } from "../Invoice/ValidateForm";

export const InvoiceProvider = ({ children }) => {
  const { BASE_URL,patientDataMasterData,patientChgDepData,serviceMasterData,priceListDetailsData } = useContext(FormContext);
  const { singleUser } = useContext(UserContext);
  const [packagesMasterData, setPackagesMasterData] = useState([]);
  const [packagesDetailsData, setPackagesDetailsData] = useState([]);
  const [invoiceBillData, setInvoiceBillData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isInvoiceService, setIsInvoiceService] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);
    const [BillRulesData, setBillRulesData] = useState({});
    const [isPriceChange, setIsPriceChange] = useState(true);
  //..................
  const inputRef = useRef(null);
  const [focusInput, setFocusInput] = useState(false);
  const focusOnInput = () => {
    if (focusInput && inputRef.current) {
      inputRef.current.focus();
    }
  };
 //..................
  const [totals, setTotals] = useState({
    totalAmount: 0,
    totalDiscount: 0,
    totalPaid: 0,
    totalCredit: 0,
  });
  const handleShowModal = () => {
    setShowModal(true);
    console.log("invoice")
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

 //..................


  //-------------GET DATA----------
  // useFetchData(` ${BASE_URL }packagesMaster/getAll`,  setPackagesMasterData  );

  useFetchData(  ` ${BASE_URL }patientBilling/getAll`, setInvoiceBillData);
 
  useFetchData(` http://localhost:8005/packagesMasterData`, setPackagesMasterData);

  useFetchData(` http://localhost:8005/packagesDetailsData`, setPackagesDetailsData);

  useFetchData(`${BASE_URL }billRules/getAll`, setBillRulesData);
  console.log(BillRulesData)
 useEffect(() => {
  if (
    BillRulesData.length > 0 && // Ensure data exists
    BillRulesData[0].srvAmtEditable === "YES" &&
    BillRulesData[0].srvDiscountEditable === "YES" &&
    BillRulesData[0].srvPaidEditable === "YES"
  ) {
    setIsPriceChange(false); // Enable fields
  } else {
    setIsPriceChange(true); // Disable fields
  }
}, [BillRulesData]); // ✅ Runs when BillRulesData changes

// ✅ Track updated state
useEffect(() => {
  console.log("Updated isPriceChange:", isPriceChange);
}, [isPriceChange]); // ✅ Runs when isPriceChange updates

  const initialInvoiceData = {
    // billNo:"",

    patientBillingHeader: {
      // billDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      // billTmStmp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),// "YYYY-MM-DDTHH:mm:ss.sssZ"
      patientDataMaster: {
        patientCode: null,
      },
      patientDataMasterName: "",//
      patientDataMasterNameAr: "",//
      doctor: {
        doctorCode: ""  //    
      },

      policiesCharge: {
        chargeCode: "",
      },
      createdBy: singleUser.name,
      ccld: null,
      ccldBy: null,
      ccldAt: null,
      ccldDt: null,
      cashPaid: "",
      cardPaid: "",
      cardNo: "",
      pointsUsed: "",
      paidFromAdvance: "",
      packageCode: "",
      emrNo: "",
    },
    patientBillingDetails: [   ]
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  // Clear the form
  const clearInvoice = () => {
    setInvoiceData(initialInvoiceData);
  };

  const generateItemSlNo = () => {
    return invoiceData.patientBillingDetails.length + 1;
  };

  const initialPatientBillingDetails = {
    slNo: generateItemSlNo(),
    serviceMaster: { serviceCode: "" },
    serviceMasterName: "",
    quantity: "",
    serviceAmount: "",
    serviceDiscount: "",
    servicePaid: "",
    serviceCredit: "",
    serviceDone: "",
    serviceCancelled: "NO",
    serviceComment1: null,
    serviceComment2: null,

  };

  const [patientBillingDetails, setpatientBillingDetails] = useState(initialPatientBillingDetails);

  // Clear the form
  const clearpatientBillingDetails = () => {
    setpatientBillingDetails(initialPatientBillingDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoiceData((prevData) => {
        let updatedData = { ...prevData }; // Copy existing data

        if (name === "patientCode") {
            updatedData.patientBillingHeader.patientDataMaster.patientCode = value;

            // Find the selected patient details
            const selectedPatient = patientDataMasterData.find(patient => patient.patientCode === value);
            const selectedPatienchgcode = patientChgDepData.find(patient => patient.patientDataMaster.patientCode === value);

            // Update patient name if found
            if (selectedPatient) {
                updatedData.patientBillingHeader.patientDataMasterName = selectedPatient.patientName;
                updatedData.patientBillingHeader.patientDataMasterNameAr = selectedPatient.patientNameAr;
            } else {
                updatedData.patientBillingHeader.patientDataMasterName = "";
                updatedData.patientBillingHeader.patientDataMasterNameAr = "";
            }

            // ✅ Fix: Update chargeCode safely
            if (selectedPatienchgcode && selectedPatienchgcode.policiesCharge) {
                updatedData.patientBillingHeader.policiesCharge.chargeCode = selectedPatienchgcode.policiesCharge.chargeCode;
            } else {
                updatedData.patientBillingHeader.policiesCharge.chargeCode = "";
            }

            // ✅ Remove redundant `if (name === "patientCode")`
            updatedData.patientBillingHeader.patientDataMaster.packageCode = value || "0";
        }

        else if (name === "chargeCode") {
            updatedData.patientBillingHeader.policiesCharge.chargeCode = Number(value) || 0;
        }

        else if (name === "doctorCode") {
            updatedData.patientBillingHeader.doctor.doctorCode = Number(value) || 0;
        }

        // ✅ Convert specific fields to numbers
        else if (["cashPaid", "cardPaid", "cardNo", "pointsUsed", "paidFromAdvance"].includes(name)) {
            updatedData.patientBillingHeader[name] = Number(value) || 0;
        }

        // ✅ Root-level fields (non-number values)
        else if (["createdBy", "cvcld", "ccldBy", "ccldAt", "ccldDt", "packageCode", "emrNo"].includes(name)) {
            updatedData.patientBillingHeader[name] = value;
        }
       
        return updatedData; // Return the updated object
    });
};
useEffect(() => {
  if (singleUser?.name) {
    setInvoiceData(prevData => ({
      ...prevData,
      patientBillingHeader: {
        ...prevData.patientBillingHeader,
        createdBy: singleUser.name
      }
    }));
  }
}, [singleUser]);

 //.........................................................................
  
// Handle input changes
const handleServiceChange = (e) => {
  let { name, value } = e.target;

  setpatientBillingDetails((prevData) => {
      if (name === "serviceCode") {
          // Find the selected service details
          const selectedService = serviceMasterData.find(service => service.serviceCode === value) || {};
          const selectedServicePrice = priceListDetailsData.find(servicePrice => servicePrice.serviceMaster.serviceCode === value) || {};

          // Extract and ensure numeric values
          const baseAmount = Number(selectedServicePrice.grossAmt) || 0;
          const baseDiscount = Number(selectedServicePrice.discountAmt) || 0;
          const basePaid = Number(selectedServicePrice.coPaymentAmt) || 0;

          return {
              ...prevData,
              serviceMaster: {
                  ...prevData.serviceMaster,
                  serviceCode: value
              },
              serviceMasterName: selectedService.serviceName || "",
              // baseAmount, // Store base amount separately
              // baseDiscount,
              // basePaid,
              serviceAmount: baseAmount,
              serviceDiscount: baseDiscount,
              servicePaid: basePaid,
          };
      } 
      
      if (name === "quantity") {
          value = Number(value) || 1; // Default to 1 if invalid input
            }

      return {
          ...prevData,
          [name]: value,
      };
  });
};

 //.........................................................................
  const handleAddItem = () => {
    console.log(invoiceData);
    const errors = validatePatientBillingDetails(patientBillingDetails);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      alert("Please fix validation errors before proceeding.");
      return;
    }
    const newPatientBillingDetails = { ...patientBillingDetails, slNo: generateItemSlNo() };

    //  update patientBillingDetails array inside invoiceData object
    setInvoiceData((prevData) => ({
      ...prevData,
      patientBillingDetails: [...prevData.patientBillingDetails, newPatientBillingDetails]
    }));
    calculateTotals(invoiceData.patientBillingDetails)
    clearpatientBillingDetails();
    setFocusInput(true);
    focusOnInput();
  };

 //.........................................................................
 const calculateTotals = (billingDetails) => {
  return billingDetails.reduce(
    (acc, service) => {
      const quantity = service.quantity || 1; // Default quantity to 1 if missing

      acc.totalAmount += (parseFloat(service.serviceAmount) || 0) * quantity;
      acc.totalDiscount += (parseFloat(service.serviceDiscount) || 0) * quantity;
      acc.totalPaid += (parseFloat(service.servicePaid) || 0) * quantity;
      acc.totalCredit += (parseFloat(service.serviceCredit) || 0) * quantity;

      return acc;
    },
    { totalAmount: 0, totalDiscount: 0, totalPaid: 0, totalCredit: 0 } // Initial accumulator value
  );
};

useEffect(() => {
  if (invoiceData?.patientBillingDetails) {
    setTotals(calculateTotals(invoiceData.patientBillingDetails));
  }
}, [invoiceData]);

  
 //.........................................................................
  const validateTotalPaid = () => {
    const cashPaid = parseFloat(invoiceData.patientBillingHeader.cashPaid) || 0;
    const cardPaid = parseFloat(invoiceData.patientBillingHeader.cardPaid) || 0;
    const totalPaid = parseFloat(totals.totalPaid) || 0;
    const totalCredit = parseFloat(totals.totalCredit) || 0;
    // Fix floating-point precision issue
    console.log(Math.abs(totalCredit - (cashPaid + cardPaid)) < 0.01);
    return Math.abs(totalPaid - (cashPaid + cardPaid)) < 0.01;
  };

 //.........................................................................
  const handleSubmit = async () => {
    const errors = validatePaymentFields(invoiceData);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      alert("Please fix validation errors before proceeding.");
      return;
    }
    console.log(validateTotalPaid());
    if (validateTotalPaid()) {
      console.log(invoiceData)
      try {
        const response = await axios.post(`${BASE_URL}patientBilling/create`, invoiceData, {
        // const response = await axios.post(`http://localhost:8005/patientBill`, invoiceData, {
          headers: { "Content-Type": "application/json" }
        });

        // Check for successful status codes
        if (response.status >= 200 && response.status < 300) {
          alert("Form submitted successfully!");
          console.log(response.data)
          setInvoiceBillData((prevData) => [...prevData, response.data]);
          setIsInvoiceService(false);
          enableInvoiceHeader();
          clearInvoice();
          handleCloseModal();
          setNotEditMode(false)

        } else {
          alert(`Error submitting form: ${response.statusText}`);
        }
      } catch (error) {

        console.error("Submission error:", invoiceData);

        console.error("Submission error:", error);
        alert(error.response?.data?.message || "Network error. Please check your connection.");
      }
    }
    else {
      alert("Cash and Card amount must be equal to Service Total Credit.");
    }
  };
  
 //.........................................................................
  const enableInvoiceHeader = () => {
    const headerFields = document.querySelectorAll(".invoice-header input, .invoice-header select, .invoice-header textarea");
    headerFields.forEach(field => {
      field.readOnly = false;
      field.disabled = false; // Re-enable select elements
    });
  };

 //........................................................................
  return (
    <InvoiceContext.Provider value={{
      invoiceData, setInvoiceData, clearInvoice,handleChange,handleServiceChange,
      patientBillingDetails, setpatientBillingDetails, clearpatientBillingDetails,
      handleAddItem, handleSubmit,
      notEditMode, setNotEditMode,
      packagesMasterData, setPackagesMasterData,
      packagesDetailsData, setPackagesDetailsData,
      totals, setTotals,
      isInvoiceService, setIsInvoiceService,
      handleCloseModal, handleShowModal, showModal,
      invoiceBillData, setInvoiceBillData,
      focusInput, setFocusInput, inputRef,
      enableInvoiceHeader,
      isPriceChange, setIsPriceChange
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};



// const generateInvoiceNo = () => {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const sequenceNum = Math.floor(1000 + Math.random() * 9000); // Generating a random 4-digit number
//   return `${day}${month}-${sequenceNum}`;
// };
