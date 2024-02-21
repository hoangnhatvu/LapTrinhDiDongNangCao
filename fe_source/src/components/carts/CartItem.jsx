import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import styles from './cartItem.style';
import {API_URL} from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {useSelector, useDispatch} from 'react-redux';
import CartManager from '../../helpers/cartManager';

import {COLORS} from '../../../constants';
import {
  addOrderItem,
  removeOrderItem,
  updateOrderItem,
} from '../../redux/slices/listOrderItem.slice';
import { formatCurrency } from '../../helpers/formatCurrency';
const CartItem = ({item, loadData}) => {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const isCheckAll = useSelector(state => state.isCheckAll.value);

  useEffect(() => {
    setToggleCheckBox(isCheckAll ? true : false);
  }, [isCheckAll]);

  useEffect(() => {
    dispatch(toggleCheckBox ? addOrderItem(item) : removeOrderItem(item));
  }, [toggleCheckBox]);

  useEffect(() => {
    dispatch(updateOrderItem(item));
  }, [item]);

  const handleAddCartItem = async () => {
    await CartManager.addToCart(item, 1, item.option);
    loadData();
  };
  const handleRemoveCartItem = async () => {
    if (item.quantity === 1) {
      handleRemoveFromCart();
    } else {
      await CartManager.removeCartItem(item);
      loadData();
    }
  };
  const handleRemoveFromCart = async () => {
    Alert.alert(
      'Xóa sản phẩm khỏi giỏ hàng',
      'Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng ?',
      [
        {
          text: 'Hủy',
          onPress: () => {},
        },
        {
          text: 'Tiếp tục',
          onPress: async () => {
            await CartManager.removeFromCart(item);
            if (toggleCheckBox){
              dispatch(removeOrderItem(item));
            }
            loadData();
          },
        },
      ],
    );
  };
  const {color, size} = item?.option || {};

  const optionText =
    color && size ? `${color}, ${size}` : color ? color : size && size;
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.checkBox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
          />
        </View>
        <View style={styles.image}>
          <Image
            source={
              item.image
                ? {uri: API_URL + item?.image}
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
            {item?.productName}
          </Text>
          {optionText && <Text style={styles.option}>{optionText}</Text>}
          <Text style={styles.option}>{formatCurrency(item?.price)}</Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => handleRemoveFromCart()}>
            <Ionicons name="trash-outline" size={24} color={COLORS.red} />
          </TouchableOpacity>
          <View style={styles.quantityAction}>
            <TouchableOpacity onPress={() => handleAddCartItem()}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item?.quantity}</Text>
            <TouchableOpacity onPress={() => handleRemoveCartItem()}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;
