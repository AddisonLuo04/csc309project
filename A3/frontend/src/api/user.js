const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

export const getCurrentUserAPI = async (token) => {
    const res = await fetch(`${BACKEND_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) {
        // get the error message back from the backend
        const errorData = await res.json();
        const errorMsg = `Get current user failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const updateProfileAPI = async (profileData, token) => {
    const res = await fetch(`${BACKEND_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Update user profile failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
}

export const updatePasswordAPI = async (oldPassword, newPassword, token) => {
    const res = await fetch(`${API_URL}/users/me/password`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ old: oldPassword, new: newPassword }),
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Update password failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};