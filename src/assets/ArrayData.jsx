import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import doc1 from "../assets/Doc1.jpg";
import doc2 from "../assets/Doc2.jpg";
import doc3 from "../assets/Doc3.png";
import doc4 from "../assets/Doc4.png";
// import dept1 from "../assets/dept1.jpg";
// import dept2 from "../assets/dept2.jpg";
// import dept3 from "../assets/dept3.jpg";
// import dept4 from "../assets/dept4.jpg";
// import dept5 from "../assets/dept5.jpg";
// import dept6 from "../assets/dept6.jpg";
import docter1 from "../assets/docter1.jpg";
import docter2 from "../assets/docter2.jpg";
import docter3 from "../assets/docter3.jpg";
import docter4 from "../assets/doctor4.jpg";
import docter5 from "../assets/doctor5.jpg";
import docter6 from "../assets/doctor6.jpg";

export const nationalityData = [
  {
    nationality: "American",
    nationalityCode: 1,
    nationalityFl: "هندي",
  },
  {
    nationality: "British",
    nationalityCode: 2,
    nationalityFl: "بريطاني",
  },
  {
    nationality: "Australian",
    nationalityCode: 3,
    nationalityFl: "أسترالي",
  },
  {
    nationality: "Indian",
    nationalityCode: 4,
    nationalityFl: "أمريكي",
  },
];
export const departmentData = [
  {
    deptCode: 1,
    deptGeneral: "N",
    deptImage: "/assets/dept1.jpg",
    deptName: "Neurology",
    deptNameFl: "طب الأعصاب",
  },
  {
    deptCode: 2,
    deptGeneral: "Y",
    deptImage: "/assets/dept2.jpg",
    deptName: "Dermatology",
    deptNameFl: "الأمراض الجلدية",
  },
  {
    deptCode: 3,
    deptGeneral: "N",
    deptImage: "/assets/dept3.jpg",
    deptName: "Pediatrics",
    deptNameFl: "طب الأطفال",
  },
  {
    deptCode: 4,
    deptGeneral: "Y",
    deptImage: "/assets/dept4.jpg",
    deptName: "Cardiology",
    deptNameFl: "القلب",
  },
];

export const docterData = [
  {
    doctorCode: 1,
    doctorName: "Dr. John Doe",
    drNameFl: "الدكتور جون دو",
    drImg: docter1,
    drActive: "Y",
    drLicNo: "123456",
    drDesignation: "Cardiologist",
    drDesignationFl: "طبيب قلب",
    drQualifications: "MD, PhD",
    drQualificationsFl: "دكتوراه في الطب",
    drGender: "Male",
    drSrtOrd: 1,
    costCenterCode: "CC001",
    department: {
      deptCode: 0,
    },
    nationality: {
      nationalityCode: 0,
    },
  },
  {
    doctorCode: 2,
    doctorName: "Dr. Jane Smith",
    drNameFl: "الدكتورة جين سميث",
    drImg: docter2,
    drActive: "Y",
    drLicNo: "654321",
    drDesignation: "Neurologist",
    drDesignationFl: "طبيب أعصاب",
    drQualifications: "MD, DM",
    drQualificationsFl: "دكتوراه في الطب، دكتوراه في الطب",
    drGender: "Female",
    drSrtOrd: 2,
    costCenterCode: "CC002",
    department: {
      deptCode: 1,
    },
    nationality: {
      nationalityCode: 1,
    },
  },
  {
    doctorCode: 3,
    doctorName: "Dr. Ahmed Hassan",
    drNameFl: "الدكتور أحمد حسن",
    drImg: docter3,
    drActive: "N",
    drLicNo: "789012",
    drDesignation: "Dermatologist",
    drDesignationFl: "طبيب الأمراض الجلدية",
    drQualifications: "MD, DVL",
    drQualificationsFl: "دكتوراه في الطب، دكتوراه في الأمراض الجلدية",
    drGender: "Male",
    drSrtOrd: 3,
    costCenterCode: "CC003",
    department: {
      deptCode: 2,
    },
    nationality: {
      nationalityCode: 2,
    },
  },
 
];

