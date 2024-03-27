import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './verifyModal.style';
import Modal from 'react-native-modal';
import Button from '../Button';
import {sendOtp, verifyOtp} from '../../helpers/handleAuthApis';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useToastMessage} from '../../hook/showToast';
import {useDispatch} from 'react-redux';
import {setUserInfo} from '../../redux/slices/userInfo.slice';

const VerifyModal = ({isVisible, email, type, hideModal}) => {
  const [otpInputs, setOtpInputs] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const currentRouteName = route.name;
  const {showToast} = useToastMessage();

  let inputRefs = {};

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    try {
      await sendOtp(email, type);
      setTimer(60);
    } catch (error) {
      console.log(error);
      if (error.response) {
        showToast(error.response.data.message, 'danger');
      } else {
        showToast('Lỗi mạng !', 'danger');
      }
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otpInputs.join('');
    if (enteredOtp.length === 4) {
      try {
        setLoader(true);
        const response = await verifyOtp(email, enteredOtp, type);
        if (currentRouteName === 'SignUp') {
          showToast('Xác minh thành công, vui lòng đăng nhập !', 'success');
          navigation.navigate('Login');
        } else {
          if(currentRouteName === 'Login') {
            showToast(
              'Xác minh thành công, vui lòng đăng nhập !',
              'success',
            );
          } else {
            dispatch(setUserInfo(response.data.user));
            showToast(
              'Xác minh thành công, vui lòng nhập mật khẩu mới !',
              'success',
            );
          }          
          hideModal();
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Lỗi mạng !');
        }
      } finally {
        setLoader(false);
      }
    } else {
      setError('Vui lòng nhập OTP hợp lệ!');
    }
  };

  const handleInputChange = (otpValue, index) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = otpValue;
    setOtpInputs(newOtpInputs);

    if (otpValue) {
      const nextIndex = index < 3 ? index + 1 : index;
      inputRefs[`otp${nextIndex + 1}`]?.focus();
    } else {
      const prevIndex = index > 0 ? index - 1 : 0;
      inputRefs[`otp${prevIndex + 1}`]?.focus();
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        backdropOpacity={0.6}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>
              Mã OTP xác minh đã được gửi đến email của bạn
            </Text>
            <View style={styles.wrapperInput}>
              {otpInputs.map((value, index) => (
                <TextInput
                  key={index}
                  ref={input => (inputRefs[`otp${index + 1}`] = input)}
                  style={styles.input}
                  value={value}
                  onChangeText={text => handleInputChange(text, index)}
                  maxLength={1}
                  keyboardType="numeric"
                />
              ))}
            </View>
            <Text style={styles.errorMessage}>{error}</Text>
            <Text style={styles.timer}>
              00:{timer < 10 ? 0 : null}
              {timer}
            </Text>
            {timer === 0 && (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text>Gửi lại mã</Text>
              </TouchableOpacity>
            )}

            <Button
              title="Xác minh"
              width="70%"
              loader={loader}
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VerifyModal;
