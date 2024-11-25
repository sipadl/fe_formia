import axios from 'axios'

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
      return response.data;
  } catch (error) {
      return error;
  }
};


export const getDataFromApi = async (url) => {
    console.log(url);
    const data = await axios.get(`${baseUrl}${url}`, {headers: {
            'Authorization': `Bearer ${yourToken}`
    }})

    return data;
}

export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/hal+json',
            'Authorization': `Bearer ${yourToken}`
        }
    });
    return response.data;
} catch (err) {
    console.error('failed:', err.message);
    if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Status:', err.response.status);
        console.error('Headers:', err.response.headers);
    }
    throw error;
}
};
