import {View, Text, TextInput, Alert, Switch} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Heading} from '../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from './editAddress.style';
import {COLORS, SIZES} from '../../constants';
import DropdownComponent from '../components/DropDown';
import {useToastMessage} from '../hook/showToast';
import {getUser, updateUser} from '../helpers/handleUserApis';
import {getUserData, saveUserData} from '../helpers/userDataManager';
import {useRoute} from '@react-navigation/native';
import {
  getDistrictsByProvince,
  getProvinces,
  getWardsByDistrict,
} from '../helpers/handleGetAddressApis';

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required('Đây là trường bắt buộc'),
  phone_number: Yup.string()
    .required('Đây là trường bắt buộc')
    .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại phải có ít nhất 10 chữ số')
    .max(11, 'Số điện thoại không được quá 11 chữ số'),
  detail_address: Yup.string().required('Đây là trường bắt buộc'),
  province: Yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  district: Yup.string().required('Vui lòng chọn quận/huyện'),
  ward: Yup.string().required('Vui lòng chọn phường/xã'),
  is_default: Yup.boolean(),
});
const EditAddress = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [dataProvince, setDataProvince] = useState(null);
  const [dataDistrict, setDataDistrict] = useState(null);
  const [addressString, setAddressString] = useState(null);
  const [dataWard, setDataWard] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {showToast} = useToastMessage();
  const formData = new FormData();
  const route = useRoute();
  const {listAddress} = route.params;

  const inValidForm = () => {
    Alert.alert(
      'Thông tin nhập chưa đúng',
      'Vui lòng nhập thông tin thỏa mãn yêu cầu',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    );
  };

  const loadDataProvince = async () => {
    try {
      const responseResults = await getProvinces();
      if (responseResults?.data) {
        const provinceData = responseResults.data.map(item => ({
          label: item.ProvinceName,
          value: item.ProvinceID,
        }));
        setDataProvince(provinceData);
      }
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    }
  };

  const loadDataDistrict = async () => {
    try {
      if (selectedProvince) {
        const responseResults = await getDistrictsByProvince(selectedProvince);
        if (responseResults?.data) {
          const districtData = responseResults.data.map(item => ({
            label: item.DistrictName,
            value: item.DistrictID,
          }));
          setDataDistrict(districtData);
        }
      }
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    }
  };

  const loadDataWard = async () => {
    try {
      if (selectedDistrict) {
        const responseResults = await getWardsByDistrict(selectedDistrict);
        if (responseResults?.data) {
          const wardData = responseResults.data.map(item => ({
            label: item.WardName,
            value: item.WardCode,
          }));
          setDataWard(wardData);
        }
      }
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    }
  };

  useEffect(() => {
    loadDataProvince();
  }, []);

  useEffect(() => {
    loadDataDistrict();
  }, [selectedProvince]);

  useEffect(() => {
    loadDataWard();
  }, [selectedDistrict]);

  const handleAddAddress = async data => {
    const address = {
      ...data,
      address:
        data.detail_address +
        ', ' +
        data.ward +
        ', ' +
        data.district +
        ', ' +
        data.province,
    };

    listAddress?.forEach((address, index) => {
      const addressKey = `ship_infos[${index}]`;
      formData.append(`${addressKey}[customer_name]`, address.customer_name);
      formData.append(`${addressKey}[phone_number]`, address.phone_number);
      formData.append(`${addressKey}[address]`, address.address);
      formData.append(`${addressKey}[province]`, address.province);
      formData.append(`${addressKey}[district]`, address.district);
      formData.append(`${addressKey}[ward]`, address.ward);
      formData.append(
        `${addressKey}[is_default]`,
        data.is_default ? false : address.is_default,
      );
    });

    formData.append(
      `ship_infos[${listAddress.length}][customer_name]`,
      address.customer_name,
    );
    formData.append(
      `ship_infos[${listAddress.length}][phone_number]`,
      address.phone_number,
    );
    formData.append(
      `ship_infos[${listAddress.length}][address]`,
      address.address,
    );
    formData.append(
      `ship_infos[${listAddress.length}][province]`,
      selectedProvince,
    );
    formData.append(
      `ship_infos[${listAddress.length}][district]`,
      selectedDistrict,
    );
    formData.append(`ship_infos[${listAddress.length}][ward]`, selectedWard);
    formData.append(
      `ship_infos[${listAddress.length}][is_default]`,
      address.is_default,
    );

    try {
      setLoader(true);
      const updated_token = (await getUserData()).updated_token;
      formData.append('updated_token', updated_token);
      await updateUser(formData);
      const userdata = await getUser();
      await saveUserData(userdata);
      showToast('Thêm địa chỉ thành công !', 'success');
      navigation.goBack();
    } catch (error) {
      showToast(`${error.response.data.message}`, 'danger');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView
      style={{paddingHorizontal: SIZES.small, backgroundColor: COLORS.offwhite, flex: 1}}>
      <View>
        <Heading
          text="Thêm địa chỉ"
          handleBack={() => {}}
          navigation={navigation}
        />

        <Formik
          initialValues={{
            customer_name: '',
            phone_number: '',
            province: '',
            district: '',
            ward: '',
            detail_address: '',
            is_default: false,
            id: 'address',
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleAddAddress(values)}>
          {({
            handleChange,
            touched,
            handleSubmit,
            values,
            errors,
            isValid,
            setFieldTouched,
            setFieldValue,
          }) => (
            <View>
              <Text style={styles.subText}>Thông tin liên hệ</Text>
              <View style={styles.wrapper}>
                <View
                  style={styles.inputWrapper(
                    touched.customer_name ? COLORS.secondary : COLORS.offwhite,
                  )}>
                  <TextInput
                    placeholder="Họ và tên"
                    onFocus={() => {
                      setFieldTouched('customer_name');
                    }}
                    onBlur={() => {
                      setFieldTouched('customer_name', '');
                    }}
                    value={values.customer_name}
                    onChangeText={handleChange('customer_name')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{fontSize: SIZES.medium}}
                  />
                </View>
                {touched.customer_name && errors.customer_name && (
                  <Text style={styles.errorMessage}>
                    {errors.customer_name}
                  </Text>
                )}
              </View>
              <View style={styles.wrapper}>
                <View
                  style={styles.inputWrapper(
                    touched.phone_number ? COLORS.secondary : COLORS.offwhite,
                  )}>
                  <TextInput
                    placeholder="Số điện thoại"
                    onFocus={() => {
                      setFieldTouched('phone_number');
                    }}
                    onBlur={() => {
                      setFieldTouched('phone_number', '');
                    }}
                    value={values.phone_number}
                    onChangeText={handleChange('phone_number')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{fontSize: SIZES.medium}}
                  />
                </View>
                {touched.phone_number && errors.phone_number && (
                  <Text style={styles.errorMessage}>{errors.phone_number}</Text>
                )}
              </View>
              <Text style={styles.subText}>Địa chỉ của bạn</Text>
              <DropdownComponent
                placeholder="Tỉnh thành"
                data={dataProvince && dataProvince}
                onValueChange={(label, value) => {
                  setFieldValue('province', label);
                  setFieldTouched('province', true);
                  setSelectedProvince(value);
                }}
              />
              <DropdownComponent
                placeholder="Quận huyện"
                data={dataDistrict && dataDistrict}
                onValueChange={(label, value) => {
                  setFieldValue('district', label);
                  setFieldTouched('district', true);
                  setSelectedDistrict(value);
                }}
              />
              <DropdownComponent
                placeholder="Phường xã"
                data={dataWard && dataWard}
                onValueChange={(label, value) => {
                  setFieldValue('ward', label);
                  setFieldTouched('ward', true);
                  setSelectedWard(value);
                }}
              />
              <View style={styles.wrapper}>
                <View
                  style={styles.inputWrapper(
                    touched.detail_address ? COLORS.secondary : COLORS.offwhite,
                  )}>
                  <TextInput
                    placeholder="Địa chỉ cụ thể"
                    onFocus={() => {
                      setFieldTouched('detail_address');
                    }}
                    onBlur={() => {
                      setFieldTouched('detail_address', '');
                    }}
                    value={values.detail_address}
                    onChangeText={handleChange('detail_address')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={{fontSize: SIZES.medium}}
                  />
                </View>
                {touched.detail_address && errors.detail_address && (
                  <Text style={styles.errorMessage}>
                    {errors.detail_address}
                  </Text>
                )}
              </View>
              <View style={styles.defaultContainer}>
                <Text style={styles.subText}>Đặt làm địa chỉ mặc định</Text>
                <Switch
                  trackColor={{false: COLORS.gray, true: COLORS.secondary}}
                  thumbColor={isEnabled ? COLORS.primary : COLORS.lightWhite}
                  onValueChange={() => {
                    toggleSwitch();
                    setFieldValue('is_default', !isEnabled);
                  }}
                  value={isEnabled}
                  style={{marginTop: -SIZES.small}}
                />
              </View>
              <Button
                title={'Lưu'}
                onPress={isValid ? handleSubmit : inValidForm}
                isValid={isValid}
                loader={loader}
              />
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default EditAddress;
