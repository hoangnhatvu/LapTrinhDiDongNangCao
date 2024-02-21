import requestApi from "./apiConfig";
import type { requestApiProps } from "./apiConfig";

const getOrders = async () => {
  const request: requestApiProps = {
    endpoint: "orders?page=1&limit=20",
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const updateOrders = async (data: any, orderid: string) => {
  const request: requestApiProps = {
    endpoint: "orders/update",
    method: "PUT",
    params: { id: orderid },
    body: data,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

export { getOrders, updateOrders };
