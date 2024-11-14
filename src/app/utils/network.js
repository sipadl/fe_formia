import axios from 'axios'
import {redirect} from 'next/navigation';

const baseUrl = 'http://localhost:8080'; // Backend base URL
const yourToken = localStorage.getItem('_token')

export const fetchData = async (url) => {
    try {
        const response = await axios.get(`${baseUrl}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/hal+json',
                'Authorization': `Bearer ${yourToken}`
            }
        });
        const ress = {
            status: response.status,
            data: response.data
        }
        return ress;
    } catch (err) {
        console.error("Error:", err);
        if (err.response) {
            // Response was received but indicates an error status code (e.g., 401
            // Unauthorized)
            console.log('Authorization error, redirecting...');
            // setTimeout(() => {
            //     localStorage.clear()
            //     redirect('/ui')
            // }, 1000);
            // window
            //     .location
            //     .reload();

        } else if (err.request) {
            // Request was made but no response was received
            console.error('No response received:', err.request);
        } else {
            // Error setting up the request
            console.error('Request setup error:', err.message);
        }

        // Throw the original error to propagate it
        throw err;
    }
};

export const postData = async (url, data, yourToken) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/hal+json',
        ...(yourToken && { 'Authorization': `Bearer ${yourToken}` })
    };

    try {
        const response = await axios.post(`${baseUrl}${url}`, data, { headers });
        return {
            data: response.data,
            status: response.status
        };
    } catch (err) {
        console.error('Request failed:', err.message);
        
        if (err.response) {
            console.error('Authorization error, redirecting...');
            console.error('Response data:', err.response.data);
            console.error('Status:', err.response.status);
            console.error('Headers:', err.response.headers);

            // Optionally, handle redirect or reload logic here if needed
            // setTimeout(() => {
            //     localStorage.clear();
            //     window.location.href = '/ui';
            // }, 1000);
        }
        
        throw err;
    }
};
