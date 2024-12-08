import axios from 'axios'
import { useRouter } from 'next/navigation';

const baseUrl = 'http://localhost:8080'; // Backend base URL
const yourToken = localStorage.getItem('_token')
const mainHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json',
    
}
if(yourToken) {
    mainHeader['Authorization'] = `Bearer ${yourToken}`
}

console.log(mainHeader);

export const fetchData = async (url) => {
  try {
      const response = await axios.get(`${baseUrl}${url}`, {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/hal+json',
              'Authorization': `Bearer ${yourToken}`
          }
      });

      if(response.status === 403) {
        router.push('/ui')
      }
      return response.data;
  } catch (error) {
      return error;
  }
};


export const patchData = async (url, values) => {
    try {
        const response = await axios.patch(`${baseUrl}${url}`, values , {mainHeader});
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getDataFromApi = async (url) => {
    console.log(url);
    const data = await axios.get(`${baseUrl}${url}`, {mainHeader})

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
        // Redirect jika status code adalah 403
        if (response.status === 403) {
            useRouter.push('/ui');
        }
        return response.data;
    
    } catch (err) {
        console.log(err.code);
        if (err.response == 'ERR_NETWORK') {
            // Mendapatkan status code dari response
            const statusCode = err.response.status;
            console.warn('Response data:', err.response.data);
            console.warn('Status:', statusCode);
            console.warn('Headers:', err.response.headers);
    
            // Contoh penanganan berdasarkan status code
            if (statusCode === 403) {
                Router.push('/ui');
            } else if (statusCode === 404) {
                console.error('Resource not found.');
            } else if (statusCode === 500) {
                console.error('Server error.');
            }
        } else if (err.request) {
            console.error('No response received:', err.request);
        } else {
            console.error('Error setting up request:', err.message);
        }
        throw err; // Rethrow the error if necessary
    }    
};


export const postDataWithoutAuth = async (url, data) => {
    try {
        const response = await axios.post(`${baseUrl}${url}`, data);    
        // Redirect jika status code adalah 403
        if (response.status === 403) {
            useRouter.push('/ui');
        }
        return response.data;
    
    } catch (err) {
        console.log(err.code);
        if (err.response == 'ERR_NETWORK') {
            // Mendapatkan status code dari response
            const statusCode = err.response.status;
            console.warn('Response data:', err.response.data);
            console.warn('Status:', statusCode);
            console.warn('Headers:', err.response.headers);
    
            // Contoh penanganan berdasarkan status code
            if (statusCode === 403) {
                Router.push('/ui');
            } else if (statusCode === 404) {
                console.error('Resource not found.');
            } else if (statusCode === 500) {
                console.error('Server error.');
            }
        } else if (err.request) {
            console.error('No response received:', err.request);
        } else {
            console.error('Error setting up request:', err.message);
        }
        throw err; // Rethrow the error if necessary
    }    
};
