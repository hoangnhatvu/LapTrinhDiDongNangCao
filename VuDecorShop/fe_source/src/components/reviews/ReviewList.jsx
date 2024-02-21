import {View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './reviewList.style';
import {useToastMessage} from '../../hook/showToast';
import {COLORS} from '../../../constants';
import ReviewItem from './ReviewItem';

const ReviewList = ({listOrderProduct}) => {
  const [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {showToast} = useToastMessage();

  const loadData = async () => {
    setIsLoading(true);
    try {
      setdata(listOrderProduct?.products);
    } catch (error) {
      showToast('Có lỗi xảy ra !', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={80} color={COLORS.primary} />
        </View>
      ) : (
        <View >
          {data?.length > 0 && (
            <View>
              {data?.map((item, index) => {
                return <ReviewItem item={item} order={listOrderProduct.id} key={index} />;
              })}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ReviewList;
