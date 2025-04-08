const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const addPurchaseAPI = async (payload, token) => {
    const formData = {
        utorid: payload.username,
        type: payload.type,
        spent: payload.spent
    };
    if (payload.promotionIds) {
        formData.promotionIds = payload.promotionIds;
    }
    if (payload.remark) {
        formData.remark = payload.remark;
    }
    const res = await fetch(`${BACKEND_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Create Purchase Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const processRedemptionAPI = async (redemptionId, token) => {
    const body = {processed: true};
    const res = await fetch(`${BACKEND_URL}/transactions/${redemptionId}/processed`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Process Redemption Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const getAllTransactionsAPI = async (path, token) => {
    const base = new URL(`${BACKEND_URL}/transactions`);
    const url = new URL(path, base);
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Get Transactions Failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};
