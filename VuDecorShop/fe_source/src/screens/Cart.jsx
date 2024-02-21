import {View, Text, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './cart.style';
import {CartList, Heading} from '../components';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {setIsCheckAll} from '../redux/slices/isCheckAll.slice';
import {useToastMessage} from '../hook/showToast';
import { formatCurrency } from '../helpers/formatCurrency';
import { getUserData } from '../helpers/userDataManager';

const Cart = ({navigation}) => {
  const dispatch = useDispatch();
  const isCheckAll = useSelector(state => state.isCheckAll.value);
  const listOrderItem = useSelector(state => state.listOrderItem.value);
  const [total, setTotal] = useState(0);
  const {showToast} = useToastMessage();

  useEffect(() => {
    if (listOrderItem) {
      setTotal(
        listOrderItem.reduce(
          (orderTotal, item) => orderTotal + item.price * item.quantity,
          0,
        ),
      );
    }
  }, [listOrderItem]);

  handleBack = () => {
    dispatch(setIsCheckAll(false));
  };

  useEffect(() => {
    dispatch(setIsCheckAll(false));
  }, []);

  const loginAlert = () => {
    Alert.alert('Bạn chưa đăng nhập', 'Để tiến hành đặt hàng vui lòng đăng nhập !', [
      {
        text: 'Hủy',
        onPress: () => {},
      },
      {
        text: 'Đồng ý',
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };


  const checkLogin = async () => {
    const user = await getUserData()
    if (!user) {
      loginAlert();
    } else {
      navigation.navigate('Payment', {total});
    }
  }

  handleBuy = () => {
    if (total === 0) {
      showToast('Vui lòng chọn sản phẩm !', 'warning');
    } else {
      checkLogin();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Heading
        navigation={navigation}
        handleBack={handleBack}
        text="Giỏ hàng"
      />
      <CartList />
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <View style={styles.checkBoxWrapper}>
            <CheckBox
              disabled={false}
              value={isCheckAll}
              onValueChange={newValue => dispatch(setIsCheckAll(newValue))}
            />
            <Text>Chọn tất cả</Text>
          </View>
          <View style={styles.checkBoxWrapper}>
            <Text style={styles.totalText}>Tổng tiền:</Text>
            <Text style={styles.totalText}>đ {formatCurrency(total)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleBuy}>
          <View style={styles.buttonCheckout}>
            <Text style={styles.textCheckout}>Mua Hàng</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
