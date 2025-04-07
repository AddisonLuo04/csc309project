import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateProfileAPI } from '../api/user';
import { useAuth } from './AuthContext';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // get the authentication token + user from AuthContext
    const { token, user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // function to update the current user's profile
    const updateProfile = async (profileData) => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateProfileAPI(profileData, token);
            setUser(updatedUser);
            return updatedUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // update password
    const updatePassword = async (oldPassword, newPassword) => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updatePassword(oldPassword, newPassword, token);
            setUser(updatedUser);
            return updatedUser;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <UserContext.Provider value={{
            user, loading, error, setError, updateProfile, updatePassword
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
