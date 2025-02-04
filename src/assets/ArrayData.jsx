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
  doctorName: "Dr. Sarah Lee",
  drNameFl: "الدكتورة سارة لي",
  drImg: docter3, // You can replace this with the appropriate image reference
  drActive: "Y",
  drLicNo: "123456",
  drDesignation: "Pediatrician",
  drDesignationFl: "طبيب أطفال",
  drQualifications: "MBBS, MD",
  drQualificationsFl: "بكالوريوس الطب، دكتوراه في الطب",
  drGender: "Female",
  drSrtOrd: 3,
  costCenterCode: "CC003",
  department: {
    deptCode: 2, // Assuming department code for Pediatrics
  },
  nationality: {
    nationalityCode: 2, // Assuming nationality code for the specific nationality
  },
}
,
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


export const departmentColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Department Code",
    selector: (row) => row.deptCode,
    sortable: true,
  },
  {
    name: "Department Name",
    selector: (row) => row.deptName,
    sortable: true,
  },
  {
    name: "Department Name (FL)",
    selector: (row) => row.deptNameFl,
    sortable: true,
  },
  {
    name: ",Department Image",
    selector: (row) => row.deptImage,
    sortable: true,
    width:"500px"
  },
  {
    name: ",Department General",
    selector: (row) => row.deptGeneral,
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleUpdateData(row.deptCode)}
        >
          Edit
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(row.deptCode)}
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

export const docterColumn = (handleUpdateData, handleDelete) =>[
    {
      name: "  Doctor Code",
      selector: (row) => row.doctorCode,
      sortable: true,
          },
    {
      name: " Department Code",
      selector: (row) => row.department.deptCode,
      sortable: true,
    },
    {
      name: " Doctor Name",
      selector: (row) => row.doctorName,
      sortable: true,
    },
    {
      name: "  Doctor Name (FL)",
      selector: (row) => row.drNameFl,
      sortable: true,
    },
    {
      name: " Gender",
      selector: (row) => row.drGender,
      sortable: true,
    },
    {
      name: "  License No",
      selector: (row) => row.drLicNo,
      sortable: true,
    },
    {
      name: " Doctor Designation",
      selector: (row) => row.drDesignation,
      sortable: true,
    },
    {
      name: "   Doctor Designation (FL)",
      selector: (row) => row.drDesignationFl,
      sortable: true,
    },
    {
      name: "   Doctor Qualifications",
      selector: (row) => row.drQualifications,
      sortable: true,
    },
    {
      name: " Doctor Qualifications (FL)",
      selector: (row) => row.drQualificationsFl,
      sortable: true,
    },
    {
      name: " Sort Order",
      selector: (row) => row.drSrtOrd,
      sortable: true,
    },
    {
      name: "   Nationality Code",
      selector: (row) => row.nationality.nationalityCode,
      sortable: true,
    },
    {
      name: " Doctor Image (URL)",
      selector: (row) => row.drImg,
      sortable: true,
      width:"500px"
    },
    {
      name: "     Cost Center Code",
      selector: (row) => row.costCenterCode,
      sortable: true,
    },
    {
      name: " Docter Active",
      selector: (row) => row.drActive,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary  btn-sm"
            onClick={() => handleUpdateData(row.doctorCode)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.doctorCode)}
          >
            Delete
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]


const handleNull = (value) => (value === null || value === undefined ? "Null" : value);

