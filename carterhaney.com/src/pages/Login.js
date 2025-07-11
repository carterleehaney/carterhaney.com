import React from 'react';
import NeonHeader from '../components/NeonHeader';
import Button from '../components/Button';
import './Login.css';

const Login = () => {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include'
            });
            const data = await res.json();
            if (res.ok) {
                setStatusMessage('Login successful!');
                localStorage.setItem('token', data.token);
            } else {
                setStatusMessage(data.message || 'Login failed!');
            }
        } catch (err) {
            setStatusMessage('Server error!');
        }
    }

    return (

        <div className='login-container'>

            <NeonHeader title="Login" />

            <form onSubmit={handleSubmit}>
                <h3 className="login-label">Username</h3>
                <input
                    className='login-input'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <h3 className="login-label">Password</h3>
                <input
                    className='login-input'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem'}}>
                    <Button type="submit" label="Login" />
                </div>
            </form>

            <div style={{ minHeight: '1em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p>
                    {statusMessage ? statusMessage : '\u00A0'}
                </p>
            </div>

            <p className='login-info'>Confused? This page is for me to login and upload blogs. Feel free to try to login though!</p>

        </div>

    );

};

export default Login;