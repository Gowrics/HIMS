import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Authenticate = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        function fetchData() {
            axios.get('http://localhost:8005/userInfo')
                .then(response => {
                    console.log(response.data);
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    
        fetchData();
    }, []); // Runs only once on mount
    
    return (
        <div>
            {users.length > 0 ? (
                users.map((user) => (
                    <p key={user.id}>{user.userId} - {user.UserName}</p>
                ))
            ) : (
                <p>Loading users...</p>
            )}

                
        </div>
    );
}

export default Authenticate;



    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await axios.get('http://localhost:8005/userInfo');
    //             console.log(response.data);
    //             setUsers(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     }
    //     fetchData();
    // }, []); // Empty dependency array ensures it runs only once on mount