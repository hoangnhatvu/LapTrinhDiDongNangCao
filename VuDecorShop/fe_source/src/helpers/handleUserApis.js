import requestApi from './apiConfig';

const updateUser = async data => {
  const request = {
    endpoint: 'users/update',
    method: 'PUT',
    params: undefined,
    body: data,
    responseType: undefined,
    isFormData: true,
  };
  try {
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getUser = async () => {
  const request = {
    endpoint: 'users/getUser',
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

export {updateUser, getUser};
