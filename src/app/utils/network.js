import axios from 'axios'

const baseUrl = 'http://localhost:8080'; // Backend base URL
const yourToken = localStorage.getItem('_token')

export const fetchData = async ({url}) => {
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
    console.log(error)
      if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response error:', error.response.status, error.response.data);
      } else if (error.request) {
          // Request was made but no response received
          console.error('Request error:', error.request);
      } else {
          // Something else happened
          console.error('Error:', error.message);
      }
      throw error;
  }
};


export const postData = async (url, data) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/hal+json'
        }
    });
    console.log('ress :', response.data);
    return response.data;
} catch (err) {
    console.log(err)
    const error = err.response.data;
    return error
}
};





