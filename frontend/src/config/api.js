const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://192.168.18.123/freteapp/backend').replace(/\/+$/, '');

export const API_URL_CANDIDATES = [
    `${API_BASE_URL}/api`,
    `${API_BASE_URL}/API`,
    `${API_BASE_URL}/api/`,
    `${API_BASE_URL}/API/`
];

export const API_URL = API_URL_CANDIDATES[0];

export async function fetchApi() {
    let lastError = null;

    for (const url of API_URL_CANDIDATES) {
        try {
            const response = await fetch(url, {
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                lastError = new Error(`HTTP ${response.status}`);
                continue;
            }

            return response;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error('API indisponível');
}

export default API_URL;
