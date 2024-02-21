import requestApi from "./apiConfig";
import type { requestApiProps } from "./apiConfig";

const getProducts = async () => {
  const request: requestApiProps = {
    endpoint: "products/searchForAdmin?page=1&limit=20",
    method: "POST",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const createProduct = async (data: FormData) => {
  const request: requestApiProps = {
    endpoint: "products/create",
    method: "POST",
    params: undefined,
    body: data,
    responseType: undefined,
    isFormData: true,
  };
  const response = await requestApi(request);
  return response.data;
};

export { getProducts, createProduct };
