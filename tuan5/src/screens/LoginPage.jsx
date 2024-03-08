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
import styles from './login.style';
import {COLORS} from '../../constants';
import Realm from 'realm';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Đây là trường bắt buộc'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có tối thiểu 8 ký tự')
    .required('Đây là trường bắt buộc'),
});
const LoginPage = ({navigation}) => {
  const [obsecureTextPassword, setObsecureTextPassword] = useState(true);

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

  const UserSchema = {
    name: 'User',
    properties: {
      username: 'string',
      password: 'string',
    },
  };
  
  // Khởi tạo Realm với schema đã định nghĩa
  const realm = new Realm({ schema: [UserSchema] });
  
  // Hàm để lưu thông tin người dùng khi đăng nhập
  const saveUserData = (username, password) => {
    try {
      realm.write(() => {
        realm.create('User', { username, password });
      });
    } catch (error) {
      console.error('Lỗi khi lưu dữ liệu người dùng:', error);
    }
  };
  
  // Hàm để kiểm tra đăng nhập
  const checkLoginStatus = (username, password) => {
    const user = realm.objects('User').filtered(`username = "${username}" AND password = "${password}"`);
    return user.length > 0;
  };
  
  // Hàm để đăng xuất
  const logout = () => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('User'));
      });
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
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
          <Text style={styles.title}>Đăng Nhập</Text>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={(values)=>{console.log(values)}}>
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
                  loader={false}
                />
                <Text
                  style={styles.registration}
                  onPress={() => {
                    navigation.navigate('ForgotPassword');
                  }}>
                  Quên mật khẩu
                </Text>

                <Text style={styles.registration} onPress={() => {}}>
                  Đăng ký
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginPage;
