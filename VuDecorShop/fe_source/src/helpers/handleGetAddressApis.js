import axios from 'axios';

const token = '101e2d64-95a3-11ee-b1d4-92b443b7a897';

const getProvinces = async () => {
  try {
    const endpoint = `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`;
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};

const getDistrictsByProvince = async provinceId => {
  try {
    if (!provinceId) {
      throw new Error('Vui lòng chọn tỉnh thành trước!');
    }
    const endpoint =
      'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district';
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
      params: {
        province_id: provinceId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getWardsByDistrict = async districtId => {
  try {
    if (!districtId) {
      throw new Error('Vui lòng chọn quận huyện trước !');
    }
    const endpoint =
      'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward';
    const response = await axios.get(endpoint, {
      headers: {
        Token: token,
      },
      params: {
        district_id: districtId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {getProvinces, getDistrictsByProvince, getWardsByDistrict};
