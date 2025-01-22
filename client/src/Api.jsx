import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your server URL

export const Api = async () => {
    try {
        const response = await axios.get(`${API_URL}/word`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tests:', error);
        throw error;
    }
};