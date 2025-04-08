import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { createEventAPI } from '../api/event';
import { useUser } from './UserContext';

export const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [createMessage, setCreateMessage] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [allEventsCount, setAllEventsCount] = useState(0);

    const addEvent = async (formData) => {
        console.log(formData);
        setLoading(true);
        setCreateMessage(null);
        const data = {
            name: formData.name,
            description: formData.description,
            location: formData.location,
            startTime: formData.startTime,
            endTime: formData.endTime,
            capacity: null,
            points: parseInt(formData.points)
        };
        if (formData.capacity !== "") {
            data.capacity = parseInt(formData.capacity);
        }
        try {
            const event = await createEventAPI(data, token);
            setCreateMessage("Success!");
        } catch(err) {
            setCreateMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return (
        <EventContext.Provider value={{
            user, loading, createMessage, setCreateMessage, addEvent,
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    return useContext(EventContext);
};
