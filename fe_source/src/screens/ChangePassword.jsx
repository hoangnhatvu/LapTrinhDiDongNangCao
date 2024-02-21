import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackBtn, Button} from '../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './changePassword.style';
import {COLORS} from '../../constants';
import {changePassword, login} from '../helpers/handleAuthApis';
import {useToastMessage} from '../hook/showToast';
import {getUserData, saveUserData} from '../helpers/userDataManager';
import {saveToken} from '../helpers/tokenManager';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../redux/slices/isLogin.slice';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Đây là trường bắt buộc'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Mật khẩu phải chứa ít nhất một chữ in hoa, một chữ in thường, một ký tự đặc biệt và một số',
    )
    .required('Đây là trường bắt buộc'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Đây là trường bắt buộc'),
});
const ChangePassword = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [obsecureTextPassword, setObsecureTextPassword] = useState(true);
  const [obsecureTextOldPassword, setObsecureTextOldPassword] = useState(true);
  const [obsecureTextConfirm, setObsecureTextConfirm] = useState(true);
  const {showToast} = useToastMessage();
  const dispatch = useDispatch();

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

  const handleChangePassword = async data => {
    try {
      setLoader(true);
      const userData = await getUserData();
      const dataToSend = {
        oldPassword: data.oldPassword,
        password: data.password,
        updated_token: userData.updated_token,
      };
      await changePassword(dataToSend);
      showToast('Đổi mật khẩu thành công !', 'success');
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        showToast(error.response.data.message, 'danger');
      } else {
        showToast('Lỗi mạng !', 'danger');
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={{marginHorizontal: 20}}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require('../../assets/images/bk.png')}
            style={styles.cover}
          />
          <Text style={styles.title}>Đổi mật khẩu</Text>
          <Formik
            initialValues={{oldPassword: '', password: '', confirm: ''}}
            validationSchema={validationSchema}
            onSubmit={values => handleChangePassword(values)}>
            {({
              handleChange,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Mật khẩu hiện tại</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.oldPassword ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureTextOldPassword}
                      placeholder="Nhập mật khẩu hiện tại"
                      onFocus={() => {
                        setFieldTouched('oldPassword');
                      }}
                      onBlur={() => {
                        setFieldTouched('oldPassword', '');
                      }}
                      value={values.oldPassword}
                      onChangeText={handleChange('oldPassword')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureTextOldPassword(!obsecureTextOldPassword);
                      }}>
                      <MaterialCommunityIcons
                        name={
                          obsecureTextOldPassword
                            ? 'eye-outline'
                            : 'eye-off-outline'
                        }
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.oldPassword && errors.oldPassword && (
                    <Text style={styles.errorMessage}>
                      {errors.oldPassword}
                    </Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Mật khẩu mới</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureTextPassword}
                      placeholder="Nhập mật khẩu mới"
                      onFocus={() => {
                        setFieldTouched('password');
                      }}
                      onBlur={() => {
                        setFieldTouched('password', '');
                      }}
                      value={values.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureTextPassword(!obsecureTextPassword);
                      }}>
                      <MaterialCommunityIcons
                        name={
                          obsecureTextPassword
                            ? 'eye-outline'
                            : 'eye-off-outline'
                        }
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Xác nhận mật khẩu</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.confirm ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      secureTextEntry={obsecureTextConfirm}
                      placeholder="Xác nhận mật khẩu"
                      onFocus={() => {
                        setFieldTouched('confirm');
                      }}
                      onBlur={() => {
                        setFieldTouched('confirm', '');
                      }}
                      value={values.confirm}
                      onChangeText={handleChange('confirm')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureTextConfirm(!obsecureTextConfirm);
                      }}>
                      <MaterialCommunityIcons
                        name={
                          obsecureTextConfirm
                            ? 'eye-outline'
                            : 'eye-off-outline'
                        }
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.confirm && errors.confirm && (
                    <Text style={styles.errorMessage}>{errors.confirm}</Text>
                  )}
                </View>
                <Button
                  title={'ĐỔI MẬT KHẨU'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ChangePassword;
