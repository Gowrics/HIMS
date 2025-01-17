import doc1 from "../assets/Doc1.jpg";
import doc2 from "../assets/Doc2.jpg";
import doc3 from "../assets/Doc3.png";
import doc4 from "../assets/Doc4.png";
import dept1 from "../assets/dept1.jpg";
import dept2 from "../assets/dept2.jpg";
import dept3 from "../assets/dept3.jpg";
import dept4 from "../assets/dept4.jpg";
import dept5 from "../assets/dept5.jpg";
import dept6 from "../assets/dept6.jpg";
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
    deptImage: dept1,
    deptName: "Neurology",
    deptNameFl: "طب الأعصاب",
  },
  {
    deptCode: 2,
    deptGeneral: "Y",
    deptImage: dept2,
    deptName: "Dermatology",
    deptNameFl: "الأمراض الجلدية",
  },
  {
    deptCode: 3,
    deptGeneral: "N",
    deptImage: dept3,
    deptName: "Pediatrics",
    deptNameFl: "طب الأطفال",
  },
  {
    deptCode: 4,
    deptGeneral: "Y",
    deptImage: dept4,
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
  {
    doctorCode: 4,
    doctorName: "Dr. Emily Brown",
    drNameFl: "الدكتورة إميلي براون",
    drImg: docter4,
    drActive: "Y",
    drLicNo: "345678",
    drDesignation: "Pediatrician",
    drDesignationFl: "طبيب أطفال",
    drQualifications: "MD, FAAP",
    drQualificationsFl:
      "دكتوراه في الطب، زميل الأكاديمية الأمريكية لطب الأطفال",
    drGender: "Female",
    drSrtOrd: 4,
    costCenterCode: "CC004",
    department: {
      deptCode: 3,
    },
    nationality: {
      nationalityCode: 3,
    },
  },
  {
    doctorCode: 5,
    doctorName: "Dr. Laura Davis",
    drNameFl: "الدكتورة لورا ديفيس",
    drImg: docter5,
    drActive: "Y",
    drLicNo: "567890",
    drDesignation: "Ophthalmologist",
    drDesignationFl: "طبيب عيون",
    drQualifications: "MD, FRCS",
    drQualificationsFl: "دكتوراه في الطب، زميل الكلية الملكية للجراحين",
    drGender: "Female",
    drSrtOrd: 5,
    costCenterCode: "CC005",
    department: {
      deptCode: 0,
    },
    nationality: {
      nationalityCode: 0,
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
    img: dept1,
    title: "Cardiology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 2,
    img: dept2,
    title: "Neurology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 3,
    img: dept3,
    title: "Orthopedics",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content.",
  },
  {
    id: 4,
    img: dept4,
    title: "Pediatrics",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 5,
    img: dept5,
    title: "Dermatology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
  {
    id: 5,
    img: dept6,
    title: "Dermatology",
    text: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
  },
];

export const doctors = [
  {
    deptCode: 1,
    doctorName: "Ravi Saisa",
    doctorNameFl: "الدكتور جون دو",
    doctorImg: docter1,
    licenseNo: "4353",
    doctorDesignation: "Cardiology",
    doctorDesignationFl: "طبيب أسنان عام",
    doctorQualifications: "BDS-FRCS",
    doctorQualificationsFl: "34456",
    gender: "Female",
    sortOrder: 2,
    nationalityCode: 56,
    costCenterCode: "300",
    active: "N",
    id: "bf72",
  },
  {
    deptCode: 3,
    doctorName: "Dr. Mary Doe",
    doctorNameFl: "الدكتور جون دو",
    doctorImg: docter2,
    licenseNo: "5555",
    doctorDesignation: "Orthopedics",
    doctorDesignationFl: "طبيب أسنان عام",
    doctorQualifications: "BDS-FRCS",
    doctorQualificationsFl: "34455",
    gender: "Female",
    sortOrder: 2,
    nationalityCode: 56,
    costCenterCode: "303",
    active: "Y",
    id: "9433",
  },
  {
    deptCode: 4,
    doctorName: "Dr. John Doe",
    doctorNameFl: "الدكتور جون دو",
    doctorImg: docter3,
    licenseNo: "3434",
    doctorDesignation: "Pediatrics",
    doctorDesignationFl: "طبيب أسنان عام",
    doctorQualifications: "BDS-FRCS",
    doctorQualificationsFl: "34454",
    gender: "Male",
    sortOrder: 1,
    nationalityCode: 56,
    costCenterCode: "303",
    active: "Y",
  },
  {
    deptCode: 3,
    doctorName: "Dr. Jane Smith",
    doctorNameFl: "الدكتورة جين سميث",
    doctorImg: docter4,
    licenseNo: "67890",
    doctorDesignation: "Orthopedics",
    doctorDesignationFl: "طبيب ب",
    doctorQualifications: "MBBS-MD",
    doctorQualificationsFl: "بطبيبب",
    gender: "Female",
    sortOrder: 3,
    nationalityCode: 3,
    costCenterCode: "505",
    active: "Y",
  },
  {
    deptCode: 2,
    doctorName: "Ravi Raj",
    doctorNameFl: "الدكتور جون دو",
    doctorImg: docter5,
    licenseNo: "43544",
    doctorDesignation: "Neurology",
    doctorDesignationFl: "طبيب أسنان عام",
    doctorQualifications: "BDS-FRCS",
    doctorQualificationsFl: " الملكية للجراحين",
    gender: "Male",
    sortOrder: 2,
    nationalityCode: 2,
    costCenterCode: "303",
    active: "N",
  },
  {
    deptCode: 2,
    doctorName: "Dr. Mary Doe",
    doctorNameFl: "الدكتور جون دو",
    doctorImg: docter6,
    licenseNo: "LIsds",
    doctorDesignation: "Neurology",
    doctorDesignationFl: "طبيب أسssنان عام",
    doctorQualifications: "BDS-FRCS",
    doctorQualificationsFl: " الملكة للجراحين",
    gender: "Male",
    sortOrder: 2,
    nationalityCode: 2,
    costCenterCode: "303",
    active: "N",
  },
];
