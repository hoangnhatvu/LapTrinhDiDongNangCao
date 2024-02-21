import axios from 'axios';
import requestApi from './apiConfig';

const token = '101e2d64-95a3-11ee-b1d4-92b443b7a897';

const calculateFeeShip = async (districtId, wardCode, codAmount) => {
  try {
    const endpoint =
      'https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee';
    const response = await axios.post(
      endpoint,
      {
        service_id: 53320,
        service_type_id: 2,
        to_district_id: districtId,
        to_ward_code: wardCode,
        weight: 2000,
        cod_failed_amount: codAmount,
      },
      {
        headers: {
          Token: token,
          ShopId: 190512,
        },
      },
    );
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const createOrder = async (data) => {
    const request = {
      endpoint: 'orders/create',
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

export {calculateFeeShip, createOrder};
