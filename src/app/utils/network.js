'use client';
import axios from 'axios'


const baseUrl = 'http://localhost:8080'; // Backend base URL
const yourToken = sessionStorage.getItem('_token')
const mainHeader = {
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json',
    
}
if(yourToken != null && '') {
    mainHeader['Authorization'] = `Bearer ${yourToken}`
}

export const postDataWithoutHead = async (url) => {
    try {
        const response = await axios.get(`${baseUrl}${url}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/hal+json',
            }
        });
        if(response.status === 403) {
            window.location.replace('/ui')
        }
        return response.data;
    } catch (error) {
        return error;
    }
}


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
        window.location.replace('/ui')
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
        console.log(response);
        if (response.status === 403) {
            window.location.replace('/ui');
        }
        return response.data;
    } catch (err) {
        return err.response.data; // Rethrow the error if necessary
    }    
};


export const postDataWithoutAuth = async (url, data) => {
    try {
        const response = await axios.post(`${baseUrl}${url}`, data);    
        // Redirect jika status code adalah 403
        if (response.status === 403) {
            window.location.replace('/ui');
        }
        return response.data;
    } catch (err) {
        return err; // Rethrow the error if necessary
    }    
};
