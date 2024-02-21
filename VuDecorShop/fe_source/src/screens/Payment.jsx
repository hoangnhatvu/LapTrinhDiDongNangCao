import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './payment.style';
import {Button, DropdownComponent, Heading, OrderList} from '../components';
import {useRoute} from '@react-navigation/native';
import {formatCurrency} from '../helpers/formatCurrency';
import AddressItem from '../components/addresses/AddressItem';
import {getUserData} from '../helpers/userDataManager';
import {SIZES} from '../../constants';
import {calculateFeeShip, createOrder} from '../helpers/handlePaymentApis';
import {useToastMessage} from '../hook/showToast';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedAddress} from '../redux/slices/selectedAddress.slice';
import CartManager from '../helpers/cartManager';

const Payment = ({navigation}) => {
  const route = useRoute();
  const {total} = route.params;
  const [loader, setLoader] = useState(false);
  const [feeShip, setFeeShip] = useState(0);
  const selectedAddress = useSelector(state => state.selectedAddress.value);
  const {showToast} = useToastMessage();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const listOrderItem = useSelector(state => state.listOrderItem.value);
  const dispatch = useDispatch();
  const paymentMethodData = [
    {label: 'Thanh toán khi nhận hàng', value: 1},
    {label: 'Thanh toán qua Momo', value: 2},
  ];

  const loadData = async () => {
    const userData = await getUserData();
    if (userData.ship_infos.length > 0) {
      const defaultAddress = userData.ship_infos.filter(
        item => item.is_default === true,
      )[0];
      console.log();
      dispatch(setSelectedAddress(defaultAddress));
    }
  };

  const calculateFee = async () => {
    try {
      if (selectedAddress) {
        const responseResults = await calculateFeeShip(
          selectedAddress.district,
          selectedAddress.ward,
          total,
        );
        if (responseResults?.data) {
          setFeeShip(responseResults?.data?.total);
        }
      }
    } catch (error) {
      showToast('Có lỗi khi tính phí vận chuyển !', 'danger');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    calculateFee();
  }, [selectedAddress]);

  const handlePayment = async () => {
    setLoader(true);
    try {
      const products = listOrderItem.map(item => ({
        product: item.product_id,
        option: item.option.id,
        quantity: item.quantity,
      }));
      const data = {
        products: products,
        customer_name: selectedAddress.customer_name,
        phone_number: selectedAddress.phone_number,
        district: selectedAddress.district,
        ward: selectedAddress.ward,
        address: selectedAddress.address,
        payment: {
          amount: total + feeShip,
          method: paymentMethod.label,
        },
      };
      await createOrder(data);

      listOrderItem.forEach(async item => {
        await CartManager.removeFromCart(item);
      });

      showToast('Đặt hàng thành công !', 'success');
      navigation.navigate('OrderSuccess');
    } catch (error) {
      console.log(error.response.data.message);
      showToast(error.response.data.message, 'danger');
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Heading text="Thanh toán" navigation={navigation} />
      <ScrollView style={{maxHeight: SIZES.width + 100}}>
        <View style={{marginBottom: SIZES.medium}}>
          <Text style={styles.subText}>Thông tin giao hàng </Text>
          {!selectedAddress ? (
            <View style={styles.addAddressText}>
              <Text>Bạn chưa có địa chỉ, vui lòng thêm địa chỉ </Text>
              <Text>tại đây</Text>
            </View>
          ) : (
            <AddressItem item={selectedAddress} mode="payment" />
          )}
        </View>
        <View style={{marginBottom: SIZES.medium}}>
          <Text style={styles.subText}>Danh sách sản phẩm </Text>
          <OrderList />
        </View>
        <View>
          <Text style={styles.subText}>Phương thức thanh toán</Text>
          <DropdownComponent
            data={paymentMethodData}
            onValueChange={(label, value) => {
              setPaymentMethod({label: label, value: value});
            }}
            mode="payment"
            placeholder="Vui lòng chọn phương thức thanh toán"
          />
        </View>
        {/* <View>
          <Text style={styles.subText}>Ghi chú</Text>
        </View> */}
      </ScrollView>
      <View style={styles.checkoutContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng tiền hàng:</Text>
          <Text style={styles.totalText}>đ {formatCurrency(total)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Phí vận chuyển:</Text>
          <Text style={styles.totalText}>đ {formatCurrency(feeShip)}</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Giảm giá:</Text>
          <Text style={styles.totalText}>đ 0</Text>
        </View>
        <View style={styles.total}>
          <Text style={styles.totalText}>Tổng thanh toán:</Text>
          <Text style={styles.totalText}>
            đ {formatCurrency(total + feeShip)}
          </Text>
        </View>
        <View style={{marginHorizontal: SIZES.small}}>
          <Button
            title="Thanh toán"
            loader={loader}
            onPress={() => handlePayment()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
