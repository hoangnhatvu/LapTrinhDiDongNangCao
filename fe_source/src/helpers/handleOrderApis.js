import requestApi from './apiConfig';

const getOrderByUser = async status => {
  const request = {
    endpoint: 'orders/getOrderByUser',
    method: 'POST',
    params: undefined,
    body: {
      status: status,
    },
    responseType: undefined,
  };
  try {
    const response = await requestApi(request);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getOrderByUser};
