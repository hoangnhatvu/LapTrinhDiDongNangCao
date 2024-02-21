import requestApi from './apiConfig';
import {API_URL} from '@env';
import axios from 'axios';

const createReview = async data => {
  const request = {
    endpoint: 'reviews/create',
    method: 'POST',
    params: undefined,
    body: data,
    responseType: undefined,
  };
  try {
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getReviewByProduct = async product => {
  const page = 1;
  const limit = 20;
  const endpoint = `${API_URL}reviews/getReviewsByProduct?page=1&limit=20`;
  const body = {
    product: product,
  };
  try {
    const response = await axios.post(endpoint, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {createReview, getReviewByProduct};
