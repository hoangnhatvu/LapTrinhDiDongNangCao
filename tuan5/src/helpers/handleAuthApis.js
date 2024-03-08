import axios from 'axios';
import {API_URL} from '@env';
import requestApi from './apiConfig';

const register = async data => {
  try {
    const endpoint = `${API_URL}auth/register`;
    const body = {
      user_name: data.name,
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const login = async data => {
  try {
    const endpoint = `${API_URL}auth/login`;
    const body = {
      email: data.email,
      password: data.password,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const sendOtp = async (email, type) => {
  try {
    const endpoint = `${API_URL}auth/otp`;
    const body = {
      email: email,
      type: type,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const verifyOtp = async (email, otp, type) => {
  try {
    const endpoint = `${API_URL}auth/verify`;
    const body = {
      email: email,
      otp: otp,
      type: type,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const forgotPassword = async (data, updated_token) => {
  try {
    const endpoint = `${API_URL}auth/forgotPassword`;
    const body = {
      email: data.email,
      password: data.password,
      updated_token: updated_token,
    };
    const response = await axios.post(endpoint, body);
    return response;
  } catch (error) {
    throw error;
  }
};

const logout = async () => {
  const request = {
    endpoint: 'auth/logout',
    method: 'POST',
    params: undefined,
    body: {},
    responseType: undefined,
  };
  try {
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (data) => {
  const request = {
    endpoint: 'auth/changePassword',
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

export {register, sendOtp, verifyOtp, forgotPassword, login, logout, changePassword};
