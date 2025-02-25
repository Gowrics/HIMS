import React, { useContext, useEffect, useState } from "react";
import { FormContext, InvoiceContext } from "./Context";
import { useFetchData } from "../utils/Actions";

export const InvoiceProvider = ({ children }) => {

  const { BASE_URL, } = useContext(FormContext);
  // const [invoiceId, setInvoiceId] = useState("");

  const [patientBillingHeaderData, setPatientBillingHeaderData] = useState([]);

  const generateInvoiceNo = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const sequenceNum = Math.floor(1000 + Math.random() * 9000); // Generating a random 4-digit number
    return `${day}${month}-${sequenceNum}`;
  };
  useFetchData(
    ` ${BASE_URL}policySubCopay/getAll`,
    setPatientBillingHeaderData
  );



  const initialServiceData = {
    serviceMaster: { serviceCode: "" },
    quantity: "",
    serviceAmount: "",
    serviceDiscount: "",
    serviceSpecialDiscount: "",
    servicePaid: "",
    serviceCredid: "",
    serviceDone: "",
    serviceCancelled: "",
    ReturnNumber: "",
    returnQuantity: ""
  
  };


  const [serviceData, setServiceData] = useState(initialServiceData);

  // Clear the form
  const clearService= () => {
    setServiceData(initialServiceData);
  };

  const initialInvoiceData = {
    billNo: generateInvoiceNo(),
    billDate: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
    billTmStmp: new Date().toTimeString().split(" ")[0].slice(0, 5), // Format as HH:MM
    patientDataMasterCode: {
      patientCode: null,
    },
    patientDataMasterName: {
      patientName: ""
    },
    patientDataMasterNameAr: {
      patientNameAr: ""
    },
    coCode: "",
    coCodeBr: "",
    refDeptCode: "",
    policiesCharge: {
      chgCode: "",
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
    emrNo: "", // string(100)
    patientBillingDetails: []
  };


  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);

  // Clear the form
  const clearInvoice = () => {
    setInvoiceData(initialInvoiceData);
  };
  
  const handleAddItem = () => {
    console.log(invoiceData);

    const newServiceData = { ...serviceData };

    // Correct way to update patientBillingDetails array inside invoiceData object
    setInvoiceData((prevData) => ({
        ...prevData,
        patientBillingDetails: [...prevData.patientBillingDetails, newServiceData]
    }));

    console.log("Updated invoiceData:", invoiceData);

    // Clear the form
    clearService();
};

const handleSubmit = () => {
  console.log(invoiceData);
  alert("submitj")


  // Clear the form
  clearInvoice();
};



  return (
    <InvoiceContext.Provider value={{
      patientBillingHeaderData, setPatientBillingHeaderData, generateInvoiceNo,
      invoiceData, setInvoiceData,serviceData, setServiceData,clearInvoice,clearService,handleAddItem,handleSubmit
    }}>
      {children}
    </InvoiceContext.Provider>
  );
};
