import React, { useContext, useEffect, useRef, useState } from "react";
import { FormContext, AdvanceInvoiceContext, UserContext } from "./Context";
import { submitForm, useFetchData } from "../utils/Actions";
import axios from "axios";

import { validateAdvancePaymentFields, validateAdvanceReceiptsDetails } from "../Invoice/PatientBill/ValidateForm";

export const AdvInvProvider = ({ children }) => {
  const { BASE_URL, patientDataMasterData, patientChgDepData, serviceMasterData, priceListDetailsData } = useContext(FormContext);
  const { singleUser } = useContext(UserContext);
  // console.log(singleUser)
  const [packagesMasterData, setPackagesMasterData] = useState([]);
  const [packagesDetailsData, setPackagesDetailsData] = useState([]);
  const [invoiceBillData, setInvoiceBillData] = useState([]);
  const [advanceInvoiceBillData, setAdvanceInvoiceBillData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isInvoiceService, setIsInvoiceService] = useState(false);
  const [notEditMode, setNotEditMode] = useState(false);
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
    totalNetamount: 0,
    // totalCredit: 0,
  });
  const handleShowModal = () => {
    setShowModal(true);
    console.log("dfdfdf")
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //..................


  //-------------GET DATA----------
  // useFetchData(` ${BASE_URL }packagesMaster/getAll`,  setPackagesMasterData  );

  useFetchData(` ${BASE_URL}patientBilling/getAll`, setInvoiceBillData);
  
  useFetchData(` ${BASE_URL}advanceReceipt/getAll`, setAdvanceInvoiceBillData);

  useFetchData(` http://localhost:8005/packagesMasterData`, setPackagesMasterData);

  useFetchData(` http://localhost:8005/packagesDetailsData`, setPackagesDetailsData);
  //---------------------------------------

  const initialInvoiceData = {
    // billNo:"",

    advanceReceiptsHeader: {
      // billDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
      // billTmStmp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),// "YYYY-MM-DDTHH:mm:ss.sssZ"
      patientDataMaster: {
        patientCode: null,
      },
      patientDataMasterName: "",//
      // patientDataMasterNameAr: "",//
      doctor: {
        doctorCode: ""  //    
      },

      policiesCharge: {
        chargeCode: "",
      },
      createdBy: singleUser.name,
      ccld: null,
      ccldBy: null,
      // ccldAt: new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" }),// "YYYY-MM-DDTHH:mm:ss.sssZ"
      ccldDt: null ,// new Date().toISOString().split("T")[0],
      cashPaid: "",
      cardPaid: "",
      cardNo: "",
      // pointsUsed: "",
      // paidFromAdvance: "",
      // packageCode: "",
      // emrNo: "",
    },
    advanceReceiptsDetails: []
  };

  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  // Clear the form
  const clearInvoice = () => {
    setInvoiceData(initialInvoiceData);
  };

  const generateItemSlNo = () => {
    return invoiceData.advanceReceiptsDetails.length + 1;
  };

  const initialAdvanceReceiptsDetails = {
    slNo: generateItemSlNo(),
    serviceMaster: { serviceCode: "" },
    serviceMasterName: "",
    quantity: "",
    serviceAmount: "",
    serviceDiscount: "",
    // servicePaid: "",
    // serviceCredit: "",
    // serviceDone: "",
    // serviceCancelled: "NO",
    // serviceComment1: null,
    // serviceComment2: null,

  };

  const [advanceReceiptsDetails, setAdvanceReceiptsDetails] = useState(initialAdvanceReceiptsDetails);

  // Clear the form
  const clearAdvanceReceiptsDetails = () => {
    setAdvanceReceiptsDetails(initialAdvanceReceiptsDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInvoiceData((prevData) => {
      let updatedData = { ...prevData }; // Copy existing data

      if (name === "patientCode") {
        updatedData.advanceReceiptsHeader.patientDataMaster.patientCode = value;

        // Find the selected patient details
        const selectedPatient = patientDataMasterData.find(patient => patient.patientCode === value);
        const selectedPatienchgcode = patientChgDepData.find(patient => patient.patientDataMaster.patientCode === value);

        // Update patient name if found
        if (selectedPatient) {
          updatedData.advanceReceiptsHeader.patientDataMasterName = selectedPatient.patientName;
          // updatedData.advanceReceiptsHeader.patientDataMasterNameAr = selectedPatient.patientNameAr;
        } else {
          updatedData.advanceReceiptsHeader.patientDataMasterName = "";
          // updatedData.advanceReceiptsHeader.patientDataMasterNameAr = "";
        }

        // ✅ Fix: Update chargeCode safely
        if (selectedPatienchgcode && selectedPatienchgcode.policiesCharge) {
          updatedData.advanceReceiptsHeader.policiesCharge.chargeCode = selectedPatienchgcode.policiesCharge.chargeCode;
        } else {
          updatedData.advanceReceiptsHeader.policiesCharge.chargeCode = "";
        }

        // ✅ Remove redundant `if (name === "patientCode")`
        // updatedData.advanceReceiptsHeader.patientDataMaster.packageCode = value || "0";
      }

      else if (name === "chargeCode") {
        updatedData.advanceReceiptsHeader.policiesCharge.chargeCode = Number(value) || 0;
      }

      else if (name === "doctorCode") {
        updatedData.advanceReceiptsHeader.doctor.doctorCode = Number(value) || 0;
      }

      // ✅ Convert specific fields to numbers
      else if (["cashPaid", "cardPaid", "cardNo",].includes(name)) {
        updatedData.advanceReceiptsHeader[name] = Number(value) || 0;
      }

      // ✅ Root-level fields (non-number values)
      else if (["createdBy", "ccld", "cvcld", "ccldBy",  "ccldDt"].includes(name)) {
        updatedData.advanceReceiptsHeader[name] = value;
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


  // const handleServiceSelect = (service) => {
  //   // Find the price details for the selected service from the pricelistDatas array
  //   const selectPrice =
  //     pricelistDatas.find(
  //       (servicePrice) =>
  //         servicePrice.serviceMaster.serviceCode === service.serviceCode
  //     ) || {};
  
  //   // Extract price details or default to 0 if undefined
  //   const grossAmt = Number(selectPrice.grossAmt) || 0; // Gross amount per unit
  //   const discountAmt = Number(selectPrice.discountAmt) || 0; // Discount amount per unit
  //   const coPaymentAmt = Number(selectPrice.coPaymentAmt) || 0; // Paid amount per unit
  // const  qunty =Number(currentService.quantity)||1;
  //   // Scale the amounts based on the quantity
  //   const serviceAmount = grossAmt * qunty; // Total gross amount
  //   const serviceDiscount = discountAmt * qunty; // Total discount amount
  //   const servicePaid = coPaymentAmt * qunty; // Total paid amount
  
  //   // Calculate srv_credit using the formula: srv_amt - srv_discount - srv_paid
  //   const serviceCredit = Number(serviceAmount - serviceDiscount - servicePaid)* qunty;
  
  //   // Update the currentService state with the new values
  //   setCurrentService((prev) => ({
  //     ...prev, // Retain other properties
  //     serviceMaster: {
  //       ...prev.serviceMaster, // Retain existing properties of serviceMaster
  //       serviceCode: service.serviceCode, // Update serviceCode
  //     },
  //     serviceMasterName: service.serviceName, // Update serviceMasterName
  //     quantity, // Add or update the quantity
  //     serviceAmount, // Assign total gross amount
  //     serviceDiscount, // Assign total discount amount
  //     servicePaid, // Assign total paid amount
  //     serviceCredit, // Assign calculated credit
  //   }));
  // };




  const handleServiceChange = (e) => {
    let { name, value } = e.target;
  
    setAdvanceReceiptsDetails((prevData) => {
      if (name === "serviceCode") {
        // Find the selected service details
        const selectedService = serviceMasterData.find(service => service.serviceCode === value) || {};
        const selectedServicePrice = priceListDetailsData.find(servicePrice => servicePrice.serviceMaster.serviceCode === value) || {};
  
        // Extract and ensure numeric values
        const baseAmount = Number(selectedServicePrice.grossAmt) || 0;
        const baseDiscount = Number(selectedServicePrice.discountAmt) || 0;
  
        return {
          ...prevData,
          serviceMaster: {
            ...prevData.serviceMaster,
            serviceCode: value
          },
          serviceMasterName: selectedService.serviceName || "",
          serviceAmount: baseAmount, // Initialize with base amount
          serviceDiscount: baseDiscount // Initialize with base discount
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
    const errors = validateAdvanceReceiptsDetails(advanceReceiptsDetails);

    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      alert("Please fix validation errors before proceeding.");
      return;
    }
    const newAdvanceReceiptsDetails = { ...advanceReceiptsDetails, slNo: generateItemSlNo() };

    //  update advanceReceiptsDetails array inside invoiceData object
    setInvoiceData((prevData) => ({
      ...prevData,
      advanceReceiptsDetails: [...prevData.advanceReceiptsDetails, newAdvanceReceiptsDetails]
    }));
    calculateTotals(invoiceData.advanceReceiptsDetails)
    clearAdvanceReceiptsDetails();
    setFocusInput(true);
    focusOnInput();
  };

  //.........................................................................
  // const calculateTotals = (billingDetails) => {
  //   return billingDetails.reduce(
  //     (acc, service) => {
  //       acc.totalAmount += parseFloat(service.serviceAmount) || 0;
  //       acc.totalDiscount += parseFloat(service.serviceDiscount) || 0;
  //       // Calculate total net amount correctly
  //       acc.totalNetamount = acc.totalAmount - acc.totalDiscount;
  //       // acc.totalCredit += parseFloat(service.serviceCredit) || 0;
  //       return acc;
  //     },
  //     { totalAmount: 0, totalDiscount: 0, totalNetamount: 0 } // Initialize totalNetamount
  //   );
  // };
  // useEffect(() => {
  //   if (invoiceData?.advanceReceiptsDetails) {
  //     setTotals(calculateTotals(invoiceData.advanceReceiptsDetails));
  //   }
  // }, [invoiceData]);

  const calculateTotals = (billingDetails) => {
    return billingDetails.reduce(
      (acc, service) => {
        const quantity = service.quantity || 1; // Default quantity to 1 if missing
        
        acc.totalAmount += (parseFloat(service.serviceAmount) || 0) * quantity;
        acc.totalDiscount += (parseFloat(service.serviceDiscount) || 0) * quantity;
        acc.totalNetamount = acc.totalAmount - acc.totalDiscount;
  
        return acc;
      },
      { totalAmount: 0, totalDiscount: 0, totalNetamount: 0 } // Initialize totals
    );
  };
  
  useEffect(() => {
    if (invoiceData?.advanceReceiptsDetails) {
      setTotals(calculateTotals(invoiceData.advanceReceiptsDetails));
    }
  }, [invoiceData]);
  

  //.........................................................................
  const validateTotalPaid = () => {
    const cashPaid = parseFloat(invoiceData.advanceReceiptsHeader.cashPaid) || 0;
    const cardPaid = parseFloat(invoiceData.advanceReceiptsHeader.cardPaid) || 0;
    const totalNetamount = parseFloat(totals.totalNetamount) || 0;
    // const totalCredit = parseFloat(totals.totalCredit) || 0;
    // Fix floating-point precision issue
    console.log(Math.abs(totalNetamount - (cashPaid + cardPaid)) < 0.01);
    return Math.abs(totalNetamount - (cashPaid + cardPaid)) < 0.01;
  };

  //.........................................................................
  const handleSubmit = async () => {
    const errors = validateAdvancePaymentFields(invoiceData);
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      alert("Please fix validation errors before proceeding.");
      return;
    }
    console.log(validateTotalPaid());
    if (validateTotalPaid()) {
      try {
        const response = await axios.post(`${BASE_URL}advanceReceipt/create`, invoiceData, {
          // const response = await axios.post(`http://localhost:8005/patientBill`, invoiceData, {
          headers: { "Content-Type": "application/json" }
        });

        // Check for successful status codes
        if (response.status >= 200 && response.status < 300) {
          alert("Form submitted successfully!");
          console.log(response.data)
          setAdvanceInvoiceBillData((prevData) => [...prevData, response.data]);
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
        alert(error.response?.data?.message || "Network error. Pdddlease check your connection.");
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
    <AdvanceInvoiceContext.Provider value={{
      invoiceData, setInvoiceData, clearInvoice, handleChange, handleServiceChange,
      advanceReceiptsDetails, setAdvanceReceiptsDetails, clearAdvanceReceiptsDetails,
      handleAddItem, handleSubmit,
      notEditMode, setNotEditMode,
      packagesMasterData, setPackagesMasterData,
      packagesDetailsData, setPackagesDetailsData,
      totals, setTotals,
      isInvoiceService, setIsInvoiceService,
      handleCloseModal, handleShowModal, showModal,
      invoiceBillData, setInvoiceBillData,
      advanceInvoiceBillData,setAdvanceInvoiceBillData,
      focusInput, setFocusInput, inputRef,
      enableInvoiceHeader
    }}>
      {children}
    </AdvanceInvoiceContext.Provider>
  );
};



// const generateInvoiceNo = () => {
//   const date = new Date();
//   const day = String(date.getDate()).padStart(2, "0");
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const sequenceNum = Math.floor(1000 + Math.random() * 9000); // Generating a random 4-digit number
//   return `${day}${month}-${sequenceNum}`;
// };
