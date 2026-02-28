import React, { useState } from 'react';
import { authFetch } from '../api/authService';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Error reset karein
        
        try {
            const data = await authFetch('/login', formData);
            localStorage.setItem('token', data.token);
            alert("Login Successful! Welcome " + data.username);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    required
                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                />
                <br/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;