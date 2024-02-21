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
import {BackBtn, Button, VerifyModal} from '../components';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './login.style';
import {COLORS} from '../../constants';
import {login, sendOtp} from '../helpers/handleAuthApis';
import {useToastMessage} from '../hook/showToast';
import {saveUserData} from '../helpers/userDataManager';
import {saveToken} from '../helpers/tokenManager';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../redux/slices/isLogin.slice';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Đây là trường bắt buộc'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
    .required('Đây là trường bắt buộc'),
});
const LoginPage = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [obsecureTextPassword, setObsecureTextPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
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

  const activeAccount = data => {
    Alert.alert(
      'Email của bạn chưa được xác minh !',
      'Vui lòng xác minh email của bạn !',
      [
        {
          text: 'Hủy',
          onPress: () => {},
        },
        {
          text: 'Tiếp tục',
          onPress: async () => {
            showToast('Vui lòng chờ trong giây lát!', 'warning');
            await sendOtp(data.email, 'verify');
            setData(data);
            setModalVisible(true);
            showToast('Vui lòng xác minh email của bạn!', 'warning');
          },
        },
      ],
    );
  };

  const handleLogin = async data => {
    try {
      setLoader(true);
      const response = await login(data);
      saveUserData(response.data.user);
      saveToken(response.data.token);
      showToast('Đăng nhập thành công !', 'success');
      dispatch(setIsLogin(true));
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        showToast(error.response.data.message, 'danger');
        if (error.response.data.statusCode === 406) {
          activeAccount(data);
        }
      } else {
        showToast('Lỗi mạng !', 'danger');
      }
    } finally {
      setLoader(false);
    }
  };

  const hideModal = () => {
    setModalVisible(false);
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
          <Text style={styles.title}>Đăng Nhập</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}>
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Nhập email"
                      onFocus={() => {
                        setFieldTouched('email');
                      }}
                      onBlur={() => {
                        setFieldTouched('email', '');
                      }}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Mật khẩu</Text>
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
                      placeholder="Nhập mật khẩu"
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
                <Button
                  title={'ĐĂNG NHẬP'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />
                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}>
                  Quên mật khẩu
                </Text>

                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate('SignUp');
                  }}>
                  Đăng ký
                </Text>
              </View>
            )}
          </Formik>
        </View>
        {data && (
          <VerifyModal
            isVisible={modalVisible}
            email={data.email}
            type="verify"
            hideModal={hideModal}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
