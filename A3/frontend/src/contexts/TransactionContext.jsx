import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { addTransferAPI, addRedemptionAPI } from '../api/user';
import { useDashboard } from './DashboardContext';

export const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
    const { token, user } = useAuth();
    const { convertPromotionsToArray } = useDashboard();
    const [loading, setLoading] = useState(false);
    const [transferMessage, setTransferMessage] = useState(null);
    const [redemptionMessage, setRedemptionMessage] = useState(null);

    const addTransfer = async (formData) => {
        setLoading(true);
        setTransferMessage(null);
        const userId = parseInt(formData.userId);
        const amount = parseInt(formData.amount);
        const data = {
            type: formData.type,
            amount: amount,
        };
        if (formData.remark !== "") {
            data.remark = formData.remark;
        }
        try {
            const transfer = await addTransferAPI(userId, data, token);
            setTransferMessage("Success!");
        } catch(err) {
            setTransferMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const addRedemption = async (formData) => {
        setLoading(true);
        setRedemptionMessage(null);
        const amount = parseInt(formData.amount);
        const data = {
            type: formData.type,
            amount: amount
        };
        if (formData.remark !== "") {
            data.remark = formData.remark;
        }
        try {
            const redemption = await addRedemptionAPI(data, token);
            setRedemptionMessage('Success!');
        } catch(err) {
            setRedemptionMessage(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return (
        <TransactionContext.Provider value={{
            user, loading, transferMessage, redemptionMessage,
            setTransferMessage, setRedemptionMessage, addTransfer, addRedemption,
        }}>
            {children}
        </TransactionContext.Provider>
    );
};

export const useTransaction = () => {
    return useContext(TransactionContext);
};
