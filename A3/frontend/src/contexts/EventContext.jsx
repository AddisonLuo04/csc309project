import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { createEventAPI, getEventAPI, getEventsAPI } from '../api/event';
import { useUser } from './UserContext';

export const EventContext = createContext(null);

export const EventProvider = ({ children }) => {
    const { token, user } = useAuth();
    const { currentInterface } = useUser();
    const [loading, setLoading] = useState(false);
    const [createMessage, setCreateMessage] = useState(null);
    const [allEventsCount, setAllEventsCount] = useState(0);
    const [error, setError] = useState(null);
    const [singleEvent, setSingleEvent] = useState(null);

    const addEvent = async (formData) => {
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

    const getAllEventsCount = async () => {
        setLoading(true);
        try {
            const response = await getEventsAPI('', token);
            setAllEventsCount(response.count);
        } catch(err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getEvents = async (params) => {
        setLoading(true);
        setError(null);
        try {
            return await getEventsAPI(params, token);
        } catch(err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getEvent = async (eventId) => {
        setLoading(true);
        const parsedId = parseInt(eventId);
        try {
            const promotion = await getEventAPI(parsedId, token);
            setSingleEvent(promotion);
        } catch(err) {
            setSingleEvent(null);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return (
        <EventContext.Provider value={{
            user, loading, createMessage, allEventsCount, error, singleEvent, 
            setCreateMessage, addEvent, getAllEventsCount, setError, getEvents, getEvent, 
        }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEvent = () => {
    return useContext(EventContext);
};
