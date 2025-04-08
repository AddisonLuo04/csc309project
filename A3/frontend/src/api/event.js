const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const createEventAPI = async (payload, token) => {
    const start = new Date(payload.startTime);
    const end = new Date(payload.endTime);
    const body = payload;
    body.startTime = start.toISOString();
    body.endTime = end.toISOString();
    const res = await fetch (`${BACKEND_URL}/events`, {
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