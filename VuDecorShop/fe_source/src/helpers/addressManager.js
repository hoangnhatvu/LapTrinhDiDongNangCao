import AsyncStorage from '@react-native-async-storage/async-storage';

const setAddress = async listAddress => {
  try {
    await AsyncStorage.setItem('address', JSON.stringify(listAddress));
  } catch (error) {
    throw error;
  }
};

const addToAddress = async address => {
  try {
    const addressList = await AsyncStorage.getItem('address');

    let updatedAddress = [];

    if (addressList) {
      updatedAddress = JSON.parse(addressList);
    }

    const existingItemIndex = updatedAddress.findIndex(
      item => item.id === address.id,
    );

    if (existingItemIndex === -1) {
      updatedAddress.push({
        id: address.id,
        customer_name: address.customer_name,
        phone_number: address.phone_number,
        address: address.address,
        is_default: address.is_default,
      });
    }
    await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    console.log('Thêm địa chỉ thành công');
  } catch (error) {
    throw error;
  }
};

const getAddressList = async () => {
  try {
    const addressList = await AsyncStorage.getItem('address');

    if (addressList) {
      return JSON.parse(addressList);
    } else {
      return [];
    }
  } catch (error) {
    console.log("Lấy thông tin thất bại !")
    throw error;
  }
};

const resetDefautAddress = async () => {
  try {
    const addressList = await AsyncStorage.getItem('address');

    if (addressList) {
      let updatedAddress = JSON.parse(addressList);
      updatedAddress = updatedAddress.map(item => ({...item, is_default: false}));
      console.log(updatedAddress)
      await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    }
  } catch (error) {
    throw error;
  }
};

const removeAddress = async address => {
  try {
    const addressList = await AsyncStorage.getItem('address');

    if (addressList) {
      let updatedAddress = JSON.parse(addressList);
      updatedAddress = updatedAddress.filter(item => item.id !== address.id);

      await AsyncStorage.setItem('address', JSON.stringify(updatedAddress));
    }
  } catch (error) {
    throw error;
  }
};

const clearAddress = async () => {
  try {
    await AsyncStorage.removeItem('address');
  } catch (error) {
    throw error;
  }
};
export {
  setAddress,
  addToAddress,
  getAddressList,
  removeAddress,
  clearAddress,
  resetDefautAddress,
};
