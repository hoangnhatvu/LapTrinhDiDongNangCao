import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(token));
    console.log('Token đã được lưu trữ !');
  } catch (error) {
    console.error('Không thể lưu token !', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (token !== null) {
      return JSON.parse(token);
    } else {
      console.log('Không có token !');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy token !', error);
    return null;
  }
};

const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('Token đã được xóa !');
  } catch (error) {
    console.error('Lỗi khi xóa token !', error);
  }
};

export { saveToken, getToken, clearToken };
