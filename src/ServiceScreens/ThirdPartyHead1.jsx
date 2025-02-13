import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, submitForm, updateForm, deleteItem, clearAlert, setAlert } from '../redux/slices/dataSlice';
import { thirdPartyHeadDataColumn } from '../assets/ArrayData';
import { CustomDataTable, filterData } from '../utils/Actions';
import { FormContext } from '../Context/Context';
const ThirdPartyHead1 = () => {
    const dispatch = useDispatch();
    const { items, alert } = useSelector((state) => state.data);
    const [isEditMode, setIsEditMode] = useState(false);
    const { BASE_URL, patientsSubTypeData } = useContext(FormContext);
    const [notEditMode, setNotEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        tpaName: '',
        active: '',
        subcharge: { schgCode: '' },
    });

    useEffect(() => {
        dispatch(fetchData(`${BASE_URL}tpahead/getAll`));
    }, [dispatch, BASE_URL]);

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                dispatch(clearAlert());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert, dispatch]);

    const clearForm = () => setFormData({ tpaName: '', active: '', subcharge: { schgCode: '' } });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'schgCode') {
            setFormData((prevData) => ({
                ...prevData,
                subcharge: { ...prevData.subcharge, [name]: value },
            }));
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, subcharge: { ...formData.subcharge, schgCode: formData.subcharge.schgCode }, active: formData.active || null, tpaName: formData.tpaName.trim() };
        const url = `${BASE_URL}tpahead/create`;
        dispatch(submitForm({ url, formData: updatedFormData }));
        clearForm();
    };

    const handleUpdateData = (id) => {
        setNotEditMode(true);
        const itemToUpdate = items.find((item) => item.tpaCode === id);
        if (itemToUpdate) {
            setFormData({ tpaCode: itemToUpdate.tpaCode, tpaName: itemToUpdate.tpaName, active: itemToUpdate.active, subcharge: { schgCode: itemToUpdate.subcharge?.schgCode || 0 } });
            setIsEditMode(true);
        }
    };

    const handleDelete = (id) => {
        const url = `${BASE_URL}tpahead/delete`;
            dispatch(deleteItem({ url, id,key:"tpaCode" }));
    };

    const handleUpdate = () => {
        const { tpaName, tpaCode, active, subcharge: { schgCode } } = formData;
        const updatedData = { tpaName: tpaName.trim(), tpaCode, active, subcharge: { schgCode } };
        const url = `${BASE_URL}tpahead/update`;
        dispatch(updateForm({ url, id: tpaCode, formData: updatedData }));
        setIsEditMode(false);
        setNotEditMode(false);
        clearForm();
    };

    return (
        <div className="container page-content">
            <h2>THIRD PARTY AUDITORS FOR A SUB CLASSIFICATION PATIENT TYPE</h2>
            {alert.show && (
                <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="tpaName" className="form-label">
                            Tpa Name
                        </label>
                        <input className="form-control" id="tpaName" name="tpaName" value={formData.tpaName} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="active" className="form-label">
                            Active
                        </label>
                        <select className="form-control" id="active" name="active" value={formData.active} onChange={handleChange}>
                            <option value="">Select an Option</option>
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label htmlFor="schgCode" className="form-label">
                            Patient Sub Type (schgCode)
                        </label>
                        <select className="form-control" id="schgCode" name="schgCode" value={formData.subcharge.schgCode} onChange={handleChange} required disabled={notEditMode}>
                            <option value="">Select an option</option>
                            {patientsSubTypeData.map((option) => (
                                <option key={option.schgCode} value={option.schgCode}>
                                    {option.schgCode} - {option.schaName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {!isEditMode ? (
                    <button type="submit" className="btn btn-primary">
                        Create+
                    </button>
                ) : (
                    <>
                        <button type="button" onClick={handleUpdate} className="btn btn-success">
                            Update
                        </button>
                        <button type="button" onClick={() => { setIsEditMode(false); clearForm(); setNotEditMode(false); }} className="ms-4 btn btn-secondary">
                            Cancel
                        </button>
                    </>
                )}
            </form>
            <input type="text" placeholder="Search hchgName" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control my-2" />
            <CustomDataTable columns={thirdPartyHeadDataColumn(handleUpdateData, handleDelete)} data={filterData(items, searchTerm, ['tpaName', 'tpaCode'])} paginationPerPage={5} paginationRowsPerPageOptions={[5, 10, 15, 20]} />
        </div>
    );
};

export default ThirdPartyHead1;