export const quality = [
  {
    id: 1,
    title: "Skilled Docters",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    img: doc1,
  },
  {
    id: 2,
    title: "Quality Services",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    img: doc2,
  },
  {
    id: 3,
    title: "Positive Reviews",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    img: doc3,
  },
  {
    id: 4,
    title: "Latest Equipment",
    text: "Some quick example text to build on the card title and make up the bulk of the card's content.",
    img: doc4,
  },
];

// departmentview
export const cards = [
  {
    id: 1,
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept1.jpg",
    title: "Cardiology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 2,
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept2.jpg",
    title: "Neurology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 3,
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept3.jpg",
    title: "Orthopedics",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content.",
  },
  {
    id: 4,
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept4.jpg",
    title: "Pediatrics",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 5,
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept5.jpg",
    title: "Dermatology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 6, // Fix the duplicate id issue here as well
    img: "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/dept6.jpg",
    title: "Dermatology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
];
const imgArray = [
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter1.jpg",
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter2.jpg",
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter3.jpg",
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter4.jpg",
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter3.jpg",
  "https://raw.githubusercontent.com/Gowrics/HIMS/main/src/assets/docter1.jpg"
];

   
//nationality table coloumn
export const nationalityColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Nationality",
    selector: (row) => row.nationality,
    sortable: true,
  },
  {
    name: "Nationality (FL)",
    selector: (row) => row.nationalityFl,
    sortable: true,
  },
  {
    name: "Nationality Code",
    selector: (row) => row.nationalityCode,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.nationalityCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.nationalityCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// patient sub type of patient
export const subTypePatientColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Schg Code",
    selector: (row) => row.schgCode,
    sortable: true,
  },
  {
    name: "hchgCode Code",
    selector: (row) => row.headCharge.hchgCode,
    sortable: true,
  },
 
  {
    name: "Schg Name",
    selector: (row) => row.schaName,
    sortable: true,
  },
  {
    name: "Active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Clinic Credit",
    selector: (row) => row.clinicCredit,
    sortable: true,
  },
  {
    name: "Ph Credit",
    selector: (row) => row.phCredit,
    sortable: true,
  },
  {
    name: "Other Credit",
    selector: (row) => row.otherCredit,
    sortable: true,
  },
  {
    name: "Icd Version ",
    selector: (row) => row.icdVersion,
    sortable: true,
  },
  {
    name: "Opt Credit",
    selector: (row) => row.optCredit,
    sortable: true,
  },
  {
    name: "toothSystem",
    selector: (row) => row.toothSystem,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.schgCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.schgCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
export const mainTypePatientColumn = (handleUpdateData, handleDelete) => [
  {
    name: "hchgName",
    selector: (row) => row.hchgName,
    sortable: true,
  },
  {
    name: "hchgCode",
    selector: (row) => row.hchgCode,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.hchgCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.hchgCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const thirdPartyHeadDataColumn = (handleUpdateData, handleDelete) => [
  {
    name: "tpaCode",
    selector: (row) => row.tpaCode,
    sortable: true,
  },
  {
    name: "tpaName",
    selector: (row) => row.tpaName,
    sortable: true,
  },
     {
    name: "schgCode",
    selector: (row) => row.subcharge.schgCode,
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.tpaCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.tpaCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const policiesSubPatientDataColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "chargeCode",
    selector: (row) => row.chargeCode,
    sortable: true,
  },
  {
    name: "chargeName",
    selector: (row) => row.chargeName,
    sortable: true,
  },
  {
    name: "schgCode",
    selector: (row) => row.subCharge.schgCode,
    sortable: true,
  },
  {
    name: "tpaCode",
    selector: (row) => row.tpaHead.tpaCode,
    sortable: true,
  },

  {
    name: "policyNo",
    selector: (row) => row.policyNo,
    sortable: true,
  },
  {
    name: "policyExpDate",
    selector: (row) => {
      const date = new Date(row.policyExpDate);
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      return date.toLocaleDateString('en-GB', options).toUpperCase();
    },
    sortable: true,
  },
  
  {
    name: "active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.chargeCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.chargeCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const subPoliciesPatientDataColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "policySubCode",
    selector: (row) => row.policySubCode,
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "policiesCharge",
    selector: (row) => row.policiesCharge.chargeCode,
    sortable: true,
  },
  {
    name: "maternityCovered",
    selector: (row) => row.maternityCovered,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.policySubCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.policySubCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const coPaymentCoverageDataColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "policyCopayId",
    selector: (row) => row.policyCopayId,
    sortable: true,
  },
  {
    name: "coPaymentAmt",
    selector: (row) => row.coPaymentAmt,
    sortable: true,
  },
  {
    name: "coPaymentPercent",
    selector: (row) => row.coPaymentPercent,
    sortable: true,
  },
  {
    name: "policiesCharge",
    selector: (row) => row.policiesCharge.chargeCode,
    sortable: true,
  },
  {
    name: "policySubCharge",
    selector: (row) => row.policySubCharge.policySubCode,
    sortable: true,
  },
  {
    name: "serviceCategory",
    selector: (row) => row.serviceCategory.serviceCategoryCode,
    sortable: true,
  },
  {
    name: "covered",
    selector: (row) => row.covered||"-",
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.policyCopayId)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.policyCopayId)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];


export const priceListColumn = (
   handleUpdateData,
   handleDelete
) => [
  {
    name: "priceListCode",
    selector: (row) => row.priceListCode,
    sortable: true,
  },
  {
    name: "priceListName",
    selector: (row) => row.priceListName,
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
           onClick={() => handleUpdateData(row.priceListCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.priceListCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const priceListDetailsColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "Id",
    selector: (row) => row.id,
    sortable: true,
  },
 {
   name: "grossAfmt",
   selector: (row) => row.grossAmt,
   sortable: true,
 },
 {
   name: "discountAmt",
   selector: (row) => row.discountAmt,
   sortable: true,
 },
 {
   name: "covered",
   selector: (row) => row.covered,
   sortable: true,
 },
 {
  name: "coPaymentPercent",
  selector: (row) => row.coPaymentPercent,
  sortable: true,
},
{
  name: "coPaymentAmt",
  selector: (row) => row.coPaymentAmt,
  sortable: true,
},
{
  name: "serviceCode",
  selector: (row) => row.serviceMaster.serviceCode,
  sortable: true,
},
{
  name: "priceListCode",
  selector: (row) => row.priceList.priceListCode,
  sortable: true,
},
 {
   name: "Action",
   cell: (row) => (
     <>
       <button
         className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.id)} // Use the passed function
       >
         Edit
       </button>
       <button
         className="btn btn-danger btn-sm"
         onClick={() => handleDelete(row.id)} // Use the passed function
       >
         Delete
       </button>
     </>
   ),
   ignoreRowClick: true,
   allowOverflow: true,
   button: true,
 },
];


export const priceListDepRuleDataColumn = (
  handleUpdateData,
  handleDelete
) => [
 {
   name: "depRuleNo",
   selector: (row) => row.depRuleNo,
   sortable: true,
 },
 {
   name: "depRuleName",
   selector: (row) => row.depRuleName,
   sortable: true,
 },
 {
   name: "Action",
   cell: (row) => (
     <>
       <button
         className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.depRuleNo)} // Use the passed function
       >
         Edit
       </button>
       <button
         className="btn btn-danger btn-sm"
         onClick={() => handleDelete(row.depRuleNo)} // Use the passed function
       >
         Delete
       </button>
     </>
   ),
   ignoreRowClick: true,
   allowOverflow: true,
   button: true,
 },
];

