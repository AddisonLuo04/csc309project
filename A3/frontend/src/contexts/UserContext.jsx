import React, { createContext, useState, useEffect, useContext } from 'react';
import { updateProfileAPI, avatarSrc, updatePasswordAPI } from '../api/user';
import { useAuth } from './AuthContext';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    // get the authentication token + user from AuthContext
    const { token, user, fetchUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // store information about available interfaces in this context
    const [currentInterface, setCurrentInterface] = useState("regular");
    const [availableInterfaces, setAvailableInterfaces] = useState([]);

    // if we swapped user, need to update available interfaces
    // assume that we have in the beginning
    const [swappedUser, setSwappedUser] = useState(true);


    // function to update the current user's profile
    const updateProfile = async (profileData) => {
        if (!token) return;
        setLoading(true);
        setError(null);
        try {
            const updatedUser = await updateProfileAPI(profileData, token);
            // update the user's info, fetchUser indirectly sets user state
            // user state will be updated, but this is not a user swap
            setSwappedUser(false);
            fetchUser();
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
        // only make updates to interfaces if user has changed and it is a swapped user
        // if user has changed but we haven't swapped, means profile/some other update
        if (user && swappedUser) {
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
        } else if (!user) {
            // if user is null, i.e. user not logged in
            // no available interfaces
            setAvailableInterfaces([]);
            setCurrentInterface("");
        }
        setSwappedUser(true);
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
