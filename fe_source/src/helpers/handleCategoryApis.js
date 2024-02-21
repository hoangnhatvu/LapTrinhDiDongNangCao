import axios from 'axios';
import {API_URL} from '@env';
const getCategory = async () => {
  try {
    const endpoint = `${API_URL}categories/search?page=1&limit=20`;
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getCategory};
