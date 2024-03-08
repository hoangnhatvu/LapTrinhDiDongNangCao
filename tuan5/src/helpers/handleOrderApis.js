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

const updateOrders = async (data, orderid) => {
  const request = {
    endpoint: "orders/update",
    method: "PUT",
    params: { id: orderid },
    body: data,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};


export {getOrderByUser, updateOrders};
