import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './form.css';
import React, { useEffect, useState } from "react";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login, error, clearError } = useAuth();
    
    // on mount, clear the error:
    useEffect(() => {
        clearError();
    }, []);

    const handle_submit = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return <>
        <h2>Login</h2>
        <form onSubmit={handle_submit}>
            <label htmlFor="username">User Name:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder='User Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className="btn-container">
                <button type="submit">Login</button>
            </div>
            <div className='btn-container'>
                <Link to="/resetPassword" onClick={clearError}>
                    Forgot Password?
                </Link>
            </div>
            <p className="error">{error}</p>
        </form>
    </>;
}

export default Login;
