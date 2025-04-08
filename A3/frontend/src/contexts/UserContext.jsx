import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateProfileAPI, avatarSrc, updatePasswordAPI } from '../api/user';
import { useAuth } from './AuthContext';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // get the authentication token + user from AuthContext
    const { token, user, setUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // store information about available interfaces in this context
    const [currentInterface, setCurrentInterface] = useState("regular");
    const [availableInterfaces, setAvailableInterfaces] = useState([]);


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
            await updatePasswordAPI(oldPassword, newPassword, token);
            return;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // on mount/user change, update the available and current interfaces
    useEffect(() => {
        if (user) {
            const interfaces = [];
    
            if (user.role === 'superuser') {
                interfaces.push('superuser', 'manager', 'cashier', 'regular');
            } else if (user.role === 'manager') {
                interfaces.push('manager', 'cashier', 'regular');
            } else if (user.role === 'cashier') {
                interfaces.push('cashier', 'regular');
            } else {
                interfaces.push('regular');
                if (user.eventsAsOrganizer && user.eventsAsOrganizer.length > 0) interfaces.push('event-organizer');
            }
    
            setAvailableInterfaces(interfaces);
            setCurrentInterface(interfaces[0]);
        } else {
            // if user is null, i.e. user not logged in
            // no available interfaces
            setAvailableInterfaces([]);
            setCurrentInterface("");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{
            user, loading, error, setError, updateProfile, updatePassword, avatarSrc,
            currentInterface, setCurrentInterface, availableInterfaces
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