export const priceDetailsDepRuleColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "id",
    selector: (row) => row.id,
    sortable: true,
  },
 {
   name: "numberOfDays",
   selector: (row) => row.numberOfDays,
   sortable: true,
 },
 {
   name: "depRuleNo",
   selector: (row) => <row className="priceListDependency depRuleNo"></row>,
   sortable: true,
 },
 
{
  name: "serviceCode",
  selector: (row) => row.serviceMaster.serviceCode,
  sortable: true,
},
{
  name: "serviceCode",
  selector: (row) => row.dependencyServiceCode.serviceCode,
  sortable: true,
},
 {
   name: "Action",
   cell: (row) => (
     <>
       <button
         className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.id)} // Use the passed function
       >
         Edit
       </button>
       <button
         className="btn btn-danger btn-sm"
         onClick={() => handleDelete(row.id)} // Use the passed function
       >
         Delete
       </button>
     </>
   ),
   ignoreRowClick: true,
   allowOverflow: true,
   button: true,
 },
];


export const serviceCategoryColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "serviceCategoryCode",
    selector: (row) => row.serviceCategoryCode,
    sortable: true,
  },
  {
    name: "serviceCategoryName",
    selector: (row) => row.serviceCategoryName,
    sortable: true,
  },
 {
   name: "serviceTypeCons",
   selector: (row) => row.serviceTypeCons,
   sortable: true,
 },
 {
   name: "serviceTypeFollowup",
   selector: (row) => row.serviceTypeFollowup,
   sortable: true,
 },
 
