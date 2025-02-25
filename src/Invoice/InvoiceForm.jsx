import React, { useContext, useState } from 'react'
import { FormContext, InvoiceContext } from '../Context/Context';
import { handleDeleteItem, submitForm, updateForm } from '../utils/Actions';

const InvoiceForm = () => {
    const { invoiceId } = useContext(InvoiceContext);
    console.log(invoiceId)
    const { setValidtationMessage, BASE_URL,
        thirdPartyHeadData, setThirdPartyHead, patientsSubTypeData, } = useContext(FormContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const [notEditMode, setNotEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [alert, setAlert] = useState({ show: false, type: "", message: "" });
    const initialFormData = {
        billNo: invoiceId,
        billDate: new Date().toLocaleDateString(),
        billTmStmp: "",
        patientCode: "",
        patientName: "",
        patientNameAr: "",
        coCode: "",
        coCodeBr: "",
        refDeptCode: "",
        ChgCode: "",
        createdBy: "",
        cvcld: "",     // (Y/N) not null default is N
        ccldBy: "",// string not null
        ccldAt: "",  // datetime not null
        ccldDt: "", //date not null
        cashPaid: "", //number not null >=0
        cardPaid: "", //number not null >=0
        cardNo: "", //string not null
        pointsUsed: "", //number not null -can accept 0 and negative values
        paidFromAdvance: "", //number not null
        packageCode: "",  // string (50)
        emrNo: ""   // string(100)
    };

    const [formData, setFormData] = useState(initialFormData);

    // Clear the form
    const clearForm = () => {
        setFormData(initialFormData);
    };
    // Handle patientMainTypeData changes (for select input)
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "schgCode") {
            setFormData((prevData) => ({
                ...prevData,
                subcharge: {
                    ...prevData.subcharge,
                    schgCode: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));

        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Ensure the payload matches the API's expected format
        const updatedFormData = {
            ...formData,
            subcharge: {
                ...formData.subcharge,
                schgCode: (formData.subcharge.schgCode), // Convert schgCode to a number
            },
            active: formData.active || null,
            tpaName: (formData.tpaName).trim()
        };

        console.log("Payload sent to API:", updatedFormData);
        const url = `${BASE_URL}tpahead/create`; // The URL for form submission
        submitForm(url, updatedFormData, setThirdPartyHead, setValidtationMessage, setAlert, clearForm);

    };

    const handleUpdateData = (id) => {
        setNotEditMode(true)
        const itemToUpdate = thirdPartyHeadData.find((item) => item.tpaCode === id);

        if (itemToUpdate) {
            setFormData({
                tpaCode: itemToUpdate.tpaCode,
                tpaName: itemToUpdate.tpaName,
                active: itemToUpdate.active,
                subcharge: {
                    schgCode: itemToUpdate.subcharge?.schgCode || 0,
                },
            });
            setIsEditMode(true); // Show update form
        } else {
            console.log("Item not found!");
        }
    };

    const handleDelete = (id) => {
        handleDeleteItem({
            id,
            url: `${BASE_URL}tpahead/delete`, setValidtationMessage, setAlert,
            data: thirdPartyHeadData,
            setData: setThirdPartyHead,
            itemKey: "tpaCode", // Key to identify the item in the dataset
        });
    };

    const handleUpdate = () => {
        const { tpaName, tpaCode, active, subcharge: { schgCode }, } = formData;
        const updatedData = { tpaName: tpaName.trim(), tpaCode, active, subcharge: { schgCode }, };
        console.log(formData);
        console.log(updatedData);
        const url = `${BASE_URL}tpahead/update`;
        const id = formData.tpaCode; // The URL for form submission
        updateForm(url, id, updatedData, setThirdPartyHead, setValidtationMessage, setIsEditMode, setNotEditMode, clearForm, setAlert);

    };

    return (
        <div className="container page-content">
       <h1>Patient Billing Header </h1>
        {alert.show && (
            <div className={`alert alert-${alert.type}`} role="alert">
                {alert.message}
            </div>
        )}
            <div className='container invoice'>
                <div className='container invoiceHead'>
                   <form>
    <div className='billHead bg-gray mt-2'>
        <div className='row'>
            <div className='col'>
        <label htmlFor='billNo'>Bill No:</label>
        <input type='text' className="form-control" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} required />
</div> <div className='col'>
        <label htmlFor='billDate'>Bill Date:</label>
        <input type='date' className="form-control" id="billDate" name="billDate" value={formData.billDate} onChange={handleChange} required />
</div> <div className='col'>
        <label htmlFor='billTmStmp'>Bill Time Stamp:</label>
        <input type='time' className="form-control" id="billTmStmp" name="billTmStmp" value={formData.billTmStmp} onChange={handleChange} required />
    </div>
    </div>
</div>

        <div className='billDetails1 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='patientCode'>Patient Code:</label>
            <input type='text' className="form-control" id="patientCode" name="patientCode" value={formData.patientCode} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='patientName'>Patient Name:</label>
            <input type='text' className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
            <input type='text' className="form-control" id="patientNameAr" name="patientNameAr" value={formData.patientNameAr} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='coCode'>Co Code:</label>
            <input type='text' className="form-control" id="coCode" name="coCode" value={formData.coCode} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails2 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='coCodeBr'>Co Code Br:</label>
            <input type='text' className="form-control" id="coCodeBr" name="coCodeBr" value={formData.coCodeBr} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='refDeptCode'>Ref Dept Code:</label>
            <input type='text' className="form-control" id="refDeptCode" name="refDeptCode" value={formData.refDeptCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ChgCode'>Chg Code:</label>
            <input type='text' className="form-control" id="ChgCode" name="ChgCode" value={formData.ChgCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='createdBy'>Created By:</label>
            <input type='text' className="form-control" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails3 '>
        <div className='row'>
        <div className='col'>            <label htmlFor='cvcld'>Ccld:</label>
            <input type='text' className="form-control" id="cvcld" name="cvcld" value={formData.cvcld} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldBy'>Ccld By:</label>
            <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={formData.ccldBy} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldAt'>Ccld At:</label>
            <input type='text' className="form-control" id="ccldAt" name="ccldAt" value={formData.ccldAt} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldDt'>Ccld Dt:</label>
            <input type='text' className="form-control" id="ccldDt" name="ccldDt" value={formData.ccldDt} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails4 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='pointsUsed'>Points Used:</label>
            <input type='text' className="form-control" id="pointsUsed" name="pointsUsed" value={formData.pointsUsed} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
            <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={formData.paidFromAdvance} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='packageCode'>Package Code:</label>
            <input type='text' className="form-control" id="packageCode" name="packageCode" value={formData.packageCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='emrNo'>Emr No:</label>
            <input type='text' className="form-control" id="emrNo" name="emrNo" value={formData.emrNo} onChange={handleChange} required />
        </div></div></div>


    <div className='billHead bg-gray '>
    <div className='row'>
    <div className='col'>
        <label htmlFor='cashPaid'>Cash Paid:</label>
        <input type='text' className="form-control" id="cashPaid" name="cashPaid" value={formData.cashPaid} onChange={handleChange} required />
</div>  <div className='col'>
        <label htmlFor='cardPaid'>Card Paid:</label>
        <input type='text' className="form-control" id="cardPaid" name="cardPaid" value={formData.cardPaid} onChange={handleChange} required />
</div>  <div className='col'>
        <label htmlFor='cardNo'>Card No:</label>
        <input type='text' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />
</div> <div className='col'>
        <label></label>
        <input type='button' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />
</div></div>

  </div>
  <div className='billHead bg-gray mt-2'>
        <div className='row'>
            <div className='col'>
        <label htmlFor='billNo'>Bill No:</label>
        <input type='text' className="form-control" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} required />
</div> <div className='col'>
        <label htmlFor='billDate'>Bill Date:</label>
        <input type='date' className="form-control" id="billDate" name="billDate" value={formData.billDate} onChange={handleChange} required />
</div> <div className='col'>
        <label htmlFor='billTmStmp'>Bill Time Stamp:</label>
        <input type='time' className="form-control" id="billTmStmp" name="billTmStmp" value={formData.billTmStmp} onChange={handleChange} required />
    </div>
    </div>
</div>

        <div className='billDetails1 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='patientCode'>Patient Code:</label>
            <input type='text' className="form-control" id="patientCode" name="patientCode" value={formData.patientCode} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='patientName'>Patient Name:</label>
            <input type='text' className="form-control" id="patientName" name="patientName" value={formData.patientName} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='patientNameAr'>Patient Name (Ar):</label>
            <input type='text' className="form-control" id="patientNameAr" name="patientNameAr" value={formData.patientNameAr} onChange={handleChange} required />
</div>     <div className='col'>
            <label htmlFor='coCode'>Co Code:</label>
            <input type='text' className="form-control" id="coCode" name="coCode" value={formData.coCode} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails2 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='coCodeBr'>Co Code Br:</label>
            <input type='text' className="form-control" id="coCodeBr" name="coCodeBr" value={formData.coCodeBr} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='refDeptCode'>Ref Dept Code:</label>
            <input type='text' className="form-control" id="refDeptCode" name="refDeptCode" value={formData.refDeptCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ChgCode'>Chg Code:</label>
            <input type='text' className="form-control" id="ChgCode" name="ChgCode" value={formData.ChgCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='createdBy'>Created By:</label>
            <input type='text' className="form-control" id="createdBy" name="createdBy" value={formData.createdBy} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails3 '>
        <div className='row'>
        <div className='col'>            <label htmlFor='cvcld'>Ccld:</label>
            <input type='text' className="form-control" id="cvcld" name="cvcld" value={formData.cvcld} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldBy'>Ccld By:</label>
            <input type='text' className="form-control" id="ccldBy" name="ccldBy" value={formData.ccldBy} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldAt'>Ccld At:</label>
            <input type='text' className="form-control" id="ccldAt" name="ccldAt" value={formData.ccldAt} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='ccldDt'>Ccld Dt:</label>
            <input type='text' className="form-control" id="ccldDt" name="ccldDt" value={formData.ccldDt} onChange={handleChange} required />
        </div>
</div></div>
        <div className='billDetails4 '>
        <div className='row'>
        <div className='col'>
            <label htmlFor='pointsUsed'>Points Used:</label>
            <input type='text' className="form-control" id="pointsUsed" name="pointsUsed" value={formData.pointsUsed} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='paidFromAdvance'>Paid from Advance:</label>
            <input type='text' className="form-control" id="paidFromAdvance" name="paidFromAdvance" value={formData.paidFromAdvance} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='packageCode'>Package Code:</label>
            <input type='text' className="form-control" id="packageCode" name="packageCode" value={formData.packageCode} onChange={handleChange} required />
</div>  <div className='col'>
            <label htmlFor='emrNo'>Emr No:</label>
            <input type='text' className="form-control" id="emrNo" name="emrNo" value={formData.emrNo} onChange={handleChange} required />
        </div></div></div>


    <div className='billHead bg-gray '>
    <div className='row'>
    <div className='col'>
        <label htmlFor='cashPaid'>Cash Paid:</label>
        <input type='text' className="form-control" id="cashPaid" name="cashPaid" value={formData.cashPaid} onChange={handleChange} required />
</div>  <div className='col'>
        <label htmlFor='cardPaid'>Card Paid:</label>
        <input type='text' className="form-control" id="cardPaid" name="cardPaid" value={formData.cardPaid} onChange={handleChange} required />
</div>  <div className='col'>
        <label htmlFor='cardNo'>Card No:</label>
        <input type='text' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />
</div> <div className='col'>
        <label></label>
        <input type='button' className="form-control" id="cardNo" name="cardNo" value={formData.cardNo} onChange={handleChange} required />
</div></div>

  </div>
</form>



                </div>
                {/* <div className='container invoiceDetails'><h1>details</h1></div> */}
            </div>
        </div>
    )
}

export default InvoiceForm
