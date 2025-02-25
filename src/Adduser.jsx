import axios from 'axios';
import { useState } from 'react';

const AddUser = () => {
    const [user, setUser] = useState({ userId: '', UserName: '' });
    const token = "auth_token"; // Replace with actual token

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios({
            method: 'post',
            url: 'http://localhost:8005/userInfo',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: { ...user } // Sending user data correctly
        })
        .then((response) => console.log('User added:', response))
        .catch((err) => console.error('Error adding user:', err));
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={user.userId}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="UserName"
                    placeholder="User Name"
                    value={user.UserName}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};


export default AddUser;