{
  name: "serviceFreeFollowup",
  selector: (row) => row.serviceFreeFollowup,
  sortable: true,
},
 {
   name: "Action",
   cell: (row) => (
     <>
       <button
         className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.serviceCategoryCode)} // Use the passed function
       >
         Edit
       </button>
       <button
         className="btn btn-danger btn-sm"
         onClick={() => handleDelete(row.serviceCategoryCode)} // Use the passed function
       >
         Delete
       </button>
     </>
   ),
   ignoreRowClick: true,
   allowOverflow: true,
   button: true,
 },
];
export const cptCodesColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "cptCode",
    selector: (row) => row.cptCode,
    sortable: true,
  },
  {
    name: "cptName",
    selector: (row) => row.cptName,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.cptCode)} // Use the passed function
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.cptCode)} // Use the passed function
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const loincCodesColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "loincCode",
    selector: (row) => row.loincCode,
    sortable: true,
  },
  {
    name: "loincName",
    selector: (row) => row.loincName,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.loincCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.loincCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const serviceMasterColumn = (
  handleUpdateData,
  handleDelete
) => [
  {
    name: "Service Code",
    selector: (row) => row.serviceCode,
    sortable: true,
    // width:"5%"
  },
  {
    name: "Service Name",
    selector: (row) => row.serviceName,
    sortable: true,
    //  width:"5%"
  },
  {
    name: "Service Name (Arabic)",
    selector: (row) => row.serviceNameAr,
    sortable: true,
    //  width:"5%"
  },
  {
    name: "Service Category Code",
    selector: (row) => row.serviceCategoryCode.serviceCategoryCode,
    sortable: true,
  },
  {
    name: "Service Notes",
    selector: (row) => row.serviceNotes,
    sortable: true,
  },
  {
    name: "Filter 1",
    selector: (row) => row.serviceFilt1,
    sortable: true,
  },
  {
    name: "Filter 2",
    selector: (row) => row.serviceFilt2,
    sortable: true,
  },
  {
    name: "Total Visits",
    selector: (row) => row.subscriptionTotalNoVisits,
    sortable: true,
  },
  {
    name: "Visits Per Month",
    selector: (row) => row.subscriptionVisitsPerMonth,
    sortable: true,
  },
  {
    name: "Active",
    selector: (row) => row.active,
    sortable: true,
  },
  {
    name: "Subscription Service",
    selector: (row) => row.subscriptionService,
    sortable: true,
  },
  {
    name: "Tooth Mandatory",
    selector: (row) => row.toothMandatory,
    sortable: true,
  },
  {
    name: "CPT Code",
    selector: (row) => row.cptCodes.cptCode,
    sortable: true,
  },
  {
    name: "Loinc Code 1",
    selector: (row) => row.loincCodes1.loincCode,
    sortable: true,
  },
  {
    name: "Loinc Code 2",
    selector: (row) => row.loincCodes2.loincCode,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.serviceCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.serviceCode)}
        >
          Delete
        </button>
      </>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export const trimFormData = (data) => {
  const trimmedData = { ...data };

  // Trim all string fields in the top level of the formData
  for (const key in trimmedData) {
    if (typeof trimmedData[key] === "string") {
      trimmedData[key] = trimmedData[key].trim();
    }

    // If the field is an object (like subCharge or tpaHead), recursively trim its string fields
    if (typeof trimmedData[key] === "object" && trimmedData[key] !== null) {
      trimmedData[key] = trimFormData(trimmedData[key]); // recursive trimming
    }
  }

  return trimmedData;
};
