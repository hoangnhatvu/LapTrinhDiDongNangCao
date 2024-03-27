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
import {register, sendOtp} from '../helpers/handleAuthApis';
import {useToastMessage} from '../hook/showToast';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Đây là trường bắt buộc'),
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Đây là trường bắt buộc'),
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
const SignUp = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(null);
  const [obsecureTextPassword, setObsecureTextPassword] = useState(true);
  const [obsecureTextConfirm, setObsecureTextConfirm] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const {showToast} = useToastMessage();

  const inValidForm = () => {
    Alert.alert(
      'Thông tin nhập chưa đúng',
      'Vui lòng nhập thông tin thỏa mãn yêu cầu',
      [
        {
          text: 'Hủy',
          onPress: () => {},
        },
        {
          text: 'Tiếp tục',
          onPress: () => {},
        },
      ],
    );
  };

  const signup = async data => {
    try {
      setLoader(true);
      await register(data);
      setData(data);
      await sendOtp(data.email, 'verify');
      setModalVisible(true);
      showToast('Vui lòng xác minh email của bạn!', 'warning');
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
          <Text style={styles.title}>Đăng Ký Tài Khoản</Text>
          <Formik
            initialValues={{name: '', email: '', password: '', confirm: ''}}
            validationSchema={validationSchema}
            onSubmit={values => signup(values)}>
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
                  <Text style={styles.label}>Tên</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.name ? COLORS.secondary : COLORS.offwhite,
                    )}>
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Nhập họ tên"
                      onFocus={() => {
                        setFieldTouched('name');
                      }}
                      onBlur={() => {
                        setFieldTouched('name', '');
                      }}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{flex: 1}}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorMessage}>{errors.name}</Text>
                  )}
                </View>
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
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Xác nhận Mật khẩu</Text>
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
                  title={'ĐĂNG KÝ'}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />
              </View>
            )}
          </Formik>
        </View>
        {data && (
          <VerifyModal
            isVisible={modalVisible}
            email={data.email}
            type="verify"
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
