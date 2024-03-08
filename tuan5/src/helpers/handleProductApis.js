import axios from 'axios';
import {API_URL} from '@env';
const searchProducts = async data => {
  const page = 1;
  const limit = 20;
  const endpoint = `${API_URL}products/search?page=1&limit=20`;
  const body = data;
  try {
    const response = await axios.post(endpoint, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export {searchProducts};