// patient sub type of patient
export const subTypePatientColumn = (handleUpdateData, handleDelete) => [
  {
    name: "Schg Code",
    selector: (row) => handleNull(row.schgCode),
    sortable: true,
  },
  {
    name: "hchgCode Code",
    selector: (row) => handleNull(row.headCharge?.hchgCode), // Added optional chaining for safety
    sortable: true,
  },
  {
    name: "priceList",
    selector: (row) => handleNull(row.priceList?.priceListCode), // Optional chaining for nested object
    sortable: true,
  },
  {
    name: "Schg Name",
    selector: (row) => handleNull(row.schaName),
    sortable: true,
  },
  {
    name: "Active",
    selector: (row) => handleNull(row.active),
    sortable: true,
  },
  {
    name: "Clinic Credit",
    selector: (row) => handleNull(row.clinicCredit),
    sortable: true,
  },
  {
    name: "Ph Credit",
    selector: (row) => handleNull(row.phCredit),
    sortable: true,
  },
  {
    name: "Other Credit",
    selector: (row) => handleNull(row.otherCredit),
    sortable: true,
  },
  {
    name: "Icd Version",
    selector: (row) => handleNull(row.icdVersion),
    sortable: true,
  },
  {
    name: "Opt Credit",
    selector: (row) => handleNull(row.optCredit),
    sortable: true,
  },
  {
    name: "toothSystem",
    selector: (row) => handleNull(row.toothSystem),
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
    selector: (row) => handleNull(row.tpaCode),
    sortable: true,
  },
  {
    name: "tpaName",
    selector: (row) => handleNull(row.tpaName),
    sortable: true,
  },
  {
    name: "schgCode",
    selector: (row) => handleNull(row.subcharge?.schgCode), // Optional chaining for safety
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => handleNull(row.active),
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
    selector: (row) => handleNull(row.chargeCode),
    sortable: true,
  },
  {
    name: "chargeName",
    selector: (row) => handleNull(row.chargeName),
    sortable: true,
  },
  {
    name: "schgCode",
    selector: (row) => handleNull(row.subCharge?.schgCode), // Optional chaining for safety
    sortable: true,
  },
  {
    name: "tpaCode",
    selector: (row) => handleNull(row.tpaHead?.tpaCode), // Optional chaining for safety
    sortable: true,
  },
  {
    name: "policyNo",
    selector: (row) => handleNull(row.policyNo),
    sortable: true,
  },
  {
    name: "policyExpDate",
    selector: (row) => {
      if (!row.policyExpDate) return "N/A"; // ✅ Handle null or undefined case
  
      const date = new Date(row.policyExpDate);
      if (!isNaN(date.getTime())) { // ✅ Check if the date is valid
        return date.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).toUpperCase();
      }
  
      return "Null"; // ✅ Return "N/A" if the date is invalid
    },
    sortable: true,
  },
  
  {
    name: "active",
    selector: (row) => handleNull(row.active),
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
    selector: (row) => handleNull(row.policySubCode),
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => handleNull(row.active),
    sortable: true,
  },
  {
    name: "policiesCharge",
    selector: (row) => handleNull(row.policiesCharge?.chargeCode), // Optional chaining for safety
    sortable: true,
  },
  {
    name: "maternityCovered",
    selector: (row) => handleNull(row.maternityCovered),
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
    selector: (row) => handleNull(row.policyCopayId),
    sortable: true,
  },
  {
    name: "chargeCode",
    selector: (row) => handleNull(row.policiesCharge?.chargeCode),
    sortable: true,
  },
  {
    name: "policySubCode",
    selector: (row) => handleNull(row.policySubCharge?.policySubCode),
    sortable: true,
  },
  {
    name: "serviceCategoryCode",
    selector: (row) => handleNull(row.serviceCategory?.serviceCategoryCode),
    sortable: true,
  },
  {
    name: "coPaymentAmt",
    selector: (row) => handleNull(row.coPaymentAmt),
    sortable: true,
  },
  {
    name: "coPaymentPercent",
    selector: (row) => handleNull(row.coPaymentPercent),
    sortable: true,
  },
  {
    name: "covered",
    selector: (row) => handleNull(row.covered || "-"), // Handles both null and undefined
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
    selector: (row) => handleNull(row.priceListCode),
    sortable: true,
  },
  {
    name: "priceListName",
    selector: (row) => handleNull(row.priceListName),
    sortable: true,
  },
  {
    name: "active",
    selector: (row) => handleNull(row.active),
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
    selector: (row) => handleNull(row.id),
    sortable: true,
  },
  {
    name: "grossAmt",
    selector: (row) => handleNull(row.grossAmt),
    sortable: true,
  },
  {
    name: "discountAmt",
    selector: (row) => handleNull(row.discountAmt),
    sortable: true,
  },
  {
    name: "covered",
    selector: (row) => handleNull(row.covered),
    sortable: true,
  },
  {
    name: "coPaymentPercent",
    selector: (row) => handleNull(row.coPaymentPercent),
    sortable: true,
  },
  {
    name: "coPaymentAmt",
    selector: (row) => handleNull(row.coPaymentAmt),
    sortable: true,
  },
  {
    name: "serviceCode",
    selector: (row) => handleNull(row.serviceMaster?.serviceCode),
    sortable: true,
  },
  {
    name: "priceListCode",
    selector: (row) => handleNull(row.priceList?.priceListCode),
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
    name: "Id",
    selector: (row) => handleNull(row.id),
    sortable: true,
  },
  {
    name: "numberOfDays",
    selector: (row) => handleNull(row.numberOfDays),
    sortable: true,
  },
  {
    name: "depRuleNo",
    selector: (row) => handleNull(row.priceListDependency?.depRuleNo),
    sortable: true,
  },
  {
    name: "serviceCode",
    selector: (row) => handleNull(row.serviceMaster?.serviceCode),
    sortable: true,
  },
  {
    name: "dependencyServiceCode",
    selector: (row) => handleNull(row.dependencyServiceCode?.serviceCode),
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
    selector: (row) => handleNull(row.serviceCategoryCode),
    sortable: true,
  },
  {
    name: "serviceCategoryName",
    selector: (row) => handleNull(row.serviceCategoryName),
    sortable: true,
  },
  {
    name: "serviceTypeCons",
    selector: (row) => handleNull(row.serviceTypeCons),
    sortable: true,
  },
  {
    name: "serviceTypeFollowup",
    selector: (row) => handleNull(row.serviceTypeFollowup),
    sortable: true,
  },
  {
    name: "serviceFreeFollowup",
    selector: (row) => handleNull(row.serviceFreeFollowup),
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
    selector: (row) => handleNull(row.serviceCode),
    sortable: true,
  },
  {
    name: "Service Name",
    selector: (row) => handleNull(row.serviceName),
    sortable: true,
  },
  {
    name: "Service Name (Arabic)",
    selector: (row) => handleNull(row.serviceNameAr),
    sortable: true,
  },
  {
    name: "Service Category Code",
    selector: (row) => handleNull(row.serviceCategoryCode?.serviceCategoryCode),
    sortable: true,
  },
  {
    name: "Service Notes",
    selector: (row) => handleNull(row.serviceNotes),
    sortable: true,
  },
  {
    name: "Filter 1",
    selector: (row) => handleNull(row.serviceFilt1),
    sortable: true,
  },
  {
    name: "Filter 2",
    selector: (row) => handleNull(row.serviceFilt2),
    sortable: true,
  },
  {
    name: "Total Visits",
    selector: (row) => handleNull(row.subscriptionTotalNoVisits),
    sortable: true,
  },
  {
    name: "Visits Per Month",
    selector: (row) => handleNull(row.subscriptionVisitsPerMonth),
    sortable: true,
  },
  {
    name: "Active",
    selector: (row) => handleNull(row.active),
    sortable: true,
  },
  {
    name: "Subscription Service",
    selector: (row) => handleNull(row.subscriptionService),
    sortable: true,
  },
  {
    name: "Tooth Mandatory",
    selector: (row) => handleNull(row.toothMandatory),
    sortable: true,
  },
  {
    name: "CPT Code",
    selector: (row) => handleNull(row.cptCodes?.cptCode),
    sortable: true,
  },
  {
    name: "Loinc Code 1",
    selector: (row) => handleNull(row.loincCodes1?.loincCode),
    sortable: true,
  },
  {
    name: "Loinc Code 2",
    selector: (row) => handleNull(row.loincCodes2?.loincCode),
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
