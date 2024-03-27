import axios from 'axios';
import {clearUserData, getUserData} from './userDataManager';
import {clearToken, getToken, saveToken} from './tokenManager';
import {API_URL} from '@env';

export default async function requestApi({
  endpoint,
  method,
  params,
  body,
  responseType,
  isFormData = false,
}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  if (isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }

  const instance = axios.create({headers});
  const token = await getToken();
  const user = await getUserData();
  try {
    const userResponse = await axios.post(`${API_URL}auth/getUserStatus`, {
      id: `${user.id}`,
    });

    if (userResponse.data.is_blocked) {
      console.log('Tài khoản của bạn đã bị chặn !');
      clearUserData();
      clearToken();
    } else if (userResponse.data.is_active === false) {
      console.log('Tài khoản của bạn chưa được kích hoạt !');
      clearUserData();
      clearToken();
    } else {
      instance.interceptors.request.use(
        config => {
          if (token && !config.headers?.Authorization) {
            config.headers['Authorization'] = `Bearer ${token.accessToken}`;
          }
          return config;
        },
        error => {
          return Promise.reject(error);
        },
      );

      instance.interceptors.response.use(
        response => {
          return response;
        },
        async error => {
          const originalConfig = error.config;
          console.log('Access token hết hạn !');

          if (
            error.response &&
            error.response?.status === 401 &&
            !originalConfig._retry
          ) {
            originalConfig._retry = true;

            try {
              console.log('Gọi refresh token api');

              if (token) {
                const result = await instance.post(
                  `${API_URL}auth/refresh-token`,
                  {
                    refreshToken: token.refreshToken,
                  },
                );

                saveToken(result.data);
                originalConfig.headers[
                  'Authorization'
                ] = `Bearer ${result.data.accessToken}`;

                return instance(originalConfig);
              } else {
                clearUserData();
                clearToken();
              }
            } catch (err) {
              if (err.response && err.response.status === 400) {
                clearToken();
                clearUserData();
              }

              return Promise.reject(err);
            }
          }

          return Promise.reject(error);
        },
      );

      return instance.request({
        method: method,
        url: `${API_URL}${endpoint}`,
        data: body,
        params: params,
        responseType: responseType,
      });
    }
  } catch (error) {
    console.log(error)
    throw error;
  }
}
