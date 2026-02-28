import React, { useState } from 'react';
import { authFetch } from '../api/authService';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const data = await authFetch('/signup', formData);
            alert(data.message);
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" onChange={(e) => setFormData({...formData, username: e.target.value})} />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Signup;