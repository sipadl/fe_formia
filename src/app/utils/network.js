import axios from 'axios'

const baseUrl = 'http://localhost:8080'; // Backend base URL

export const fetchData = async (url, option = {}) => {
    const res = await axios``.get(`${baseUrl}${url}`, option);
    if(!res.ok){
        throw new Error(`Fetch error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}
export const postData = async (url, data) => {
    try {
      const response = await axios.post(`${baseUrl}${url}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,  // Include credentials if necessary
      });
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };