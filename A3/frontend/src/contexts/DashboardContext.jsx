import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

export const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
    const { token, user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <DashboardContext.Provider value={{
            user, loading, error, setError,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    return useContext(DashboardContext);
};
