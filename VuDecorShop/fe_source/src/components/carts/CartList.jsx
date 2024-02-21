import {View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './cartList.style';
import CartManager from '../../helpers/cartManager';
import CartItem from './CartItem';
import {useDispatch} from 'react-redux';
import {setListOrderItem} from '../../redux/slices/listOrderItem.slice';

const CartList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const loadData = async () => {
    const cartList = await CartManager.getCartItems();
    setData(cartList);
  };

  useEffect(() => {
    loadData();
    dispatch(setListOrderItem());
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <CartItem item={item} loadData={loadData} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default CartList;
