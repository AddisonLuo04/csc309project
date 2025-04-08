import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { createPromotionAPI, updatePromotionAPI, deletePromotionAPI, getPromotionsAPI } from '../api/promotion';
import { useUser } from './UserContext';

export const PromotionContext = createContext(null);

export const PromotionProvider = ({ children }) => {
    const { token, user } = useAuth();
    const { currentInterface } = useUser();
    const [loading, setLoading] = useState(false);
    const [createMessage, setCreateMessage] = useState(null);
    const [updateMessage, setUpdateMessage] = useState(null);
    const [promotions, setPromotions] = useState([]);
    const [allPromotionsCount, setAllPromotionsCount] = useState(0);

    const addPromotion = async (formData) => {
        setLoading(true);
        setCreateMessage(null);
        const data = {
            name: formData.name,
            description: formData.description,
            type: formData.type,
            startTime: formData.startTime,
            endTime: formData.endTime
        };
        if (formData.minSpending !== "") {
            data.minSpending = parseFloat(formData.minSpending);
        }
        if (formData.rate !== "") {
            data.rate = parseFloat(formData.rate);
        }
        if (formData.points !== "") {
            data.points = parseInt(formData.points);
        }
        try {
            const promotion = await createPromotionAPI(data, token);
            setCreateMessage("Success!");
        } catch(err) {
            setCreateMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deletePromotion = async (promotionId) => {
        setLoading(true);
        setUpdateMessage(null);
        try {
            const promotion = await deletePromotionAPI(promotionId, token);
            // TODO: handle post delete?
        } catch(err) {
            setUpdateMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePromotion = async (formData) => {
        setLoading(true);
        setUpdateMessage(null);
        const data = {
            name: formData.name,
            description: formData.description,
            type: formData.type,
            startTime: formData.startTime,
            endTime: formData.endTime
        };
        if (formData.minSpending !== "") {
            data.minSpending = parseFloat(formData.minSpending);
        }
        if (formData.rate !== "") {
            data.rate = parseFloat(formData.rate);
        }
        if (formData.points !== "") {
            data.points = parseInt(formData.points);
        }
        try {
            const promotion = await updatePromotionAPI(data, token);
            setUpdateMessage("Success!");
            // TODO: handle after update?
        } catch(err) {
            setUpdateMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getPromotions = async(payload) => {
        setLoading(true);
        const data = payload;
        const results = [];
        if (currentInterface === "regular" || currentInterface === "cashier") {
            results.push(`startTime=${true}`);
            results.push(`endTime=${false}`);
        }
        results.join('&');
        try {
            // call api with path,
            const response = await getPromotionsAPI(results, token);
            setPromotions(response.results);
        } catch(err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllPromotionsCount = async () => {
        setLoading(true);
        try {
            const response = await getPromotionsAPI('', token);
            setAllPromotionsCount(response.count);
        } catch(err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <PromotionContext.Provider value={{
            user, loading, createMessage, updateMessage, allPromotionsCount, promotions,
            setUpdateMessage, setCreateMessage, addPromotion, deletePromotion, updatePromotion, getAllPromotionsCount
        }}>
            {children}
        </PromotionContext.Provider>
    );
};

export const usePromotion = () => {
    return useContext(PromotionContext);
};
