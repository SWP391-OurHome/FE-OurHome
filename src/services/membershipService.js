import axios from 'axios';

const BASE_URL = 'http://localhost:8082/api/memberships'; // Cập nhật URL nếu khác

export const fetchMemberships = async () => {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error("❌ Failed to fetch memberships:", error);
        throw error;
    }
};
