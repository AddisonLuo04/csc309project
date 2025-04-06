import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI, requestPasswordResetAPI, resetPasswordAPI } from '../api/auth';
import { getCurrentUserAPI } from '../api/user';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // initialize token from localStorage if it exists
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // global user state provided by this Auth Provider
    const [user, setUser] = useState(null);

    // invariant: token and user should always represent the same current user
    // on token change, user is updated via the useEffect hook

    // loading and error states for feedback to be used in children
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // use navigate so we can change pages without reload
    const navigate = useNavigate()

    // functions for user authentication using the api calls...
    // TODO: add navigation after success for the following functions:
    const login = async (utorid, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginAPI(utorid, password);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            await fetchUser();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        // navigate to default landing page, or somewhere else
        navigate("/");
    };

    // get current user and set it in this context
    const fetchUser = async () => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const data = await getCurrentUserAPI(token);
            setUser(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // request password reset
    const requestPasswordReset = async (utorid) => {
        setLoading(true);
        setError(null);
        try {
            const data = await requestPasswordResetAPI(utorid);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // reset password
    const resetPassword = async (utorid, newPassword, resetToken) => {
        setLoading(true);
        setError(null);
        try {
            const data = await resetPasswordAPI(utorid, newPassword, resetToken);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // register

    // on mount/on token change, run a useEffect hook to fetch the current user info
    // fetch will set the current user
    useEffect(() => {
        if (token) {
            fetchUser().catch(() => logout());
        } else {
            setUser(null);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{
            user, token, loading, error, setUser,
            login, logout, fetchUser, requestPasswordReset, resetPassword
            /* and other global vars */
        }}>
            {children}
        </AuthContext.Provider>
    );
}


export const useAuth = () => {
    return useContext(AuthContext);
};