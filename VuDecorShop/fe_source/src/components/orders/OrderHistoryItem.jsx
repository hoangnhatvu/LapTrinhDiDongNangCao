import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './orderHistoryItem.style';
import {API_URL} from '@env';
import {formatCurrency} from '../../helpers/formatCurrency';
import {COLORS, SIZES} from '../../../constants';
import Button from '../Button';
import {useNavigation} from '@react-navigation/native';
import {updateOrders} from '../../helpers/handleOrderApis';
import {useToastMessage} from '../../hook/showToast';

const OrderHistoryItem = ({item, loadData}) => {
  const {color, size} = item?.products[0]?.option || {};
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();

  const optionText =
    color && size ? `${color}, ${size}` : color ? color : size && size;

  const handleUpdateOrder = async (updatedToken, orderid) => {
    try {
      setIsLoading(true);
      const data = {
        status: 'Chờ đánh giá',
        updated_token: updatedToken,
      };
      await updateOrders(data, orderid);
      loadData();
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.productContainer}>
        <View style={styles.image}>
          <Image
            source={
              item?.products[0]?.option?.option_image
                ? {uri: API_URL + item?.products[0]?.option?.option_image}
                : require('../../../assets/images/no_image.png')
            }
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.productTitle}>
            {item?.products[0]?.product?.product_name}
          </Text>
          {optionText && <Text style={styles.option}>{optionText}</Text>}
          <Text style={styles.option}>
            {formatCurrency(item?.products[0]?.option?.price)} x{' '}
            {item?.products[0]?.quantity}
          </Text>
        </View>
      </View>
      {item?.products?.length > 1 && (
        <View style={styles.moreText}>
          <Text style={{fontFamily: 'OpenSans-Medium'}}>Xem thêm sản phẩm</Text>
        </View>
      )}
      <View style={styles.totalWrapper}>
        <Text
          style={{fontFamily: 'OpenSans-Regular', fontSize: SIZES.small + 1}}>
          {item?.products?.length} sản phẩm
        </Text>
        <View style={styles.totalText}>
          <Text
            style={{fontFamily: 'OpenSans-SemiBold', color: COLORS.primary}}>
            Thành tiền:{' '}
          </Text>
          <Text
            style={{
              marginLeft: SIZES.small,
              fontFamily: 'OpenSans-Regular',
              color: COLORS.red,
            }}>
            đ {formatCurrency(item.payment.amount)}
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        {item?.status === 'Chờ xác nhận' || item?.status === 'Đang lấy hàng' ? (
          <Button title="Hủy đơn hàng" loader={false} onPress={() => {}} width="70%"/>
        ) : (
          <>
            {item?.status === 'Đang vận chuyển' ? (
                <Button
                  title="Đã nhận được hàng"
                  width="70%"
                  loader={isLoading}
                  onPress={() => {
                    handleUpdateOrder(item.updated_token, item.id);
                  }}
                />
            ) : (
              <>
                {item?.status === 'Chờ đánh giá' && (
                  <Button
                    title="Đánh giá sản phẩm"
                    loader={false}
                    onPress={() =>
                      navigation.navigate('Review', {listOrderProduct: item})
                    }
                    width="70%"
                  />
                )}
              </>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OrderHistoryItem;
