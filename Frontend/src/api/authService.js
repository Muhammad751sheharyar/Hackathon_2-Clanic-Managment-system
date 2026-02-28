const BASE_URL = 'http://localhost:5000/api';

export const authFetch = async (endpoint, body) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Kuch galat hua!');
    }

    return data;
};