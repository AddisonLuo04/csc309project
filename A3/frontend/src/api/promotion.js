const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const createPromotionAPI = async (payload, token) => {
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
    const body = payload;
    body.startTime = start.toISOString();
    body.endTime = end.toISOString();
    const res = await fetch (`${BACKEND_URL}/promotions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Create Promotion Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const deletePromotionAPI = async (promotionId, token) => {
    const res = await fetch(`${BACKEND_URL}/promotions/${promotionId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Delete Promotion Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const updatePromotionAPI = async (promotionId, payload, token) => {
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
    const body = payload;
    body.startTime = start.toISOString();
    body.endTime = end.toISOString();
    const res = await fetch(`${BACKEND_URL}/promotions/${promotionId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Update Promotion Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const getPromotionsAPI = async (path, token) => {
    const base = new URL(`${BACKEND_URL}/promotions`);
    const url = new URL(path, base);
    const res = await fetch(url, {
        method: 'GET', 
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Get Promotions Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};