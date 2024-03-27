import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    console.log('Thông tin người dùng đã được lưu trữ.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ thông tin người dùng:', error);
  }
};

const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      console.log('Không có thông tin người dùng.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi truy xuất thông tin người dùng:', error);
    return null;
  }
};

const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('userData');
    console.log('Thông tin người dùng đã được xóa.');
  } catch (error) {
    console.error('Lỗi khi xóa thông tin người dùng:', error);
  }
};

export { saveUserData, getUserData, clearUserData };
