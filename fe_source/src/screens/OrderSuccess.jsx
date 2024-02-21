import React from 'react';
import styles from './orderSuccess.style';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../../constants';
import {Button} from '../components';
const OrderSuccess = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.checkDone}>
        <Text style={styles.textCheckDone}>Đặt hàng thành công !</Text>
        <Ionicons
          name="checkmark-done-circle-outline"
          size={250}
          color="green"
        />
        <Text style={styles.textThanks}>
          Cảm ơn bạn đã đặt hàng, đơn hàng của bạn sẽ nhanh chóng được xác nhận
          !
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Button
          title="Tiếp tục mua sắm"
          loader={false}
          isValid={true}
          onPress={() => navigation.navigate('Home')}
          width="60%"
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccess;
