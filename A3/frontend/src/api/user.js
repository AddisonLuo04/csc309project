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
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);
    // check if birthday is undefined/falsy before adding
    if (profileData.birthday && profileData.birthday !== "undefined") {
        formData.append("birthday", profileData.birthday);
    }
    if (profileData.avatar) {
        formData.append("avatar", profileData.avatar);
    }

    const res = await fetch(`${BACKEND_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    if (!res.ok) {
        const errorData = await res.json();
        const errorMsg = `Update user profile failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
}

export const updatePasswordAPI = async (oldPassword, newPassword, token) => {
    const res = await fetch(`${BACKEND_URL}/users/me/password`, {
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
    return await res;
};

export const avatarSrc = (avatarUrl, bustCache = false) => {
    let url = `${BACKEND_URL}${avatarUrl}`;
    if (bustCache) {
        url += `?t=${Date.now()}`;
    }
    return url;
};


export const registerAPI = async (utorid, name, email, token) => {
    const res = await fetch(`${BACKEND_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ utorid, name, email }),
    });
    if (!res.ok) {
        // get the error message back from the backend
        const errorData = await res.json();
        const errorMsg = `Register failed: ${errorData.error || 'Unknown error'}`;
        throw new Error(errorMsg);
    }
    return await res.json();
};