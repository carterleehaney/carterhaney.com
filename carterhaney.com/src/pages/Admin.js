import React from 'react';
import { useNavigate } from 'react-router-dom';
import NeonHeader from '../components/NeonHeader';

const Admin = () => {
    const [authError, setAuthError] = React.useState(false);

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setAuthError(true);
            return;
        }

        fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (!data.valid) {
                localStorage.removeItem('token');
                setAuthError(true);
            }
        })
        .catch(() => {
            localStorage.removeItem('token');
            setAuthError(true);
        });
    }, []);

    if (authError) {
        return (
            <div>
                <NeonHeader title="Admin" />
                <p>You need to login first.</p>
            </div>
        );
    }

    return (
        <div>
            <NeonHeader title="Admin" />
            <p>Authentication succeeded!</p>
        </div>
    );
};

export default Admin;