
import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

// Headers mặc định với Authorization
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic YWRtaW46YWRtaW4xMjM=' // admin:admin123 mã hóa Base64
};

export const getTransactionHistory = async (userIdOrAll, searchParams = {}) => {
    try {
        const url = userIdOrAll === 'all'
            ? `${API_URL}/payment/history/all`
            : `${API_URL}/payment/history/${userIdOrAll}`;
        const response = await axios.get(url, {
            headers,
            params: searchParams
        });
        console.log('API Response (getTransactionHistory):', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error (getTransactionHistory):', error);
        throw new Error('Error calling API: ' + error.message);
    }
};


