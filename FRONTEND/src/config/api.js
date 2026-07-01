
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_URLS = {
    VIDEOS: `${BASE_URL}/videos`,
    USERS: `${BASE_URL}/users`,
    COMMENTS: `${BASE_URL}/comments`,
    AUTH: `${BASE_URL}/auth`,
}