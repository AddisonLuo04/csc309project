import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

export const PromotionContext = createContext(null);

export const PromotionProvider = ({ children }) => {
    const { token, user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [createMessage, setCreateMessage] = useState(null);

    const addPromotion = async () => {

    };

    return (
        <PromotionContext.Provider value={{
            user, loading, createMessage, setCreateMessage, addPromotion,
        }}>
            {children}
        </PromotionContext.Provider>
    );
};

export const usePromotion = () => {
    return useContext(PromotionContext);
};
